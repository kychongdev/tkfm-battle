import type { GameState } from "./GameState";
import { AffectType, Condition, Target } from "../types/Skill";
import { CharacterClass } from "../types/Character";

export function triggerLeaderSkill(leader: string, gameState: GameState) {
  switch (leader) {
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
              affectType: AffectType.MAXHP,
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
    case "526":
      {
        const characterClassCondition = [
          CharacterClass.ATTACKER,
          CharacterClass.OBSTRUCTER,
          CharacterClass.SUPPORT,
          CharacterClass.PROTECTOR,
          CharacterClass.HEALER,
        ];
        console.log(characterClassCondition);
        gameState.characters.forEach((character) => {
          console.log(character.class);
          if (characterClassCondition.includes(character.class)) {
            const index = characterClassCondition.indexOf(character.class);
            if (index !== -1) {
              characterClassCondition.splice(
                characterClassCondition.indexOf(character.class),
                1,
              );
            }
          }
        });
        gameState.characters.forEach((_, index) => {
          gameState.characters[index].buff = [
            ...gameState.characters[index].buff,
            {
              id: "526-Lead-1",
              name: "我方全體最大HP增加30%",
              type: 0,
              condition: Condition.NONE,
              duration: 100,
              _0: {
                affectType: AffectType.MAXHP,
                value: 0.3,
              },
            },
            {
              id: "526-Lead-2",
              name: "必殺時，觸發「依據自身『連環陷阱』的層數觸發『使目標受到光屬性傷害增加6%(1回合)』」",
              type: 8,
              condition: Condition.ULTIMATE,
              duration: 100,
              _8: {
                value: 0.03,
                target: Target.SELF,
                targetSkill: "526-2-1",
                applyTarget: Target.ENEMY,
                applyBuff: {
                  id: "526-Lead-2-1",
                  name: "受到水屬性傷害增加3%",
                  type: 0,
                  condition: Condition.NONE,
                  duration: 1,
                  _0: {
                    value: 0.06,
                    affectType: AffectType.LIGHT,
                  },
                },
              },
            },
            {
              id: "526-Lead-3",
              name: "必殺時，觸發「依據自身『連環陷阱』的層數觸發『使目標受到暗屬性傷害增加6%(1回合)』」",
              type: 8,
              condition: Condition.ULTIMATE,
              duration: 100,
              _8: {
                value: 0.03,
                target: Target.SELF,
                targetSkill: "526-2-1",
                applyTarget: Target.ENEMY,
                applyBuff: {
                  id: "526-Lead-3-1",
                  name: "受到暗屬性傷害增加6%",
                  type: 0,
                  condition: Condition.NONE,
                  duration: 1,
                  _0: {
                    value: 0.06,
                    affectType: AffectType.DARK,
                  },
                },
              },
            },

            {
              id: "526-Lead-4",
              name: "必殺時，觸發「依據自身『連環陷阱』的層數觸發『使目標受到火屬性傷害增加3%(1回合)』」",
              type: 8,
              condition: Condition.ULTIMATE,
              duration: 100,
              _8: {
                value: 0.03,
                target: Target.SELF,
                targetSkill: "526-2-1",
                applyTarget: Target.ENEMY,
                applyBuff: {
                  id: "526-Lead-4-1",
                  name: "受到火屬性傷害增加3%",
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
            {
              id: "526-Lead-5",
              name: "必殺時，觸發「依據自身『連環陷阱』的層數觸發『使目標受到火、水屬性傷害增加3%(1回合)』」",
              type: 8,
              condition: Condition.ULTIMATE,
              duration: 100,
              _8: {
                value: 0.03,
                target: Target.SELF,
                targetSkill: "526-2-1",
                applyTarget: Target.ENEMY,
                applyBuff: {
                  id: "526-Lead-5-1",
                  name: "受到水屬性傷害增加3%",
                  type: 0,
                  condition: Condition.NONE,
                  duration: 1,
                  _0: {
                    value: 0.03,
                    affectType: AffectType.WATER,
                  },
                },
              },
            },
          ];
        });

        gameState.characters[0].buff = [
          ...gameState.characters[0].buff,
          {
            id: "526-Lead-2",
            name: "必殺時，觸發「以自身最大HP10%給予我方全體護盾(1回合)」",
            type: 10,
            condition: Condition.ULTIMATE,
            duration: 100,
            _10: {
              target: Target.ALL,
              value: 0.1,
              hpBased: "526",
              affectType: AffectType.RAW_SHIELD,
            },
          },
        ];

        console.log(characterClassCondition);
        if (characterClassCondition.length <= 1) {
          gameState.characters.forEach((_, index) => {
            gameState.characters[index].buff = [
              ...gameState.characters[index].buff,
              {
                id: "526-Lead-3",
                name: "《萬聖搗蛋派對！》",
                type: 0,
                condition: Condition.NONE,
                duration: 100,
                _0: {
                  affectType: AffectType.ATK,
                  value: 1.2,
                },
              },
              {
                id: "526-Lead-2",
                name: "《萬聖搗蛋派對！》",
                type: 0,
                condition: Condition.NONE,
                duration: 100,
                _0: {
                  affectType: AffectType.INCREASE_DMG,
                  value: 0.5,
                },
              },
            ];
          });
        }
      }

      // 我方全體獲得「當我方隊伍恰好為4種角色定位時，開啟 《萬聖搗蛋派對！》」
      //
      // 《萬聖搗蛋派對！》
      // 攻擊力增加120%
      // 造成傷害增加50%

      break;
    default:
      break;
  }
}
