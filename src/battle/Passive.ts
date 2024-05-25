import { CharacterClass } from "../types/Character";
import {
  AffectType,
  Condition,
  SkillStackCondition,
  SpecialCondition,
  Target,
} from "../types/Skill";
import type { GameState } from "./GameState";

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
            id: "525-2-1",
            name: "必殺時,觸發 以自身攻擊力25%使我方攻擊者攻擊力增加(1回合)",
            type: 6,
            target: Target.SELF,
            condition: Condition.ULTIMATE,
            duration: 1,
            _6: {
              value: 0.25,
              target: Target.ATTACKER,
              affectType: AffectType.RAWATK,
            },
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
            id: "525-3-1",
            name: "必殺時,觸發 『以自身攻擊力25%使我方妨礙者攻擊力增加(1回合)』(1回合)」",
            type: 6,
            duration: 1,
            target: Target.SELF,
            condition: Condition.ULTIMATE,
            _6: {
              value: 0.25,
              target: Target.OBSTRUCTER,
              affectType: AffectType.RAWATK,
            },
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
              id: "525-4",
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
    case "526":
      gameState.characters[position].buff = [
        ...gameState.characters[position].buff,
        {
          id: "526-1",
          name: "當前HP≤99%時，發動「自身受到傷害減少10%」",
          type: 5,
          condition: Condition.NONE,
          duration: 100,
          _5: {
            condition: SpecialCondition.HP_LOWER_THAN,
            conditionValue: 99,
            value: 0.1,
            affectType: AffectType.DECREASE_DMG_RECEIVED,
            target: Target.ATTACKER,
          },
        },
        {
          id: "526-2",
          name: "第一回合，觸發「給予自身『連環陷阱(0層)』」",
          type: 2,
          condition: Condition.ON_TURN_START,
          duration: 100,
          _2: {
            id: "526-buff-1",
            name: "『連環陷阱』",
            type: 3,
            condition: Condition.NONE,
            target: Target.SELF,
            duration: 100,
            _3: {
              id: "526-buff-1",
              name: "連環陷阱",
              stack: 0,
              maxStack: 9,
              affectType: AffectType.NONE,
            },
          },
        },
        {
          id: "526-3",
          name: "每經過1回合時，觸發「給予自身『連環陷阱(最多9層)』」",
          type: 4,
          condition: Condition.EVERY_X_TURN,
          conditionTurn: 1,
          duration: 100,
          _4: {
            value: 1,
            targetSkill: "526-buff-1",
            target: Target.SELF,
          },
        },
        {
          id: "526-3",
          name: "必殺時，觸發「以自身攻擊力30%使我方全體攻擊力增加(1回合)」",
          type: 6,
          condition: Condition.ULTIMATE,
          duration: 100,
          _6: {
            value: 0.3,
            target: Target.ALL,
            affectType: AffectType.RAWATK,
          },
        },
        {
          // 當自身「連環陷阱」層數>3層時，開啟「受到護盾效果增加20%」
          // 當自身「連環陷阱」層數>6層時，開啟「攻擊力增加20%」
          // 當自身「連環陷阱」層數=9層時，開啟「攻擊力增加20%」
          id: "526-4",
          name: "當自身「連環陷阱」層數>3層時，開啟「受到護盾效果增加20%」",
          type: 7,
          condition: Condition.NONE,
          duration: 100,
          _7: {
            stackCondition: SkillStackCondition.HIGHER,
            stack: 3,
            targetSkill: "526-buff-1",
            activateBuff: {
              id: "526-4-1",
              name: "受到護盾效果增加20%",
              type: 0,
              condition: Condition.NONE,
              duration: 1,
              _0: {
                value: 0.2,
                affectType: AffectType.SHIELD_RATE_RECEIVED,
              },
            },
          },
        },
        {
          id: "526-5",
          name: "當自身「連環陷阱」層數>6層時，開啟「攻擊力增加20%」",
          type: 7,
          condition: Condition.NONE,
          duration: 100,
          _7: {
            stackCondition: SkillStackCondition.HIGHER,
            stack: 6,
            targetSkill: "526-buff-1",
            activateBuff: {
              id: "526-5-1",
              name: "攻擊力增加20%",
              type: 0,
              condition: Condition.NONE,
              duration: 1,
              _0: {
                value: 0.2,
                affectType: AffectType.ATK,
              },
            },
          },
        },
        {
          id: "526-6",
          name: "當自身「連環陷阱」層數=9層時，開啟「攻擊力增加20%」",
          type: 7,
          condition: Condition.NONE,
          duration: 100,
          _7: {
            stackCondition: SkillStackCondition.EQUAL,
            stack: 9,
            targetSkill: "526-buff-1",
            activateBuff: {
              id: "526-6-1",
              name: "攻擊力增加20%",
              type: 0,
              condition: Condition.NONE,
              duration: 1,
              _0: {
                value: 0.2,
                affectType: AffectType.ATK,
              },
            },
          },
        },
        // 必殺時，觸發「依據自身『連環陷阱』的層數觸發『使目標受到火、水屬性傷害增加3%(1回合)』」
        {
          id: "526-7",
          name: "必殺時，觸發「依據自身『連環陷阱』的層數觸發『使目標受到火、水屬性傷害增加3%(1回合)』」",
          type: 8,
          condition: Condition.ULTIMATE,
          duration: 100,
          _8: {
            value: 0.03,
            stackTarget: "526-buff-1",
            target: Target.ENEMY,
            applyBuff: {
              id: "526-7-1",
              name: "使目標受到火屬性傷害增加3%",
              type: 0,
              condition: Condition.NONE,
              duration: 1,
              _0: {
                value: 0.03,
                affectType: AffectType.FIRE,
              },
            },
          },
        },

        // :detail_passive2: 減傷+ (6潛)
        // 使自身受到傷害減少5%
      ];
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
