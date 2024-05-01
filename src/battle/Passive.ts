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
          stackTarget: "531_1",
          conditionTurn: 3,
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
          affect: AffectType.INCREASE_DMG_RECEIVED,
          valueType: ValueType.SKILL,
          valueTarget: "531_1",
          target: Target.ENEMY,
          durationType: DurationType.TEMPORARY,
          duration: 4,
          condition: Condition.ULTIMATE,
        },
        {
          name: "普攻時，追加「以自身攻擊力70%對目標造成傷害」",
          type: BuffType.ATTACK,
          value: 0.7,
          target: Target.ENEMY,
          durationType: DurationType.PERMANENT,
          condition: Condition.BASIC_ATTACK,
        },
        {
          name: "必殺時，追加「以自身攻擊力70%對目標造成傷害」",
          type: BuffType.ATTACK,
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
          duration: 7,
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
          duration: 1,
          condition: Condition.ULTIMATE,
        },
        {
          //必殺時，追加「使目標受到必殺技傷害增加20%(7回合)」
          name: "必殺時，使目標受到必殺技傷害增加20%(7回合)",
          type: BuffType.APPLYDEBUFF,
          value: 0.2,
          affect: AffectType.ULTIMATE_DAMAGE,
          target: Target.ENEMY,
          duration: 7,
          condition: Condition.ULTIMATE,
        },
        {
          //使自身攻擊力增加10%
          name: "攻擊力增加10%",
          type: BuffType.BUFF,
          value: 0.1,
          affect: AffectType.ATK,
          target: Target.SELF,
          condition: Condition.NONE,
        },
      ];
      break;
    default:
      break;
  }
}
