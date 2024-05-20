import { GameState } from "./GameState";
import { AffectType, Condition } from "../types/Skill";

export function triggerLeaderSkill(leader: string, gameState: GameState) {
  switch (leader) {
    // 我方全體最大HP增加20%
    // 我方全體攻擊力增加50%
    // 我方全體造成傷害增加50%
    // 我方全體必殺技傷害增加70%

    case "525":
      gameState.characters.forEach((_, index) => {
        gameState.characters[index].buff = [
          ...gameState.characters[index].buff,
          {
            id: "525-Lead-1",
            name: "最大HP增加20%",
            type: 0,
            condition: Condition.NONE,
            duration: 100,
            _0: {
              affectType: AffectType.HP,
              value: 0.2,
            },
          },
          {
            id: "525-Lead-2",
            name: "攻擊力增加50%",
            type: 0,
            condition: Condition.NONE,
            duration: 100,
            _0: {
              affectType: AffectType.ATK,
              value: 0.5,
            },
          },
          {
            id: "525-Lead-3",
            name: "造成傷害增加50%",
            type: 0,
            condition: Condition.NONE,
            duration: 100,
            _0: {
              affectType: AffectType.INCREASE_DMG,
              value: 0.5,
            },
          },
          {
            id: "525-Lead-4",
            name: "必殺技傷害增加70%",
            type: 0,
            condition: Condition.NONE,
            duration: 100,
            _0: {
              affectType: AffectType.ULTIMATE_DAMAGE,
              value: 0.7,
            },
          },
        ];
      });

      break;
    default:
      break;
  }
}
