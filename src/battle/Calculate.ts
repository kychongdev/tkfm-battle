import { AffectType, Buff, BuffType, Condition, Target } from "../types/Skill";
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
      console.log("trigger buff");
      triggerPassive(buff, state, position);
    }
  });
}

export function triggerPassive(
  buff: Buff,
  gameState: GameState,
  position: number,
) {
  switch (buff.type) {
    case BuffType.APPLYBUFF:
      //if (buff.target === Target.ENEMY)
      if (buff.target === Target.SELF) {
        gameState.characters[position].buff = [
          ...gameState.characters[position].buff,
          {
            name: `以自身最大HP${buff.value * 100}%對我方全體施放護盾(${buff.duration}回合)`,
            type: BuffType.BUFF,
            value: buff.value,
            affect: AffectType.SHIELD,
            target: Target.SELF,
            duration: buff.duration,
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
              : "";
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

      break;
    case BuffType.BUFF:
      console.log("buff");
      break;
  }
}
