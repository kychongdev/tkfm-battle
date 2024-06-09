import { type Condition, Target, type Buff } from "../types/Skill";
import type { GameState } from "./GameState";
import { calcBasicDamage } from "./calcBasicDamage";
import { calcUltDamage } from "./calcUltDamage";

export function parseConditionAddOn(
  position: number,
  condition: Condition[],
  state: GameState,
) {
  for (const char of state.characters[position].buff) {
    if (condition.includes(char.condition)) {
      triggerAddOn(char, state, position);
    }
  }
}

export function triggerAddOn(
  buff: Buff,
  gameState: GameState,
  position: number,
) {
  switch (buff.type) {
    case 101:
      if (!buff._101) {
        console.log("Wrong data");
        break;
      }
      if (buff._101.damageType === 0) {
        calcBasicDamage(position, buff._101.value, gameState, buff._101.target);
      }
      if (buff._101.damageType === 1) {
        calcUltDamage(
          position,
          buff._101.value,
          gameState,
          buff._101.isTrigger,
          buff._101.target,
        );
      }
      break;
    case 104:
      if (!buff._104) {
        console.log("Wrong data");
        break;
      }
      if (buff._104.target === Target.SELF) {
        // x is gameState buff
        const isExist = gameState.characters[position].buff.some((x) => {
          return x.id === buff._104?.targetSkill;
        });

        if (isExist) {
          gameState.characters[position].buff.map((x) => {
            if (x.id === buff._104?.targetSkill) {
              if (x._3 && x._3.stack < x._3.maxStack) {
                if (x._3 && buff._104) {
                  console.log(buff._104.increaseStack);
                  x._3.stack += buff._104.increaseStack;
                  if (x._3.stack > x._3.maxStack) {
                    x._3.stack = x._3.maxStack;
                  }
                } else {
                  console.log("Wrong data buff._104");
                }
              }
            }
            return x;
          });
        } else {
          // purely typescript problem
          if (buff._104?.applyBuff) {
            gameState.characters[position].buff = [
              ...gameState.characters[position].buff,
              buff._104.applyBuff,
            ];
          } else {
            console.log("Wrong data buff._104.applyBuff");
          }
        }
      }
      if (buff._104.target === Target.ENEMY) {
        const isExist = gameState.enemies[gameState.targeting].buff.some(
          (x) => {
            return x.id === buff._104?.targetSkill;
          },
        );
        if (isExist) {
          gameState.enemies[gameState.targeting].buff.map((x) => {
            if (x.id === buff._104?.targetSkill) {
              if (x._3 && x._3.stack < x._3.maxStack) {
                if (x._3 && buff._104) {
                  x._3.stack += buff._104.increaseStack;
                  if (x._3.stack > x._3.maxStack) {
                    x._3.stack = x._3.maxStack;
                  }
                } else {
                  console.log("Wrong data buff._104");
                }
              }
            }
            return x;
          });
        } else {
          if (buff._104?.applyBuff) {
            gameState.enemies[gameState.targeting].buff = [
              ...gameState.enemies[gameState.targeting].buff,
              buff._104.applyBuff,
            ];
          } else {
            console.log("Wrong data buff._104.applyBuff");
          }
        }
      }
      if (buff._104.target === Target.ALL) {
        gameState.characters.forEach((_, index) => {
          const isExist = gameState.characters[index].buff.some((x) => {
            return x.id === buff._104?.targetSkill;
          });

          if (isExist) {
            gameState.characters[index].buff.map((x) => {
              if (x.id === buff._104?.targetSkill) {
                if (x._3 && x._3.stack < x._3.maxStack) {
                  if (x._3 && buff._104) {
                    console.log(buff._104.increaseStack);
                    x._3.stack += buff._104.increaseStack;
                    if (x._3.stack > x._3.maxStack) {
                      x._3.stack = x._3.maxStack;
                    }
                  } else {
                    console.log("Wrong data buff._104");
                  }
                }
              }
              return x;
            });
          } else {
            // purely typescript problem
            if (buff._104?.applyBuff) {
              gameState.characters[index].buff = [
                ...gameState.characters[index].buff,
                buff._104.applyBuff,
              ];
            } else {
              console.log("Wrong data buff._104.applyBuff");
            }
          }
        });
      }
      break;
  }
}
