import type { GameState } from "./GameState";
import {
  AffectType,
  CharacterAttribute,
  Condition,
  Target,
} from "../types/Skill";
import { CharacterClass } from "../types/Character";

export function triggerLeaderSkill(leader: string, gameState: GameState) {
  switch (leader) {
    case "514":
      // 我方全體獲得「隊伍中至少有3名暗屬性角色時，發動《源初魔法少女》」
      // 我方全體獲得「隊伍中至少有2名光屬性角色時，發動《星月的祝福》」
      // 我方站位1的角色獲得「《力量增幅》」
      //
      //
      // 《星月的祝福》
      // 造成傷害增加20%
      // 必殺時，觸發「使目標受到暗屬性傷害增加17.5%(最多2層)」
      // 必殺時，觸發「使目標受到光屬性傷害增加17.5%(最多2層)」
      //
      // 《力量增幅》

      gameState.characters.forEach((_, index) => {
        gameState.characters[index].buff = [
          ...gameState.characters[index].buff,
          {
            id: "514-Lead-1",
            name: "最大HP增加30%",
            type: 0,
            condition: Condition.NONE,
            duration: 100,
            _0: {
              affectType: AffectType.MAXHP,
              value: 0.3,
            },
          },
        ];
      });

      // 《源初魔法少女》
      // 攻擊力增加40%
      // 行動時，觸發「使目標受到傷害增加2.5%(最多12層)」
      // 行動時，觸發「使目標受到觸發技傷害增加5%(最多12層)」
      {
        const threeDarkCondition = [
          CharacterAttribute.DARK,
          CharacterAttribute.DARK,
          CharacterAttribute.DARK,
        ];
        if (threeDarkCondition.length === 0) {
          gameState.characters.forEach((_, index) => {
            gameState.characters[index].buff = [
              ...gameState.characters[index].buff,
              {
                id: "514-Lead-2",
                name: "攻擊力增加40%",
                type: 0,
                condition: Condition.NONE,
                duration: 100,
                _0: {
                  affectType: AffectType.ATK,
                  value: 0.4,
                },
              },
              {
                id: "514-Lead-3",
                name: "行動時，觸發「使目標受到傷害增加2.5%(最多12層)」",
                type: 4,
                condition: Condition.MOVE,
                duration: 100,
                _4: {
                  increaseStack: 1,
                  targetSkill: "514-Lead-3-1",
                  target: Target.ENEMY,
                  applyBuff: {
                    id: "514-Lead-3-1",
                    name: "受到傷害增加2.5%",
                    type: 3,
                    condition: Condition.NONE,
                    duration: 100,
                    _3: {
                      id: "514-Lead-3-1",
                      name: "受到傷害增加2.5%",
                      stack: 1,
                      maxStack: 12,
                      affectType: AffectType.INCREASE_DMG_RECEIVED,
                      value: 0.025,
                    },
                  },
                },
              },
            ];
          });
        }

        const twoLightCondition = [
          CharacterAttribute.LIGHT,
          CharacterAttribute.LIGHT,
        ];
        if (twoLightCondition.length === 0) {
          gameState.characters.forEach((_, index) => {
            gameState.characters[index].buff = [
              ...gameState.characters[index].buff,
              {
                id: "514-Lead-4",
                name: "行動時，觸發「使目標受到觸發技傷害增加5%(最多12層)」",
                type: 4,
                condition: Condition.MOVE,
                duration: 100,
                _4: {
                  increaseStack: 1,
                  targetSkill: "514-Lead-4-1",
                  target: Target.ENEMY,
                  applyBuff: {
                    id: "514-Lead-4-1",
                    name: "受到觸發技傷害增加5%",
                    type: 3,
                    condition: Condition.NONE,
                    duration: 100,
                    _3: {
                      id: "514-Lead-4-1",
                      name: "受到觸發技傷害增加5%",
                      stack: 1,
                      maxStack: 12,
                      affectType: AffectType.INCREASE_TRIGGER_DAMAGE_RECEIVED,
                      value: 0.05,
                    },
                  },
                },
              },
            ];
          });
        }
      }

      // 攻擊力增加80%
      // 普攻傷害增加60%
      // 必殺技傷害增加40%
      // 必殺時，觸發「以自身攻擊力150%對目標造成傷害」
      gameState.characters[0].buff = [...gameState.characters[0].buff];
      break;
    case "523":
      gameState.characters.forEach((_, index) => {
        gameState.characters[index].buff = [
          ...gameState.characters[index].buff,
          {
            id: "523-Lead-1",
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
            id: "523-Lead-2",
            name: "攻擊力增加70%",
            type: 0,
            condition: Condition.NONE,
            duration: 100,
            _0: {
              affectType: AffectType.ATK,
              value: 0.7,
            },
          },
        ];
      });
      {
        const characterThreeAttackerCondition = [
          CharacterClass.ATTACKER,
          CharacterClass.ATTACKER,
          CharacterClass.ATTACKER,
        ];
        const characterTwoObstructerCondition = [
          CharacterClass.OBSTRUCTER,
          CharacterClass.OBSTRUCTER,
        ];
        gameState.characters.forEach((character) => {
          if (characterThreeAttackerCondition.includes(character.class)) {
            const index = characterThreeAttackerCondition.indexOf(
              character.class,
            );
            if (index !== -1) {
              characterThreeAttackerCondition.splice(
                characterThreeAttackerCondition.indexOf(character.class),
                1,
              );
            }
          }
          if (characterTwoObstructerCondition.includes(character.class)) {
            const index = characterTwoObstructerCondition.indexOf(
              character.class,
            );
            if (index !== -1) {
              characterTwoObstructerCondition.splice(
                characterTwoObstructerCondition.indexOf(character.class),
                1,
              );
            }
          }
        });
        if (characterThreeAttackerCondition.length === 0) {
          gameState.characters.forEach((_, index) => {
            gameState.characters[index].buff = [
              ...gameState.characters[index].buff,
              {
                id: "523-Lead-3",
                name: "造成觸發技效果增加150%",
                type: 0,
                condition: Condition.NONE,
                duration: 100,
                _0: {
                  affectType: AffectType.INCREASE_TRIGGER_DAMAGE,
                  value: 1.5,
                },
              },
              {
                id: "523-Lead-4",
                name: "造成傷害增加30%",
                type: 0,
                condition: Condition.NONE,
                duration: 100,
                _0: {
                  affectType: AffectType.INCREASE_DMG,
                  value: 0.3,
                },
              },
              {
                id: "523-Lead-5",
                name: "必殺時，觸發「使目標受到火、水、風、光、闇屬性傷害增加5%(2回合)」",
                type: 11,
                condition: Condition.ULTIMATE,
                duration: 100,
                _11: {
                  target: Target.ENEMY,
                  applyBuff: [
                    {
                      id: "523-Lead-5-1",
                      name: "受到火屬性傷害增加5%",
                      type: 0,
                      condition: Condition.NONE,
                      duration: 2,
                      _0: {
                        value: 0.05,
                        affectType: AffectType.INCREASE_FIRE_DMG_RECEIVED,
                      },
                    },
                    {
                      id: "523-Lead-5-2",
                      name: "受到水屬性傷害增加5%",
                      type: 0,
                      condition: Condition.NONE,
                      duration: 2,
                      _0: {
                        value: 0.05,
                        affectType: AffectType.INCREASE_WATER_DMG_RECEIVED,
                      },
                    },
                    {
                      id: "523-Lead-5-3",
                      name: "受到風屬性傷害增加5%",
                      type: 0,
                      condition: Condition.NONE,
                      duration: 2,
                      _0: {
                        value: 0.05,
                        affectType: AffectType.INCREASE_WIND_DMG_RECEIVED,
                      },
                    },
                    {
                      id: "523-Lead-5-4",
                      name: "受到光屬性傷害增加5%",
                      type: 0,
                      condition: Condition.NONE,
                      duration: 2,
                      _0: {
                        value: 0.05,
                        affectType: AffectType.INCREASE_LIGHT_DMG_RECEIVED,
                      },
                    },
                    {
                      id: "523-Lead-5-5",
                      name: "受到暗屬性傷害增加5%",
                      type: 0,
                      condition: Condition.NONE,
                      duration: 2,
                      _0: {
                        value: 0.05,
                        affectType: AffectType.INCREASE_DARK_DMG_RECEIVED,
                      },
                    },
                  ],
                },
              },
            ];
          });
          if (characterTwoObstructerCondition.length === 0) {
            gameState.characters.forEach((_, index) => {
              gameState.characters[index].buff = [
                ...gameState.characters[index].buff,
                {
                  id: "523-Lead-3",
                  name: "造成觸發技效果增加150%",
                  type: 0,
                  condition: Condition.NONE,
                  duration: 100,
                  _0: {
                    affectType: AffectType.INCREASE_TRIGGER_DAMAGE,
                    value: 1.5,
                  },
                },
                {
                  id: "523-Lead-4",
                  name: "造成傷害增加30%",
                  type: 0,
                  condition: Condition.NONE,
                  duration: 100,
                  _0: {
                    affectType: AffectType.INCREASE_DMG,
                    value: 0.3,
                  },
                },
                {
                  id: "523-Lead-5",
                  name: "必殺時，觸發「使目標受到火、水、風、光、闇屬性傷害增加5%(2回合)」",
                  type: 11,
                  condition: Condition.ULTIMATE,
                  duration: 100,
                  _11: {
                    target: Target.ENEMY,
                    applyBuff: [
                      {
                        id: "523-Lead-5-1",
                        name: "受到火屬性傷害增加5%",
                        type: 0,
                        condition: Condition.NONE,
                        duration: 2,
                        _0: {
                          value: 0.05,
                          affectType: AffectType.INCREASE_FIRE_DMG_RECEIVED,
                        },
                      },
                      {
                        id: "523-Lead-5-2",
                        name: "受到水屬性傷害增加5%",
                        type: 0,
                        condition: Condition.NONE,
                        duration: 2,
                        _0: {
                          value: 0.05,
                          affectType: AffectType.INCREASE_WATER_DMG_RECEIVED,
                        },
                      },
                      {
                        id: "523-Lead-5-3",
                        name: "受到風屬性傷害增加5%",
                        type: 0,
                        condition: Condition.NONE,
                        duration: 2,
                        _0: {
                          value: 0.05,
                          affectType: AffectType.INCREASE_WIND_DMG_RECEIVED,
                        },
                      },
                      {
                        id: "523-Lead-5-4",
                        name: "受到光屬性傷害增加5%",
                        type: 0,
                        condition: Condition.NONE,
                        duration: 2,
                        _0: {
                          value: 0.05,
                          affectType: AffectType.INCREASE_LIGHT_DMG_RECEIVED,
                        },
                      },
                      {
                        id: "523-Lead-5-5",
                        name: "受到暗屬性傷害增加5%",
                        type: 0,
                        condition: Condition.NONE,
                        duration: 2,
                        _0: {
                          value: 0.05,
                          affectType: AffectType.INCREASE_DARK_DMG_RECEIVED,
                        },
                      },
                    ],
                  },
                },
              ];
            });
          }
        }
      }
      break;
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
        gameState.characters.forEach((character) => {
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
                  affectType: AffectType.INCREASE_LIGHT_DMG_RECEIVED,
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
                  affectType: AffectType.INCREASE_DARK_DMG_RECEIVED,
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
                  affectType: AffectType.INCREASE_FIRE_DMG_RECEIVED,
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
                  affectType: AffectType.INCREASE_WATER_DMG_RECEIVED,
                },
              },
            },
          },
        ];
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
