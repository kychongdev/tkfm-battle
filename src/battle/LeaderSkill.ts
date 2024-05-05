import { GameState } from "./GameState";
import {
  AffectType,
  BuffType,
  Condition,
  DurationType,
  Target,
} from "../types/Skill";
import { CharacterClass } from "../types/Character";

export function triggerLeaderSkill(leader: string, gameState: GameState) {
  switch (leader) {
    // 我方全體HP增加25%
    // 我方全體攻擊力增加90%
    // 我方全體攻擊者造成傷害增加40%
    // 我方全體妨礙者造成傷害增加40%
    // 自身攻擊力增加90%
    case "531":
      gameState.characters.forEach((character) => {
        character.buff = [
          ...character.buff,
          {
            name: "最大HP增加25%",
            type: BuffType.BUFF,
            value: 0.25,
            affect: AffectType.HP,
            target: Target.SELF,
            condition: Condition.NONE,
          },
        ];
        character.buff = [
          ...character.buff,
          {
            name: "攻擊力增加90%",
            type: BuffType.BUFF,
            value: 0.9,
            affect: AffectType.ATK,
            target: Target.SELF,
            condition: Condition.NONE,
          },
        ];
        if (
          character.class === CharacterClass.ATTACKER ||
          character.class === CharacterClass.OBSTRUCTER
        ) {
          character.buff = [
            ...character.buff,
            {
              name: "造成傷害增加40%",
              type: BuffType.BUFF,
              value: 0.4,
              affect: AffectType.INCREASE_DMG,
              target: Target.SELF,
              condition: Condition.NONE,
            },
          ];
        }
        gameState.characters[0].buff = [
          ...gameState.characters[0].buff,
          {
            name: "攻擊力增加90%",
            type: BuffType.BUFF,
            value: 0.9,
            affect: AffectType.ATK,
            target: Target.SELF,
            condition: Condition.NONE,
          },
        ];
      });
      break;
    // 532 : 幽夜女爵 卡蒂雅
    // 我方全體最大HP增加20%
    // 我方全體攻擊力增加80%
    // 當我方隊伍有至少3名水屬性角色時，自身獲得《黑夜倩影》
    // 當我方隊伍有至少2名闇屬性角色時，我方站位3、5角色獲得《傭兵的準則》
    //
    // 《黑夜倩影》
    // 攻擊力增加60%
    // 必殺時，觸發「使目標受到闇屬性傷害增加5%(最多3層)、使目標受到水屬性傷害增加5%(最多3層)」
    // 攻擊時，觸發「以自身攻擊力40%使我方全體攻擊力增加 (1回合)」
    // 《傭兵的準則》
    // 造成傷害增加30%
    // 必殺時，追加「以自身攻擊力40%對目標造成傷害」
    case "532":
      gameState.characters.forEach((character) => {
        character.buff = [
          ...character.buff,
          {
            name: "最大HP增加20%",
            type: BuffType.BUFF,
            value: 0.2,
            affect: AffectType.HP,
            target: Target.SELF,
            condition: Condition.NONE,
          },
        ];
        character.buff = [
          ...character.buff,
          {
            name: "攻擊力增加80%",
            type: BuffType.BUFF,
            value: 0.8,
            affect: AffectType.ATK,
            target: Target.SELF,
            condition: Condition.NONE,
          },
        ];
      });
      const waterCount = gameState.characters.filter(
        (character) => character.attribute === 1,
      );
      if (waterCount.length >= 3) {
        gameState.characters[0].buff = [
          ...gameState.characters[0].buff,
          {
            name: "攻擊力增加60%",
            type: BuffType.BUFF,
            value: 0.6,
            affect: AffectType.ATK,
            target: Target.SELF,
            condition: Condition.NONE,
          },
          {
            name: "必殺時，觸發「使目標受到闇屬性傷害增加5%(最多3層)、",
            type: BuffType.APPLYDEBUFF,
            value: 0.05,
            affect: AffectType.DARK,
            target: Target.ENEMY,
            condition: Condition.ULTIMATE,
            durationType: DurationType.STACK,
            maxStack: 3,
            unique_id: "532_1",
          },
          {
            name: "必殺時，觸發「使目標受到水屬性傷害增加5%(最多3層)」",
            type: BuffType.APPLYDEBUFF,
            value: 0.05,
            affect: AffectType.WATER,
            target: Target.ENEMY,
            condition: Condition.ULTIMATE,
            maxStack: 3,
            durationType: DurationType.STACK,
            unique_id: "532_2",
          },
          {
            name: "攻擊時，觸發「以自身攻擊力40%使我方全體攻擊力增加 (1回合)」",
            type: BuffType.ATKBUFF,
            value: 0.4,
            affect: AffectType.RAWATK,
            target: Target.ALL,
            condition: Condition.ATTACK,
          },
        ];
      }
      const darkCount = gameState.characters.filter(
        (character) => character.attribute === 4,
      );

      if (darkCount.length >= 2) {
        const x = [
          {
            name: "造成傷害增加30%",
            type: BuffType.BUFF,
            value: 0.3,
            affect: AffectType.INCREASE_DMG,
            target: Target.SELF,
            condition: Condition.NONE,
          },
          {
            name: "必殺時，追加「以自身攻擊力40%對目標造成傷害」",
            type: BuffType.ATTACK,
            value: 0.4,
            target: Target.ENEMY,
            condition: Condition.ULTIMATE,
          },
        ];
        gameState.characters[2].buff = [...gameState.characters[2].buff, ...x];
        gameState.characters[4].buff = [...gameState.characters[4].buff, ...x];
      }
      break;
    default:
      break;
  }
}
