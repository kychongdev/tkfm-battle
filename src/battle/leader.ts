import type { GameState } from "./GameState";
import { AffectType, Condition, Target } from "../types/Skill";
import { CharacterAttribute, CharacterClass } from "../types/Character";

export function triggerLeaderSkill(leader: string, gameState: GameState) {
  switch (leader) {
    case "514":
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
      {
        const threeDarkCondition = [
          CharacterAttribute.DARK,
          CharacterAttribute.DARK,
          CharacterAttribute.DARK,
        ];
        gameState.characters.forEach((character) => {
          if (threeDarkCondition.includes(character.attribute)) {
            const index = threeDarkCondition.indexOf(character.attribute);
            if (index !== -1) {
              threeDarkCondition.splice(
                threeDarkCondition.indexOf(character.attribute),
                1,
              );
            }
          }
        });
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
        const twoLightCondition = [
          CharacterAttribute.LIGHT,
          CharacterAttribute.LIGHT,
        ];
        gameState.characters.forEach((character) => {
          if (twoLightCondition.includes(character.attribute)) {
            const index = twoLightCondition.indexOf(character.attribute);
            if (index !== -1) {
              twoLightCondition.splice(
                twoLightCondition.indexOf(character.attribute),
                1,
              );
            }
          }
        });
        if (twoLightCondition.length === 0) {
          gameState.characters.forEach((_, index) => {
            gameState.characters[index].buff = [
              ...gameState.characters[index].buff,
              {
                id: "514-Lead-5",
                name: "造成傷害增加20%",
                type: 0,
                condition: Condition.NONE,
                duration: 100,
                _0: {
                  affectType: AffectType.INCREASE_DMG,
                  value: 0.2,
                },
              },
              {
                id: "514-Lead-6",
                name: "必殺時，觸發「使目標受到暗屬性傷害增加17.5%(最多2層)」",
                type: 4,
                condition: Condition.ULTIMATE,
                duration: 100,
                _4: {
                  increaseStack: 1,
                  targetSkill: "514-Lead-6-1",
                  target: Target.ENEMY,
                  applyBuff: {
                    id: "514-Lead-6-1",
                    name: "受到暗屬性傷害增加17.5%",
                    type: 3,
                    condition: Condition.NONE,
                    duration: 100,
                    _3: {
                      id: "514-Lead-6-1",
                      name: "受到暗屬性傷害增加17.5%",
                      stack: 1,
                      maxStack: 2,
                      affectType: AffectType.INCREASE_DARK_DMG_RECEIVED,
                      value: 0.175,
                    },
                  },
                },
              },
              {
                id: "514-Lead-7",
                name: "必殺時，觸發「使目標受到光屬性傷害增加17.5%(最多2層)」",
                type: 4,
                condition: Condition.ULTIMATE,
                duration: 100,
                _4: {
                  increaseStack: 1,
                  targetSkill: "514-Lead-7-1",
                  target: Target.ENEMY,
                  applyBuff: {
                    id: "514-Lead-7-1",
                    name: "受到光屬性傷害增加17.5%",
                    type: 3,
                    condition: Condition.NONE,
                    duration: 100,
                    _3: {
                      id: "514-Lead-7-1",
                      name: "受到光屬性傷害增加17.5%",
                      stack: 1,
                      maxStack: 2,
                      affectType: AffectType.INCREASE_LIGHT_DMG_RECEIVED,
                      value: 0.175,
                    },
                  },
                },
              },
            ];
          });
        }
      }

      gameState.characters[0].buff = [
        ...gameState.characters[0].buff,
        {
          id: "514-Lead-8",
          name: "攻擊力增加80%",
          type: 0,
          condition: Condition.NONE,
          duration: 100,
          _0: {
            affectType: AffectType.ATK,
            value: 0.8,
          },
        },
        {
          id: "514-Lead-9",
          name: "普攻傷害增加60%",
          type: 0,
          condition: Condition.NONE,
          duration: 100,
          _0: {
            affectType: AffectType.INCREASE_BASIC_DAMAGE,
            value: 0.6,
          },
        },
        {
          id: "514-Lead-10",
          name: "必殺技傷害增加40%",
          type: 0,
          condition: Condition.NONE,
          duration: 100,
          _0: {
            affectType: AffectType.INCREASE_ULTIMATE_DAMAGE,
            value: 0.4,
          },
        },
        {
          id: "514-Lead-11",
          name: "必殺時，觸發「以自身攻擊力150%對目標造成傷害」",
          type: 1,
          condition: Condition.ULTIMATE,
          duration: 100,
          _1: {
            value: 1.5,
            isTrigger: true,
            target: Target.ENEMY,
            damageType: 1,
          },
        },
      ];
      break;
    // 夏日 巴爾
    case "517":
      gameState.characters[0].buff = [
        ...gameState.characters[0].buff,
        {
          id: "517-Lead-1",
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
          id: "517-Lead-2",
          name: "造成傷害增加20%",
          type: 0,
          condition: Condition.NONE,
          duration: 100,
          _0: {
            affectType: AffectType.INCREASE_DMG,
            value: 0.2,
          },
        },
      ];
      gameState.characters.forEach((character, index) => {
        if (
          character.attribute === CharacterAttribute.FIRE ||
          character.attribute === CharacterAttribute.LIGHT
        ) {
          gameState.characters[index].buff = [
            ...gameState.characters[index].buff,
            {
              id: "517-Lead-1",
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
              id: "517-Lead-2",
              name: "造成傷害增加20%",
              type: 0,
              condition: Condition.NONE,
              duration: 100,
              _0: {
                affectType: AffectType.INCREASE_DMG,
                value: 0.2,
              },
            },
          ];
        }
      });

      gameState.characters[0].buff = [
        ...gameState.characters[0].buff,
        {
          id: "517-Lead-3",
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
          id: "517-Lead-4",
          name: "普攻傷害增加20%",
          type: 0,
          condition: Condition.NONE,
          duration: 100,
          _0: {
            affectType: AffectType.INCREASE_BASIC_DAMAGE,
            value: 0.2,
          },
        },
      ];
      gameState.characters.forEach((character, index) => {
        if (
          character.attribute === CharacterAttribute.FIRE ||
          character.attribute === CharacterAttribute.LIGHT
        ) {
          gameState.characters[index].buff = [
            ...gameState.characters[index].buff,
            {
              id: "517-Lead-5",
              name: "攻擊力增加80%",
              type: 0,
              condition: Condition.NONE,
              duration: 100,
              _0: {
                affectType: AffectType.ATK,
                value: 0.8,
              },
            },
            {
              id: "517-Lead-6",
              name: "普攻傷害增加50%",
              type: 0,
              condition: Condition.NONE,
              duration: 100,
              _0: {
                affectType: AffectType.INCREASE_BASIC_DAMAGE,
                value: 0.5,
              },
            },
          ];
        }
      });

      {
        const twoFireCondition = [
          CharacterAttribute.FIRE,
          CharacterAttribute.FIRE,
        ];
        const twoLightCondition = [
          CharacterAttribute.LIGHT,
          CharacterAttribute.LIGHT,
        ];

        gameState.characters.forEach((character) => {
          if (twoFireCondition.includes(character.attribute)) {
            const index = twoFireCondition.indexOf(character.attribute);
            if (index !== -1) {
              twoFireCondition.splice(
                twoFireCondition.indexOf(character.attribute),
                1,
              );
            }
          }
          if (twoLightCondition.includes(character.attribute)) {
            const index = twoLightCondition.indexOf(character.attribute);
            if (index !== -1) {
              twoLightCondition.splice(
                twoLightCondition.indexOf(character.attribute),
                1,
              );
            }
          }
        });

        if (twoFireCondition.length === 0) {
          gameState.characters.forEach((character, index) => {
            if (
              character.class === CharacterClass.ATTACKER ||
              character.class === CharacterClass.OBSTRUCTER
            ) {
              gameState.characters[index].buff = [
                ...gameState.characters[index].buff,
                {
                  id: "517-Lead-7",
                  name: "普攻時，追加「以自身攻擊力40%對目標造成傷害」",
                  type: 1,
                  condition: Condition.BASIC_ATTACK,
                  duration: 100,
                  _1: {
                    value: 0.4,
                    target: Target.ENEMY,
                    damageType: 0,
                    isTrigger: false,
                  },
                },
                {
                  id: "517-Lead-8",
                  name: "普攻時，追加「使目標受到普攻傷害增加18%(最多5層)」",
                  type: 4,
                  condition: Condition.BASIC_ATTACK,
                  duration: 100,
                  _4: {
                    increaseStack: 1,
                    targetSkill: "517-Lead-8-1",
                    target: Target.ENEMY,
                    applyBuff: {
                      id: "517-Lead-8-1",
                      name: "受到普攻傷害增加18%",
                      type: 3,
                      condition: Condition.NONE,
                      duration: 100,
                      _3: {
                        id: "517-Lead-8-1",
                        name: "普攻時，追加「使目標受到普攻傷害增加18%(最多5層)」",
                        stack: 1,
                        maxStack: 5,
                        value: 0.18,
                        affectType: AffectType.INCREASE_BASIC_DAMAGE_RECEIVED,
                      },
                    },
                  },
                },
              ];
            }
          });
        }

        if (twoLightCondition.length === 0) {
          gameState.characters.forEach((character, index) => {
            if (
              character.class === CharacterClass.ATTACKER ||
              character.class === CharacterClass.OBSTRUCTER
            ) {
              gameState.characters[index].buff = [
                ...gameState.characters[index].buff,
                {
                  id: "517-Lead-9",
                  name: "普攻時，追加「以自身攻擊力40%對目標造成傷害」",
                  type: 1,
                  condition: Condition.BASIC_ATTACK,
                  duration: 100,
                  _1: {
                    value: 0.4,
                    target: Target.ENEMY,
                    damageType: 0,
                    isTrigger: false,
                  },
                },
                {
                  id: "517-Lead-10",
                  name: "普攻時，追加「使目標受到普攻傷害增加18%(最多5層)」",
                  type: 4,
                  condition: Condition.BASIC_ATTACK,
                  duration: 100,
                  _4: {
                    increaseStack: 1,
                    targetSkill: "517-Lead-10-1",
                    target: Target.ENEMY,
                    applyBuff: {
                      id: "517-Lead-10-1",
                      name: "普攻時，追加「使目標受到普攻傷害增加18%(最多5層)」",
                      type: 3,
                      condition: Condition.NONE,
                      duration: 100,
                      _3: {
                        id: "517-Lead-10-1",
                        name: "受到普攻傷害增加18%",
                        stack: 1,
                        maxStack: 5,
                        value: 0.18,
                        affectType: AffectType.INCREASE_BASIC_DAMAGE_RECEIVED,
                      },
                    },
                  },
                },
              ];
            }
          });
        }
      }
      break;
    // 夏日 菲歐菈
    case "518":
      {
        gameState.characters.forEach((_, index) => {
          gameState.characters[index].buff = [
            ...gameState.characters[index].buff,
            {
              id: "518-Lead-1",
              name: "最大HP增加20%",
              type: 0,
              condition: Condition.NONE,
              duration: 100,
              _0: {
                affectType: AffectType.MAXHP,
                value: 0.2,
              },
            },
          ];
        });
        const fourLightCondition = [
          CharacterAttribute.LIGHT,
          CharacterAttribute.LIGHT,
          CharacterAttribute.LIGHT,
          CharacterAttribute.LIGHT,
        ];
        gameState.characters.forEach((character) => {
          if (fourLightCondition.includes(character.attribute)) {
            const index = fourLightCondition.indexOf(character.attribute);
            if (index !== -1) {
              fourLightCondition.splice(
                fourLightCondition.indexOf(character.attribute),
                1,
              );
            }
          }
        });
        if (fourLightCondition.length === 0) {
          gameState.characters.forEach((_, index) => {
            gameState.characters[index].buff = [
              ...gameState.characters[index].buff,
              {
                id: "518-Lead-2",
                name: "攻擊力增加100%",
                type: 0,
                condition: Condition.NONE,
                duration: 100,
                _0: {
                  affectType: AffectType.ATK,
                  value: 1,
                },
              },
            ];
          });
          gameState.characters.forEach((character, index) => {
            if (character.attribute === CharacterAttribute.LIGHT) {
              gameState.characters[index].buff = [
                ...gameState.characters[index].buff,
                {
                  id: "518-Lead-3",
                  name: "必殺技傷害增加50%",
                  type: 0,
                  condition: Condition.NONE,
                  duration: 100,
                  _0: {
                    affectType: AffectType.INCREASE_ULTIMATE_DAMAGE,
                    value: 0.5,
                  },
                },
              ];
            }
          });
          gameState.characters[0].buff = [
            ...gameState.characters[0].buff,
            {
              id: "518-Lead-4",
              name: "每經過4回合，觸發「使目標受到傷害增加50%(1回合)」",
              type: 11,
              condition: Condition.EVERY_X_TURN,
              conditionTurn: 4,
              duration: 100,
              _11: {
                target: Target.ENEMY,
                applyBuff: [
                  {
                    id: "518-Lead-4-1",
                    name: "受到傷害增加50%",
                    type: 0,
                    condition: Condition.NONE,
                    duration: 1,
                    _0: {
                      value: 0.5,
                      affectType: AffectType.INCREASE_DMG_RECEIVED,
                    },
                  },
                ],
              },
            },
            {
              id: "518-Lead-5",
              name: "被治療時，觸發「使我方全體造成傷害增加15%(1回合)」",
              type: 11,
              condition: Condition.GET_HEAL,
              duration: 100,
              _11: {
                target: Target.ALL,
                applyBuff: [
                  {
                    id: "518-Lead-5-1",
                    name: "造成傷害增加15%",
                    type: 0,
                    condition: Condition.NONE,
                    duration: 1,
                    _0: {
                      value: 0.15,
                      affectType: AffectType.INCREASE_DMG,
                    },
                  },
                ],
              },
            },
          ];
        }
      }

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
              affectType: AffectType.INCREASE_ULTIMATE_DAMAGE,
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
                name: "受到光屬性傷害增加3%",
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
      break;
    case "528":
      gameState.characters.forEach((_, index) => {
        gameState.characters[index].buff = [
          ...gameState.characters[index].buff,
          {
            id: "528-Lead-1",
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
            id: "528-Lead-2",
            name: "攻擊力增加40%",
            type: 0,
            condition: Condition.NONE,
            duration: 100,
            _0: {
              affectType: AffectType.ATK,
              value: 0.4,
            },
          },
        ];
      });

      {
        const threeLightCondition = [
          CharacterAttribute.LIGHT,
          CharacterAttribute.LIGHT,
          CharacterAttribute.LIGHT,
        ];
        const threeAttackerCondition = [
          CharacterClass.ATTACKER,
          CharacterClass.ATTACKER,
          CharacterClass.ATTACKER,
        ];
        gameState.characters.forEach((character) => {
          if (threeLightCondition.includes(character.attribute)) {
            const index = threeLightCondition.indexOf(character.attribute);
            if (index !== -1) {
              threeLightCondition.splice(
                threeLightCondition.indexOf(character.attribute),
                1,
              );
            }
          }
          if (threeAttackerCondition.includes(character.class)) {
            const index = threeAttackerCondition.indexOf(character.class);
            if (index !== -1) {
              threeAttackerCondition.splice(
                threeAttackerCondition.indexOf(character.class),
                1,
              );
            }
          }
        });

        if (threeLightCondition.length <= 0) {
          gameState.characters[0].buff = [
            ...gameState.characters[0].buff,
            {
              id: "528-Lead-3",
              name: "屬性相剋效果減少55%",
              type: 0,
              condition: Condition.NONE,
              duration: 100,
              _0: {
                affectType: AffectType.REDUCE_ATTRIBUTE_EFFECT,
                value: 0.55,
              },
            },
            {
              id: "528-Lead-4",
              name: "普攻時，觸發「使目標受到光屬性傷害增加7%(最多8層)」",
              type: 4,
              condition: Condition.BASIC_ATTACK,
              duration: 100,
              _4: {
                increaseStack: 1,
                targetSkill: "528-Lead-4-1",
                target: Target.ENEMY,
                applyBuff: {
                  id: "528-Lead-4-1",
                  name: "受到光屬性傷害增加7%",
                  type: 3,
                  condition: Condition.NONE,
                  duration: 100,
                  _3: {
                    id: "514-Lead-6-1",
                    name: "受到光屬性傷害增加7%",
                    stack: 1,
                    maxStack: 8,
                    affectType: AffectType.INCREASE_LIGHT_DMG_RECEIVED,
                    value: 0.07,
                  },
                },
              },
            },
            {
              id: "528-Lead-5",
              name: "《催情的音樂》",
              type: 6,
              condition: Condition.BASIC_ATTACK,
              duration: 100,
              _6: {
                affectType: AffectType.RAWATK,
                duration: 4,
                value: 0.3,
                base: true,
                target: Target.ALL,
              },
            },
          ];
        }
        if (threeAttackerCondition.length <= 0) {
          gameState.characters.forEach((_, index) => {
            gameState.characters[index].buff = [
              ...gameState.characters[index].buff,
              {
                id: "528-Lead-6",
                name: "《武裝的防備》",
                type: 0,
                condition: Condition.NONE,
                duration: 100,
                _0: {
                  affectType: AffectType.DECREASE_DARK_DMG_RECEIVED,
                  value: 0.55,
                },
              },
              {
                id: "528-Lead-7",
                name: "《武裝的防備》",
                type: 0,
                condition: Condition.NONE,
                duration: 100,
                _0: {
                  affectType: AffectType.IMMUNE_CD_CHANGE,
                  value: 0,
                },
              },
              {
                id: "528-Lead-8",
                name: "《武裝的防備》",
                type: 0,
                condition: Condition.NONE,
                duration: 100,
                _0: {
                  affectType: AffectType.INCREASE_DMG,
                  value: 0.2,
                },
              },
              {
                id: "528-Lead-9",
                name: "《武裝的防備》",
                type: 1,
                condition: Condition.BASIC_ATTACK,
                duration: 100,
                _1: {
                  isTrigger: false,
                  value: 0.4,
                  target: Target.ENEMY,
                  damageType: 0,
                },
              },
            ];
          });
        }
      }

      break;

    case "601":
      // 使我方全體HP增加40%
      // 使我方全體攻擊力增加50%
      // 我方隊伍攻擊者角色有3人以上時，發動《加入比賽》
      //
      // 《加入比賽》
      // 自身必殺時，觸發「使敵方全體受到傷害增加20%(4回合)」
      // 自身必殺時，觸發「使我方全體攻擊者造成傷害增加20%(4回合)」
      // 自身必殺時，觸發「使我方全體攻擊者普攻傷害增加110%(4回合)」

      break;
    default:
      break;
  }
}
