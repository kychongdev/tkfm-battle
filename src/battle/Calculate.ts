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
      // 傳功
      gameState.characters.forEach((character, index) => {
        const rawAttBuff = applyRawAttBuff(gameState, position);
        // 需要增加更多條件
        if (character.class === buff._2?.target) {
          gameState.characters[index].buff = [
            ...gameState.characters[index].buff,
            {
              id: "525-2",
              name: buff._2?.name,
              type: 0,
              condition: Condition.ULTIMATE,
              duration: 1,
              _0: {
                value: Math.ceil(rawAttBuff * buff._2?.value),
                affectType: buff._2?.affectType,
              },
            },
          ];
        } else if (buff._2?.target === Target.ALL) {
          gameState.characters[index].buff = [
            ...gameState.characters[index].buff,
            {
              id: "525-2",
              name: buff._2?.name,
              type: 0,
              condition: Condition.ULTIMATE,
              duration: 1,
              _0: {
                value: Math.ceil(rawAttBuff * buff._2?.value),
                affectType: buff._2?.affectType,
              },
            },
          ];
        }
      });
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
    for (const buff of state.enemy.buff) {
      if (buff.duration && buff.type === 0 && buff.duration !== 100) {
        buff.duration -= 1;
      }
    }

    for (const character of state.characters) {
      for (const buff of character.buff) {
        if (buff.duration && buff.type === 0 && buff.duration !== 100) {
          buff.duration -= 1;
        }
      }
      character.cd = character.cd > 0 ? character.cd - 1 : 0;
    }

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
