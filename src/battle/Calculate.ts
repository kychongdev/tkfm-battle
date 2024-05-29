import type { Buff } from "../types/Skill";
import {
  AffectType,
  Condition,
  SkillStackCondition,
  Target,
} from "../types/Skill";
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
        // x is gameState buff
        const isExist = gameState.characters[position].buff.some((x) => {
          return x.id === buff._4?.targetSkill;
        });

        if (isExist) {
          gameState.characters[position].buff.map((x) => {
            if (x.id === buff._4?.targetSkill) {
              if (x._3 && x._3.stack < x._3.maxStack) {
                if (x._3 && buff._4) {
                  console.log(buff._4.increaseStack);
                  x._3.stack += buff._4.increaseStack;
                  if (x._3.stack > x._3.maxStack) {
                    x._3.stack = x._3.maxStack;
                  }
                } else {
                  console.log("Wrong data buff._4");
                }
              }
            }
            return x;
          });
        } else {
          // purely typescript problem
          if (buff._4?.applyBuff) {
            gameState.characters[position].buff = [
              ...gameState.characters[position].buff,
              buff._4.applyBuff,
            ];
          } else {
            console.log("Wrong data buff._4.applyBuff");
          }
        }
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
      if (buff._7.activated) {
        console.log("Already activated");
        break;
      }

      if (buff._7?.target === Target.SELF) {
        const skillStackNum = gameState.characters[position].buff.find((x) => {
          return x.id === buff._7?.targetSkill;
        });
        if (buff._7?.stackCondition === SkillStackCondition.HIGHER) {
          if (
            skillStackNum?._3?.stack &&
            skillStackNum._3.stack > buff._7?.stack
          ) {
            const buffIndex = gameState.characters[position].buff.findIndex(
              (x) => x.id === buff.id,
            );

            //@ts-ignore
            gameState.characters[position].buff[buffIndex]._7.activated = true;

            if (buff._7.applyTarget === Target.SELF) {
              gameState.characters[position].buff = [
                ...gameState.characters[position].buff,
                buff._7.activateBuff,
              ];
            }
          }
        }
        if (buff._7?.stackCondition === SkillStackCondition.EQUALORHIGHER) {
          if (
            skillStackNum?._3?.stack &&
            skillStackNum._3.stack >= buff._7?.stack
          ) {
            console.log("equal or higher activated");
            const buffIndex = gameState.characters[position].buff.findIndex(
              (x) => x.id === buff.id,
            );

            //@ts-ignore
            gameState.characters[position].buff[buffIndex]._7.activated = true;
            gameState.characters[position].buff = [
              ...gameState.characters[position].buff,
              buff._7.activateBuff,
            ];
            if (buff._7.applyTarget === Target.SELF) {
              gameState.characters[position].buff = [
                ...gameState.characters[position].buff,
                buff._7.activateBuff,
              ];
            }
          }
        }
      }
      break;
    case 8:
      if (!buff._8) {
        console.log("Wrong data 8");
        break;
      }
      if (buff._8?.target === Target.SELF) {
        const skillStackNum = gameState.characters[position].buff.find((x) => {
          return x.id === buff._8?.targetSkill;
        });
        if (buff._8?.applyTarget === Target.SELF) {
          gameState.characters[position].buff = [
            ...gameState.characters[position].buff,
            buff._8.applyBuff,
          ];
        } else if (buff._8?.applyTarget === Target.ENEMY) {
          const applyBuff = buff._8.applyBuff;
          if (
            !applyBuff ||
            !applyBuff._0 ||
            !skillStackNum ||
            !skillStackNum._3
          ) {
            console.log("Wrong data 8 applyBuff");
            break;
          }
          gameState.enemy.buff = [
            ...gameState.enemy.buff,
            {
              id: applyBuff.id,
              name: applyBuff.name,
              type: 0,
              condition: Condition.NONE,
              duration: 1,
              _0: {
                value: applyBuff._0?.value * skillStackNum._3.stack,
                affectType: applyBuff._0?.affectType,
              },
            },
          ];
        }
      }
      break;
    case 9:
      if (!buff._9) {
        console.log("Wrong data 9");
        break;
      }
      break;
    case 10:
      if (!buff._10) {
        console.log("Wrong data 10");
        break;
      }
      break;
    case 11:
      if (!buff._11) {
        console.log("Wrong data 11");
        break;
      }
      if (buff._11?.target === Target.SELF) {
        gameState.characters[position].buff = [
          ...gameState.characters[position].buff,
          ...buff._11.applyBuff,
        ];
      } else if (buff._11?.target === Target.ENEMY) {
        gameState.enemy.buff = [...gameState.enemy.buff, ...buff._11.applyBuff];
      } else if (buff._11?.target === Target.ALL) {
        gameState.characters[position].buff = [
          ...gameState.characters[position].buff,
          ...buff._11.applyBuff,
        ];
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
        if (buff.duration && buff.duration !== 100) {
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
