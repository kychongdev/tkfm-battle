import { AffectType, BuffType, Condition, Target } from "../types/Skill";
import { GameState } from "./GameState";

export function initPassiveSkill(position: number, gameState: GameState) {
  const id = gameState.characters[position].id;
  switch (id) {
    case "532":
      // 必殺時，追加「使目標受到傷害增加15%(7回合)」
      gameState.characters[position].buff = [
        ...gameState.characters[position].buff,
        {
          name: "使目標受到傷害增加15%",
          type: BuffType.APPLYDEBUFF,
          value: 0.15,
          affect: AffectType.INCREASE_DMG_RECEIVED,
          target: Target.ENEMY,
          duration: 7,
          condition: Condition.ULTIMATE,
        },
        {
          //必殺時，追加「以自身最大HP7%對我方全體施放護盾(1回合)」
          name: "以自身最大HP7%對我方全體施放護盾(1回合)",
          type: BuffType.APPLYBUFF,
          value: 0.07,
          valueModfiy: "maxHp",
          affect: AffectType.SHIELD,
          target: Target.ALL,
          duration: 1,
          condition: Condition.ULTIMATE,
        },
        {
          //必殺時，追加「使目標受到必殺技傷害增加20%(7回合)」
          name: "使目標受到必殺技傷害增加20%(7回合)",
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
  }
}
