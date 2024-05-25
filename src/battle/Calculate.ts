import type { Buff } from "../types/Skill";
import { AffectType, Condition, Target } from "../types/Skill";
// import character from "../assets/character.json";
import type { GameState } from "./GameState";

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

// Only initiate once
export function applyHpBuff(gameState: GameState) {
  gameState.characters.forEach((character, index) => {
    let hpBuff = 1;
    for (const buff of character.buff) {
      if (buff.type === 0 && buff._0?.affectType === AffectType.MAXHP) {
        hpBuff += buff._0?.value;
      }
    }
    gameState.characters[index].hp = Math.ceil(character.hp * hpBuff);
    gameState.characters[index].maxHp = Math.ceil(character.maxHp * hpBuff);
  });
}

// When activate condition
export function parseCondition(
  position: number,
  condition: Condition,
  state: GameState,
) {
  for (const char of state.characters[position].buff) {
    if (char.condition === condition) {
      triggerPassive(char, state, position);
    }
  }
}

export function calcBasicDamage(
  position: number,
  value: number,
  gameState: GameState,
) {
  let tempAtk = gameState.characters[position].atk;
  let atkPercentage = 0;

  for (const buff of gameState.characters[position].buff) {
    if (buff.type === 0 && buff._0?.affectType === AffectType.ATK) {
      atkPercentage += buff._0?.value;
    }
    if (buff.type === 0 && buff._0?.affectType === AffectType.RAWATK) {
      tempAtk += buff._0?.value;
    }
  }
  return (tempAtk * atkPercentage + tempAtk) * value;
}

export function calcUltDamage(
  position: number,
  value: number,
  gameState: GameState,
  isTrigger: boolean,
) {
  let tempAtk = gameState.characters[position].atk;
  let atkPercentage = 0;

  for (const buff of gameState.characters[position].buff) {
    if (buff.type === 0 && buff._0?.affectType === AffectType.ATK) {
      atkPercentage += buff._0?.value;
    }
    if (buff.type === 0 && buff._0?.affectType === AffectType.RAWATK) {
      tempAtk += buff._0?.value;
    }
  }

  if (isTrigger) {
    return (tempAtk * atkPercentage + tempAtk) * value;
  }
  return (tempAtk * atkPercentage + tempAtk) * value;
}

export function triggerPassive(
  buff: Buff,
  gameState: GameState,
  position: number,
) {
  // const buffValue = parseBuffValue(buff, gameState, position);
  switch (buff.type) {
    case 0:
      break;
    case 1:
      // 攻擊
      if (!buff._1) {
        console.log("Wrong data");
        break;
      }
      if (buff._1.damageType === 0) {
        const damage = calcBasicDamage(position, buff._1.value, gameState);
        switch (buff._1.target) {
          case Target.ENEMY:
            gameState.enemy.hp -= damage;
            break;
        }
      }
      if (buff._1.damageType === 1) {
        const damage = calcUltDamage(
          position,
          buff._1.value,
          gameState,
          buff._1.isTrigger,
        );
        switch (buff._1.target) {
          case Target.ENEMY:
            gameState.enemy.hp -= damage;
            break;
        }
      }
      break;
    case 2:
      if (!buff._2) {
        console.log("Wrong data");
        break;
      }
      switch (buff._2.target) {
        case Target.SELF:
          gameState.characters[position].buff = [
            ...gameState.characters[position].buff,
            buff._2,
          ];
          break;
      }

      break;
    case 3:
      if (!buff._3) {
        console.log("Wrong data");
        break;
      }
      break;
    case 4:
      if (!buff._4) {
        console.log("Wrong data");
        break;
      }
      if (buff._4.target === Target.SELF) {
        gameState.characters[position].buff.forEach((buff) => {
          if (buff.id === buff._4?.targetSkill) {
            if (buff._3 && buff._3.stack < buff._3.maxStack) {
              buff._3.stack += buff._4.value;
            }
          }
        });
      }
      break;
    case 5:
      if (!buff._5) {
        console.log("Wrong data 5");
        break;
      }
      break;
    case 6:
      if (!buff._6) {
        console.log("Wrong data 6");
        break;
      }
      gameState.characters.forEach((character, index) => {
        const rawAttBuff = applyRawAttBuff(gameState, position);
        if (character.class === buff._6?.target) {
          gameState.characters[index].buff = [
            ...gameState.characters[index].buff,
            {
              id: `${buff.id}-buff`,
              name: buff.name,
              type: 0,
              condition: Condition.ULTIMATE,
              duration: 1,
              _0: {
                value: Math.ceil(rawAttBuff * buff._6.value),
                affectType: buff._6?.affectType,
              },
            },
          ];
        } else if (buff._6?.target === Target.ALL) {
          gameState.characters[index].buff = [
            ...gameState.characters[index].buff,
            {
              id: `${buff.id}-buff`,
              name: buff.name,
              type: 0,
              condition: Condition.ULTIMATE,
              duration: 1,
              _0: {
                value: Math.ceil(rawAttBuff * buff._6?.value),
                affectType: buff._6?.affectType,
              },
            },
          ];
        }
      });
      break;
    case 7:
      if (!buff._7) {
        console.log("Wrong data 7");
        break;
      }
      break;
  }
}

//傳功
export function applyRawAttBuff(gameState: GameState, position: number) {
  let tempAtk = gameState.characters[position].atk;
  let atkPercentage = 0;

  for (const buff of gameState.characters[position].buff) {
    if (buff.type === 0 && buff._0?.affectType === AffectType.ATK) {
      atkPercentage += buff._0?.value;
    }
    if (buff.type === 0 && buff._0?.affectType === AffectType.RAWATK) {
      tempAtk += buff._0?.value;
    }
  }
  return gameState.characters[position].atk * atkPercentage + tempAtk;
}

export function onTurnStart(gameState: GameState) {
  gameState.characters.forEach((character, position) => {
    for (const buff of character.buff) {
      if (
        buff.condition === Condition.EVERY_X_TURN &&
        buff.conditionTurn &&
        gameState.turns > 1
      ) {
        if ((gameState.turns - 1) % buff.conditionTurn === 0) {
          console.log("trigger");
          triggerPassive(buff, gameState, position);
        }
      }
      if (buff.condition === Condition.TURN) {
        if (buff.conditionTurn) {
          if (gameState.turns === buff.conditionTurn) {
            triggerPassive(buff, gameState, position);
          }
        }
      }
    }
  });
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
    state.enemy.buff.forEach((buff) => {
      if (buff.duration && buff.type === 0 && buff.duration !== 100) {
        buff.duration -= 1;
      }
    });

    state.characters.forEach((character) => {
      character.buff.forEach((buff) => {
        if (
          buff.duration &&
          (buff.type === 0 || buff.type === 6) &&
          buff.duration !== 100
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

    for (const character of state.characters) {
      character.isMoved = false;
    }
    state.turns += 1;
    onTurnStart(state);
  }
}
