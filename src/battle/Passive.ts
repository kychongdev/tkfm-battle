import {
  AffectType,
  BuffType,
  Condition,
  DurationType,
  Target,
  ValueType,
} from "../types/Skill";
import { GameState } from "./GameState";

export function initPassiveSkill(position: number, gameState: GameState) {
  const id = gameState.characters[position].id;
  switch (id) {
    case "527":
      // 第一回合時，觸發「使自身必殺技當前CD減少30回合」
      // 行動時，觸發「使自身必殺技當前CD減少1回合」
      // 普攻時 ，觸發「《強制入睡》」
      //
      // 《強制入睡》
      // 使自身以外我方全體獲得攻擊時，觸發「以自身攻擊力25%對目標造成傷害」(1回合)
      // 第4回合時，觸發「使我方全體必殺技傷害增加30%(16回合)」
      // 第7回合時，觸發「使我方全體必殺技傷害增加30%(13回合)」
      // 第10回合時，觸發「使我方全體必殺技傷害增加40%(10回合)」
      // 使自身攻擊力增加10%
      gameState.characters[position].buff = [
        ...gameState.characters[position].buff,
        {
          name: "第一回合時，觸發「使自身必殺技當前CD減少30回合」",
          type: BuffType.DECREASECD,
          value: 30,
          affect: AffectType.NONE,
          target: Target.SELF,
          condition: Condition.TURN,
          conditionTurn: 1,
        },
        {
          name: "行動時，觸發「使自身必殺技當前CD減少1回合」",
          type: BuffType.DECREASECD,
          value: 1,
          affect: AffectType.NONE,
          target: Target.SELF,
          durationType: DurationType.PERMANENT,
          condition: Condition.MOVE,
        },
        {
          name: "普攻時 ，觸發「《強制入睡》」",
          type: BuffType.TRIGGERATTACK,
          value: 0,
          affect: AffectType.NONE,
          target: Target.SELF,
          durationType: DurationType.PERMANENT,
          condition: Condition.BASIC_ATTACK,
        },
        {
          name: "《強制入睡》",
          type: BuffType.APPLYRAWBUFF,
          value: 0,
          affect: AffectType.NONE,
          target: Target.ALLEXCEPTSELF,
          condition: Condition.ATTACK,
          applyBuff: {
            name: "以自身攻擊力25%對目標造成傷害",
            type: BuffType.BASICATTACK,
            value: 0.25,
            target: Target.ENEMY,
            durationType: DurationType.TEMPORARY,
            applyBuffDuration: 1,
            condition: Condition.ATTACK,
          },
        },
        {
          name: "第4回合時，觸發「使我方全體必殺技傷害增加30%」",
          type: BuffType.APPLYBUFF,
          value: 0.3,
          affect: AffectType.ULTIMATE_DAMAGE,
          target: Target.ALL,
          applyBuffDuration: 16,
          durationType: DurationType.TEMPORARY,
          condition: Condition.TURN,
          conditionTurn: 4,
        },
        {
          name: "第7回合時，觸發「使我方全體必殺技傷害增加30%」",
          type: BuffType.APPLYBUFF,
          value: 0.3,
          affect: AffectType.ULTIMATE_DAMAGE,
          target: Target.ALL,
          applyBuffDuration: 13,
          durationType: DurationType.TEMPORARY,
          condition: Condition.TURN,
          conditionTurn: 7,
        },
        {
          name: "第10回合時，觸發「使我方全體必殺技傷害增加40%」",
          type: BuffType.APPLYBUFF,
          value: 0.4,
          affect: AffectType.ULTIMATE_DAMAGE,
          target: Target.ALL,
          applyBuffDuration: 10,
          durationType: DurationType.TEMPORARY,
          condition: Condition.TURN,
          conditionTurn: 10,
        },
      ];
      break;

    // 第一回合時，觸發「使自身造成傷害增加4%(最多5層)」
    // 每經過三回合時，觸發「使自身《破碎蒼空》的造成傷害效果增加2層」
    // :detail_passive: 時空支配
    // 造成傷害增加20%
    // 必殺時，根據《破碎蒼空》的造成傷害效果層數觸發「使目標受到時御者伊娜絲傷害增加10%(4回合)」
    // :detail_passive: 夸姣光陰
    // 普攻時，追加「以自身攻擊力70%對目標造成傷害」
    // 必殺時，追加「以自身攻擊力70%對目標造成傷害」
    // 使自身攻擊力增加10%
    case "531":
      gameState.characters[position].buff = [
        ...gameState.characters[position].buff,
        {
          name: "第一回合時，觸發「使自身造成傷害增加4%(最多5層)」",
          type: BuffType.APPLYBUFF,
          value: 0.04,
          affect: AffectType.INCREASE_DMG,
          target: Target.SELF,
          maxStack: 5,
          increaseStack: 1,
          durationType: DurationType.STACK,
          condition: Condition.TURN,
          conditionTurn: 1,
          unique_id: "531_1",
        },
        {
          name: "每經過三回合時，觸發「使自身《破碎蒼空》的造成傷害效果增加2層」",
          type: BuffType.APPLYBUFF,
          value: 0.04,
          affect: AffectType.INCREASE_DMG,
          increaseStack: 2,
          maxStack: 5,
          target: Target.SELF,
          durationType: DurationType.STACK,
          conditionTurn: 3,
          unique_id: "531_1",
          condition: Condition.EVERY_X_TURN,
        },
        {
          name: "造成傷害增加20%",
          type: BuffType.BUFF,
          value: 0.2,
          affect: AffectType.INCREASE_DMG,
          durationType: DurationType.PERMANENT,
          target: Target.SELF,
          condition: Condition.NONE,
        },
        {
          // TODO fix to 531 unit
          name: "必殺時，根據《破碎蒼空》的造成傷害效果層數觸發「使目標受到時御者伊娜絲傷害增加10%(4回合)」",
          type: BuffType.APPLYDEBUFF,
          value: 0.1,
          affect: AffectType.OTHER_CHARACTER_INCREASE_DAMAGE,
          affectTarget: "531",
          valueType: ValueType.SKILL,
          valueTarget: "531_1",
          target: Target.ENEMY,
          durationType: DurationType.TEMPORARY,
          applyBuffDuration: 4,
          condition: Condition.ULTIMATE,
        },
        {
          name: "普攻時，追加「以自身攻擊力70%對目標造成傷害」",
          type: BuffType.BASICATTACK,
          value: 0.7,
          target: Target.ENEMY,
          durationType: DurationType.PERMANENT,
          condition: Condition.BASIC_ATTACK,
        },
        {
          name: "必殺時，追加「以自身攻擊力70%對目標造成傷害」",
          type: BuffType.ULTIMATEATTACK,
          value: 0.7,
          target: Target.ENEMY,
          durationType: DurationType.PERMANENT,
          condition: Condition.ULTIMATE,
        },
        {
          name: "使自身攻擊力增加10%",
          type: BuffType.BUFF,
          value: 0.1,
          affect: AffectType.ATK,
          durationType: DurationType.PERMANENT,
          target: Target.SELF,
          condition: Condition.NONE,
        },
      ];
      break;

    case "532":
      // 必殺時，追加「使目標受到傷害增加15%(7回合)」
      gameState.characters[position].buff = [
        ...gameState.characters[position].buff,
        {
          name: "必殺時，使目標受到傷害增加15%",
          type: BuffType.APPLYDEBUFF,
          value: 0.15,
          affect: AffectType.INCREASE_DMG_RECEIVED,
          target: Target.ENEMY,
          applyBuffDuration: 7,
          durationType: DurationType.TEMPORARY,
          condition: Condition.ULTIMATE,
        },
        {
          //必殺時，追加「以自身最大HP7%對我方全體施放護盾(1回合)」
          name: "必殺時，以自身最大HP7%對我方全體施放護盾(1回合)",
          type: BuffType.APPLYBUFF,
          value: 0.07,
          valueType: ValueType.MAXHP,
          affect: AffectType.SHIELD,
          target: Target.ALL,
          applyBuffDuration: 1,
          durationType: DurationType.TEMPORARY,
          condition: Condition.ULTIMATE,
        },
        {
          //必殺時，追加「使目標受到必殺技傷害增加20%(7回合)」
          name: "必殺時，使目標受到必殺技傷害增加20%(7回合)",
          type: BuffType.APPLYDEBUFF,
          value: 0.2,
          affect: AffectType.ULTIMATE_DAMAGE,
          target: Target.ENEMY,
          applyBuffDuration: 7,
          durationType: DurationType.TEMPORARY,
          condition: Condition.ULTIMATE,
        },
        {
          //使自身攻擊力增加10%
          name: "攻擊力增加10%",
          type: BuffType.BUFF,
          value: 0.1,
          affect: AffectType.ATK,
          target: Target.SELF,
          durationType: DurationType.PERMANENT,
          condition: Condition.NONE,
        },
      ];
      break;
    default:
      break;
  }
}
