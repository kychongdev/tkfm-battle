import { CharacterClass } from "../types/Character";
import { AffectType, Condition, Target } from "../types/Skill";
import { GameState } from "./GameState";

export function initPassiveSkill(position: number, gameState: GameState) {
  const id = gameState.characters[position].id;
  switch (id) {
    case "525":
      gameState.characters[position].buff = [
        ...gameState.characters[position].buff,
        {
          id: "525-1",
          name: "必殺時，追加「以自身攻擊力250%對目標造成傷害」",
          type: 1,
          condition: Condition.ULTIMATE,
          duration: 100,
          _1: {
            value: 2.5,
            isTrigger: false,
            target: Target.ENEMY,
            damageType: 1,
          },
        },
        {
          id: "525-2",
          name: "每經過3回合，觸發「使自身獲得必殺時，觸發『以自身攻擊力25%使我方攻擊者攻擊力增加(1回合)』(1回合)」",
          type: 2,
          condition: Condition.EVERY_X_TURN,
          conditionTurn: 3,
          duration: 100,
          _2: {
            name: "必殺時,觸發 以自身攻擊力25%使我方攻擊者攻擊力增加(1回合)",
            value: 0.25,
            type: 3,
            condition: Condition.ULTIMATE,
            target: Target.ATTACKER,
            affectType: AffectType.RAWATK,
          },
        },
        {
          id: "525-3",
          name: "每經過3回合，觸發「使自身獲得必殺時，觸發『以自身攻擊力25%使我方妨礙者攻擊力增加(1回合)』(1回合)」",
          type: 2,
          condition: Condition.EVERY_X_TURN,
          conditionTurn: 3,
          duration: 100,
          _2: {
            name: "必殺時,觸發 『以自身攻擊力25%使我方妨礙者攻擊力增加(1回合)』(1回合)」",
            value: 0.25,
            type: 3,
            condition: Condition.ULTIMATE,
            target: Target.OBSTRUCTER,
            affectType: AffectType.RAWATK,
          },
        },
      ];
      gameState.characters.forEach((character, index) => {
        if (
          character.class === CharacterClass.ATTACKER ||
          character.class === CharacterClass.OBSTRUCTER
        ) {
          gameState.characters[index].buff = [
            ...gameState.characters[index].buff,
            {
              id: "525-5",
              name: "必殺時，追加『以自身攻擊力100%對目標造成傷害』(50回合)",
              type: 1,
              condition: Condition.ULTIMATE,
              duration: 50,
              _1: {
                value: 1,
                isTrigger: false,
                target: Target.ENEMY,
                damageType: 1,
              },
            },
          ];
        }
      });
      break;
    // 使自身攻擊力增加10%
    case "527":
      break;
    case "531":
      break;
    case "532":
      break;
    default:
      break;
  }
}
