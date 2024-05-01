import {
  AffectType,
  Buff,
  BuffType,
  Condition,
  DurationType,
  Target,
  ValueType,
} from "../types/Skill";
import { GameState } from "./GameState";

export function calculateStats(
  initStats: number,
  level: number,
  star: number,
  room: number,
  pot: number,
) {
  const starStats = star === 3 ? 1 : star === 4 ? 1.125 : star === 5 ? 1.25 : 1;
  const roomStats =
    room === 1 ? 1.05 : room === 2 ? 1.15 : room === 3 ? 1.3 : 1;
  const levelStats = level === 1 ? 1 : level - 1;
  return Math.ceil(
    initStats * 1.1 ** levelStats * starStats * roomStats * (1 + pot / 100),
  );
}

export function calculateDamage(
  position: number,
  attackPercentage: number,
  gameState: GameState,
) {
  let characterAtk = gameState.characters[position].initAtk;
  let atkbuff = 1;
  gameState.characters[position].buff.forEach((buff) => {
    if (buff.type === BuffType.BUFF && buff.affect === AffectType.ATK) {
      // characterAtk += characterAtk * (1 + buff.value);
      atkbuff += buff.value;
    }
  });
  return Math.ceil(characterAtk * atkbuff * attackPercentage);
}

export function checkHpBuff(gameState: GameState) {
  gameState.characters.forEach((character) => {
    let hpBuff = 1;
    character.buff.forEach((buff) => {
      if (buff.affect === AffectType.HP) {
        hpBuff += buff.value;
      }
    });
    character.hp = Math.ceil(character.hp * hpBuff);
  });
}

export function parseCondition(
  position: number,
  condition: Condition,
  state: GameState,
) {
  state.characters[position].buff.forEach((buff) => {
    if (buff.condition === condition) {
      triggerPassive(buff, state, position);
    }
  });
}

function parseAffectName(affectType: AffectType | undefined) {
  switch (affectType) {
    case AffectType.INCREASE_DMG:
      return "造成傷害增加";
    case AffectType.INCREASE_DMG_RECEIVED:
      return "受到傷害增加";
    case AffectType.ULTIMATE_DAMAGE:
      return "受到必殺技傷害增加";
    case AffectType.DARK:
      return "受到暗屬性傷害增加";
    case AffectType.WATER:
      return "受到水屬性傷害增加";
    case AffectType.SHIELD:
      return "護盾";
    default:
      return "";
  }
}

function parseBuffValue(buff: Buff, gameState: GameState, position: number) {
  switch (buff.valueType) {
    case ValueType.MAXHP:
      return Math.ceil(gameState.characters[position].initHp * buff.value);
    case ValueType.SKILL:
      const valueMultiply = gameState.characters[position].buff.filter(
        (othersBuff) => {
          return othersBuff.unique_id === buff.valueTarget;
        },
      ).length;
      return buff.value * valueMultiply;

    default:
      return buff.value;
  }
}

