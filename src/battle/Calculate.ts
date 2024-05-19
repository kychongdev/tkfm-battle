import { Buff, Condition, Target } from "../types/Skill";
import character from "../assets/character.json";
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

export function calcBasicDamage(
  position: number,
  attackPercentage: number,
  gameState: GameState,
) {
  return 5;
}

export function calcUltDamage(
  position: number,
  attackPercentage: number,
  gameState: GameState,
  isTrigger: boolean,
): number {
  return 10;
}

// export function BasicAttack(
//   position: number,
//   gameState: GameState,
//   target: number,
// ) {
//   calculateBasicDamage(position, 1, gameState);
//   if (target == 5) {
//     gameState.enemy.hp -= calculateBasicDamage(position, 1, gameState);
//   } else {
//     gameState.characters[target].hp -= calculateBasicDamage(
//       position,
//       1,
//       gameState,
//     );
//   }
// }

// Only initiate once
export function checkHpBuff(gameState: GameState) {
  gameState.characters.forEach((character) => {
    // let hpBuff = 1;
    // character.buff.forEach((buff) => {
    //   if (buff.affect === AffectType.HP) {
    //     hpBuff += buff.value;
    //   }
    // });
    // character.hp = Math.ceil(character.hp * hpBuff);
  });
}

// When activate condition
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

// function parseAffectName(
//   buffValue: number,
//   buffAffect: AffectType | undefined,
//   affectTarget: string | undefined,
//   buffStack?: number,
// ) {
//   const stack = buffStack ?? 1;
//   switch (buffAffect) {
//     case AffectType.INCREASE_DMG:
//       return "造成傷害增加" + buffValue * 100 * stack + "% ";
//     case AffectType.INCREASE_DMG_RECEIVED:
//       return "受到傷害增加" + buffValue * 100 * stack + "% ";
//     case AffectType.ULTIMATE_DAMAGE:
//       return "受到必殺技傷害增加" + buffValue * 100 * stack + "% ";
//     case AffectType.DARK:
//       return "受到暗屬性傷害增加" + buffValue * 100 * stack + "% ";
//     case AffectType.WATER:
//       return "受到水屬性傷害增加" + buffValue * 100 * stack + "% ";
//     case AffectType.SHIELD:
//       return buffValue + "護盾";
//     case AffectType.OTHER_CHARACTER_INCREASE_DAMAGE:
//       //@ts-ignore
//       const name = character.name[affectTarget];
//       return (
//         "受到" +
//         (name ?? "無法讀取") +
//         "傷害增加" +
//         buffValue * 100 * stack +
//         "% "
//       );
//     default:
//       return "";
//   }
// }

// function parseBuffValue(buff: Buff, gameState: GameState, position: number) {
//   switch (buff.valueType) {
//     case ValueType.MAXHP:
//       return Math.ceil(gameState.characters[position].maxHp * buff.value);
//     case ValueType.SKILL:
//       const valueMultiply = gameState.characters[position].buff.filter(
//         (othersBuff) => {
//           return othersBuff.unique_id === buff.valueTarget + "_ACTIVATE";
//         },
//       );
//       const skillStack = valueMultiply[0].stack ?? 1;
//       return +(buff.value * skillStack).toFixed(2);
//     default:
//       return buff.value;
//   }
// }

export function triggerPassive(
  buff: Buff,
  gameState: GameState,
  position: number,
) {
  // const buffValue = parseBuffValue(buff, gameState, position);
  switch (buff.type) {
    case 1:
      break;
    case 2:
      if (!buff._1) {
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
  }
}

export function onTurnStart(gameState: GameState) {
  // gameState.characters.forEach((character, position) => {
  //   character.buff.forEach((buff) => {
  //     if (
  //       buff.condition === Condition.EVERY_X_TURN &&
  //       buff.conditionTurn &&
  //       gameState.turns > 1
  //     ) {
  //       if ((gameState.turns - 1) % buff.conditionTurn === 0) {
  //         triggerPassive(buff, gameState, position);
  //       }
  //     }
  //     if (buff.condition === Condition.TURN) {
  //       if (buff.conditionTurn) {
  //         if (gameState.turns === buff.conditionTurn) {
  //           triggerPassive(buff, gameState, position);
  //         }
  //       }
  //     }
  //   });
  // });
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
      if (
        buff.duration &&
        (buff.type === BuffType.BUFF || buff.type === BuffType.DEBUFF) &&
        buff.duration !== 100
      ) {
        buff.duration -= 1;
      }
    });

    state.characters.forEach((character) => {
      character.buff.forEach((buff) => {
        if (
          buff.duration &&
          (buff.type === BuffType.BUFF || buff.type === BuffType.DEBUFF) &&
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
    state.characters.forEach((character) => {
      character.isMoved = false;
    });
    state.turns += 1;
    onTurnStart(state);
  }
}