export function triggerPassive(
  buff: Buff,
  gameState: GameState,
  position: number,
) {
  const buffValue = parseBuffValue(buff, gameState, position);
  const buffName = parseAffectName(buff.affect);

  switch (buff.type) {
    case BuffType.APPLYBUFF:
      if (buff.target === Target.ALL) {
        gameState.characters.forEach((_, index) => {
          gameState.characters[index].buff = [
            ...gameState.characters[index].buff,
            {
              name: `${buffValue}% ${buffName}(${buff.duration}回合)`,
              type: BuffType.BUFF,
              value: buffValue,
              affect: buff.affect,
              target: Target.SELF,
              duration: buff.duration,
              durationType: buff.durationType,
              condition: Condition.NONE,
            },
          ];
        });
      }
      if (buff.target === Target.SELF) {
        if (buff.durationType === DurationType.STACK) {
          const isExist = gameState.characters[position].buff.some(
            (othersBuff) => {
              return buff.unique_id + "_ACTIVATE" == othersBuff.unique_id;
            },
          );
          if (!isExist) {
            gameState.characters[position].buff = [
              ...gameState.characters[position].buff,
              {
                name: `${buffName} ${buffValue} ${buff.stack}層 (${buff.maxStack}層)`,
                type: BuffType.BUFF,
                value: buffValue,
                affect: buff.affect,
                target: Target.SELF,
                stack: buff.increaseStack,
                maxStack: buff.maxStack,
                duration: buff.duration,
                condition: Condition.NONE,
                unique_id: buff.unique_id + "_ACTIVATE",
              },
            ];
          } else if (isExist) {
            //Check existing buff and increase stack
            gameState.characters[position].buff = gameState.characters[
              position
            ].buff.map((othersBuff) => {
              // IF this is not working then might be data errors
              if (
                othersBuff.unique_id === buff.unique_id + "_ACTIVATE" &&
                othersBuff.stack &&
                buff.maxStack
              ) {
                return {
                  ...othersBuff,
                  stack:
                    othersBuff.stack + 1 > buff.maxStack
                      ? buff.maxStack
                      : othersBuff.stack + 1,
                  name: `${buffName} ${buffValue} ${buff.stack}層 (${buff.maxStack}層)`,
                };
              }
              return othersBuff;
            });
          }
        }

        // Simple Apply Buff to Self
        gameState.characters[position].buff = [
          ...gameState.characters[position].buff,
          {
            name: buffName,
            type: BuffType.BUFF,
            value: buffValue,
            affect: buff.affect,
            target: Target.SELF,
            duration: buff.duration,
            durationType: DurationType.TEMPORARY,
            condition: Condition.NONE,
          },
        ];
      }
      break;
    case BuffType.APPLYDEBUFF:
      if (buff.target === Target.ENEMY) {
        const name =
          buff.affect === AffectType.INCREASE_DMG_RECEIVED
            ? `受到傷害增加${buff.value * 100}%`
            : buff.affect === AffectType.ULTIMATE_DAMAGE
              ? `受到必殺技傷害增加${buff.value * 100}%`
              : buff.affect === AffectType.DARK
                ? `受到暗屬性傷害增加${buff.value * 100}%`
                : buff.affect === AffectType.WATER
                  ? `受到水屬性傷害增加${buff.value * 100}%`
                  : "";
        if (buff.durationType === DurationType.STACK) {
          const isExist = gameState.enemy.buff.some((othersBuff) => {
            return buff.unique_id + "_ACTIVATE" == othersBuff.unique_id;
          });
          if (!isExist) {
            gameState.enemy.buff = [
              ...gameState.enemy.buff,
              {
                name: name + `1層 (${buff.maxStack}層)`,
                type: BuffType.DEBUFF,
                value: buff.value,
                affect: buff.affect,
                target: Target.SELF,
                stack: 1,
                maxStack: buff.maxStack,
                duration: buff.duration,
                condition: Condition.NONE,
                unique_id: buff.unique_id + "_ACTIVATE",
              },
            ];
          } else if (isExist) {
            //Check existing buff and increase stack
            gameState.enemy.buff = gameState.enemy.buff.map((othersBuff) => {
              if (
                othersBuff.unique_id === buff.unique_id + "_ACTIVATE" &&
                //@ts-ignore
                othersBuff.stack <= buff.maxStack
              ) {
                return {
                  ...othersBuff,
                  name:
                    //@ts-ignore
                    name + ` ${othersBuff.stack + 1}層 (${buff.maxStack}層)`,
                  //@ts-ignore
                  stack: othersBuff.stack + 1,
                };
              }
              return othersBuff;
            });
          }
        } else {
          gameState.enemy.buff = [
            ...gameState.enemy.buff,
            {
              name,
              type: BuffType.DEBUFF,
              value: buff.value,
              affect: buff.affect,
              target: Target.SELF,
              duration: buff.duration,
              condition: Condition.NONE,
            },
          ];
        }
      }

      break;
    case BuffType.BUFF:
      console.log("buff");
      break;
  }
}

export function checkEndTurn(state: GameState) {
  const isEnd = state.characters.every((character) => {
    return (
      character.isDead ||
      character.isMoved ||
      character.isGuard ||
      character.isSleep ||
      character.isSilence ||
      character.isParalysis
    );
  });

  if (isEnd) {
    state.turns += 1;

    state.enemy.buff.forEach((buff) => {
      if (
        buff.duration &&
        (buff.type === BuffType.BUFF || buff.type === BuffType.DEBUFF)
      ) {
        buff.duration -= 1;
      }
    });

    state.characters.forEach((character) => {
      character.buff.forEach((buff) => {
        if (
          buff.duration &&
          (buff.type === BuffType.BUFF || buff.type === BuffType.DEBUFF)
        ) {
          buff.duration -= 1;
        }
      });
      character.cd = character.cd > 0 ? character.cd - 1 : 0;
    });

    state.enemy.buff = state.enemy.buff.filter((buff) => {
      return buff.duration !== 0 || buff.duration === undefined;
    });

    state.characters.map((character) => {
      character.buff = character.buff.filter((buff) => {
        return buff.duration !== 0 || buff.duration === undefined;
      });
    });
    state.characters.forEach((character) => {
      character.isMoved = false;
    });
  }
}
