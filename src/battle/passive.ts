import {
  Attribute,
  CharacterAttribute,
  CharacterClass,
} from "../types/Character";
import type { Buff } from "../types/Skill";
import {
  Condition,
  AffectType,
  Target,
  SkillStackCondition,
  SpecialCondition,
} from "../types/Skill";
import type { GameState } from "./GameState";
import { triggerPassive } from "./calculate";

export function initPassiveSkill(position: number, gameState: GameState) {
  const id = gameState.characters[position].id;

  switch (id) {
    case "163":
      gameState.characters[position].buff = [
        ...gameState.characters[position].buff,
        {
          id: "163-passive-1",
          name: "普攻時，觸發「使自身攻擊力增加10%(最多4層)」",
          type: 4,
          condition: Condition.BASIC_ATTACK,
          duration: 100,
          _4: {
            increaseStack: 1,
            targetSkill: "163-passive-1-1",
            target: Target.SELF,
            applyBuff: {
              id: "163-passive-1-1",
              name: "攻擊力增加",
              type: 3,
              condition: Condition.NONE,
              duration: 100,
              _3: {
                id: "163-passive-1-1",
                name: "攻擊力增加",
                value: 0.1,
                stack: 1,
                maxStack: 4,
                affectType: AffectType.ATK,
              },
            },
          },
        },
        {
          id: "163-passive-2",
          name: "必殺時，觸發「使我方站位5的隊員攻擊力增加40%(2回合)」",
          type: 12,
          condition: Condition.ULTIMATE,
          duration: 100,
          _12: {
            position: 4,
            applyBuff: {
              id: "163-passive-2-1",
              name: "攻擊力增加",
              type: 0,
              condition: Condition.NONE,
              duration: 2,
              _0: {
                value: 0.4,
                affectType: AffectType.ATK,
              },
            },
          },
        },
      ];
      if (gameState.characters[position].stars === 5) {
        gameState.characters[position].buff = [
          ...gameState.characters[position].buff,
          {
            id: "163-passive-3",
            name: "必殺時，觸發「使我方全體造成傷害增加30%(1回合)」",
            type: 11,
            condition: Condition.ULTIMATE,
            duration: 100,
            _11: {
              target: Target.ALL,
              applyBuff: [
                {
                  id: "163-passive-3-1",
                  name: "造成傷害增加",
                  type: 0,
                  condition: Condition.NONE,
                  duration: 1,
                  _0: {
                    value: 0.3,
                    affectType: AffectType.INCREASE_DMG,
                  },
                },
              ],
            },
          },
        ];
      }
      if (gameState.characters[position].passive4) {
        gameState.characters[position].buff = [
          ...gameState.characters[position].buff,
          {
            id: "163-passive-4",
            name: "使自身受到傷害減少5%",
            type: 0,
            condition: Condition.NONE,
            duration: 100,
            _0: {
              value: 0.1,
              affectType: AffectType.DECREASE_DMG_RECEIVED,
            },
          },
        ];
      }
      break;
    // 花嫁 巴爾
    case "172":
      gameState.characters[position].buff = [
        ...gameState.characters[position].buff,
        {
          id: "172-passive-1",
          name: "第1回合時，觸發「使我方站位2的角色造成傷害增加25%」",
          type: 12,
          condition: Condition.ON_TURN_START,
          duration: 100,
          _12: {
            position: 1,
            applyBuff: {
              id: "172-passive-1-1",
              name: "造成傷害增加",
              type: 0,
              condition: Condition.NONE,
              duration: 100,
              _0: {
                value: 0.25,
                affectType: AffectType.INCREASE_DMG,
              },
            },
          },
        },
        {
          id: "172-passive-2",
          name: "第1回合時，觸發「使我方站位4的角色受到傷害減少20%(50回合)」",
          type: 12,
          condition: Condition.ON_TURN_START,
          duration: 100,
          _12: {
            position: 3,
            applyBuff: {
              id: "172-passive-2-1",
              name: "受到傷害減少",
              type: 0,
              condition: Condition.NONE,
              duration: 50,
              _0: {
                value: 0.2,
                affectType: AffectType.DECREASE_DMG_RECEIVED,
              },
            },
          },
        },
        {
          id: "172-passive-3",
          name: "第1回合時，觸發「使自身當前必殺技CD減少4回合」",
          type: 14,
          condition: Condition.ON_TURN_START,
          duration: 100,
          _14: {
            reduceCD: 4,
            target: Target.SELF,
          },
        },

        {
          id: "172-passive-4",
          name: "每經過1回合，觸發「使自身攻擊力增加15%(最多8層)」",
          type: 4,
          condition: Condition.EVERY_X_TURN,
          conditionTurn: 1,
          duration: 100,
          _4: {
            increaseStack: 1,
            targetSkill: "172-passive-4-1",
            target: Target.SELF,
            applyBuff: {
              id: "172-passive-4-1",
              name: "攻擊力增加",
              type: 3,
              condition: Condition.NONE,
              duration: 100,
              _3: {
                id: "172-passive-4-1",
                name: "攻擊力增加",
                value: 0.15,
                stack: 1,
                maxStack: 8,
                affectType: AffectType.ATK,
              },
            },
          },
        },
      ];

      if (gameState.characters[position].stars === 5) {
        gameState.characters[position].buff = [
          ...gameState.characters[position].buff,
          {
            id: "172-passive-5",
            name: "每經過2回合，觸發「使自身《若即若離的吸引力》賦予的攻擊力增加狀態增加1層」效果",
            type: 4,
            condition: Condition.EVERY_X_TURN,
            conditionTurn: 2,
            duration: 100,
            _4: {
              increaseStack: 1,
              targetSkill: "172-passive-4-1",
              target: Target.SELF,
              applyBuff: {
                id: "172-passive-4-1",
                name: "攻擊力增加",
                type: 3,
                condition: Condition.NONE,
                duration: 100,
                _3: {
                  id: "172-passive-4-1",
                  name: "攻擊力增加",
                  value: 0.15,
                  stack: 1,
                  maxStack: 8,
                  affectType: AffectType.ATK,
                },
              },
            },
          },
          {
            id: "172-passive-6",
            name: "每經過1回合，觸發「以自身攻擊力35%使自身攻擊力增加(1回合)」",
            type: 6,
            condition: Condition.EVERY_X_TURN,
            conditionTurn: 1,
            duration: 100,
            _6: {
              value: 0.35,
              target: Target.SELF,
              affectType: AffectType.RAWATK,
              duration: 1,
              base: false,
            },
          },
        ];
      }

      if (gameState.characters[position].passive4) {
        gameState.characters[position].buff = [
          ...gameState.characters[position].buff,
          {
            id: "172-passive-5",
            name: "使自身攻擊力增加10%",
            type: 0,
            condition: Condition.NONE,
            duration: 100,
            _0: {
              value: 0.1,
              affectType: AffectType.ATK,
            },
          },
        ];
      }
      break;
    case "177":
      gameState.characters[position].buff = [
        ...gameState.characters[position].buff,
        {
          id: "177-passive-1",
          name: "普攻時，觸發「使我方全體攻擊力增加(1回合)」",
          type: 6,
          condition: Condition.BASIC_ATTACK,
          duration: 100,
          _6: {
            value: 0.2,
            target: Target.ALL,
            affectType: AffectType.RAWATK,
            duration: 1,
            base: false,
          },
        },
        {
          id: "177-passive-2",
          name: "必殺時，觸發「使我方全體攻擊力增加(1回合)」",
          type: 6,
          condition: Condition.ULTIMATE,
          duration: 100,
          _6: {
            value: 0.25,
            target: Target.ALL,
            affectType: AffectType.RAWATK,
            duration: 1,
            base: false,
          },
        },
      ];

      //TODO:
      // 普攻時 ，觸發「以自身最大HP10%對我方全體施加護盾(1回合)、再以自身攻擊力10%對我方全體施加護盾(1回合)」
      //

      if (gameState.characters[position].stars === 5) {
        gameState.characters[position].buff = [
          ...gameState.characters[position].buff,
          {
            id: "177-passive-4",
            name: "必殺時，觸發「使我方全體攻擊力增加(8回合)」",
            type: 11,
            condition: Condition.ULTIMATE,
            duration: 100,
            _11: {
              target: Target.ALL,
              applyBuff: [
                {
                  id: "177-passive-4-1",
                  name: "攻擊力增加",
                  type: 0,
                  condition: Condition.NONE,
                  duration: 8,
                  _0: {
                    value: 0.25,
                    affectType: AffectType.ATK,
                  },
                },
              ],
            },
          },
        ];
      }

      if (gameState.characters[position].passive4) {
        gameState.characters[position].buff = [
          ...gameState.characters[position].buff,
          {
            id: "177-passive4",
            name: "使自身攻擊力增加10%",
            type: 0,
            condition: Condition.NONE,
            duration: 100,
            _0: {
              value: 0.1,
              affectType: AffectType.INCREASE_HEAL_RATE_OVER_TIME,
            },
          },
        ];
      }
      break;

    case "178":
      gameState.characters[position].buff = [
        ...gameState.characters[position].buff,
        {
          id: "178-passive-1",
          name: "普攻時，觸發「使自身攻擊力增加10%(最多5層)」",
          type: 4,
          condition: Condition.BASIC_ATTACK,
          duration: 100,
          _4: {
            increaseStack: 1,
            targetSkill: "178-passive-1-1",
            target: Target.SELF,
            applyBuff: {
              id: "178-passive-1-1",
              name: "攻擊力增加",
              type: 3,
              condition: Condition.NONE,
              duration: 100,
              _3: {
                id: "178-passive-1-1",
                name: "攻擊力增加",
                value: 0.1,
                stack: 1,
                maxStack: 5,
                affectType: AffectType.ATK,
              },
            },
          },
        },
        {
          id: "178-passive-2",
          name: "攻擊時，觸發「使目標被治療時回復量減少50%(1回合)」",
          type: 11,
          condition: Condition.BASIC_ATTACK,
          duration: 100,
          _11: {
            target: Target.ENEMY,
            applyBuff: [
              {
                id: "178-passive-2-1",
                name: "被治療時回復量減少",
                type: 0,
                condition: Condition.GET_HEAL,
                duration: 1,
                _0: {
                  value: 0.5,
                  affectType: AffectType.DECREASE_HEAL_RECEIVED,
                },
              },
            ],
          },
        },
        {
          id: "178-passive-3",
          name: "普攻時，追加『以自身攻擊力35%對目標造成傷害』",
          type: 101,
          condition: Condition.BASIC_ATTACK,
          duration: 100,
          _101: {
            value: 0.35,
            isTrigger: false,
            target: Target.ENEMY,
            damageType: 0,
          },
        },
      ];
      if (gameState.characters[position].stars === 5) {
        gameState.characters[position].buff = [
          ...gameState.characters[position].buff,
          {
            id: "178-passive-4",
            name: "普攻時，觸發「使目標受到水屬性傷害增加2%(最多5層)」",
            type: 4,
            condition: Condition.BASIC_ATTACK,
            duration: 100,
            _4: {
              increaseStack: 1,
              targetSkill: "178-passive-4-1",
              target: Target.ENEMY,
              applyBuff: {
                id: "178-passive-4-1",
                name: "受到水屬性傷害增加",
                type: 3,
                condition: Condition.NONE,
                duration: 100,
                _3: {
                  id: "178-passive-4-1",
                  name: "受到水屬性傷害增加2%",
                  value: 0.02,
                  stack: 1,
                  maxStack: 5,
                  affectType: AffectType.INCREASE_WATER_DMG_RECEIVED,
                },
              },
            },
          },
          {
            id: "178-passive-5",
            name: "普攻時，觸發「使目標受到普攻傷害增加15%(最多5層)」",
            type: 4,
            condition: Condition.BASIC_ATTACK,
            duration: 100,
            _4: {
              increaseStack: 1,
              targetSkill: "178-passive-5-1",
              target: Target.ENEMY,
              applyBuff: {
                id: "178-passive-5-1",
                name: "受到普攻傷害增加",
                type: 3,
                condition: Condition.NONE,
                duration: 100,
                _3: {
                  id: "178-passive-5-1",
                  name: "受到普攻傷害增加15%",
                  value: 0.15,
                  stack: 1,
                  maxStack: 5,
                  affectType: AffectType.INCREASE_BASIC_DAMAGE_RECEIVED,
                },
              },
            },
          },
        ];
      }
      if (gameState.characters[position].passive4) {
        gameState.characters[position].buff = [
          ...gameState.characters[position].buff,
          {
            id: "178-passive-4",
            name: "使自身造成傷害增加7.5%",
            type: 0,
            condition: Condition.NONE,
            duration: 100,
            _0: {
              value: 0.075,
              affectType: AffectType.INCREASE_DMG,
            },
          },
        ];
      }

      break;
    //新春 凜月
    case "179":
      gameState.characters[position].buff = [
        ...gameState.characters[position].buff,
        {
          id: "179-passive-1",
          name: "普攻時，觸發「使目標受到普攻傷害增加20%(最多4層)」",
          type: 4,
          condition: Condition.BASIC_ATTACK,
          duration: 100,
          _4: {
            increaseStack: 1,
            targetSkill: "179-passive-1-1",
            target: Target.ENEMY,
            applyBuff: {
              id: "179-passive-1-1",
              name: "受到普攻傷害增加",
              type: 3,
              condition: Condition.NONE,
              duration: 100,
              _3: {
                id: "179-passive-1-1",
                name: "受到普攻傷害增加20%",
                value: 0.2,
                stack: 1,
                maxStack: 4,
                affectType: AffectType.INCREASE_BASIC_DAMAGE_RECEIVED,
              },
            },
          },
        },
        {
          id: "179-passive-2",
          name: "第1回合時，觸發「使我方全體普攻傷害增加30%(50回合)」",
          type: 11,
          condition: Condition.ON_TURN_START,
          duration: 100,
          _11: {
            target: Target.ALL,
            applyBuff: [
              {
                id: "179-passive-2-1",
                name: "普攻傷害增加",
                type: 0,
                condition: Condition.NONE,
                duration: 50,
                _0: {
                  value: 0.3,
                  affectType: AffectType.INCREASE_BASIC_DAMAGE,
                },
              },
            ],
          },
        },
      ];

      if (gameState.characters[position].stars === 5) {
        gameState.characters[position].buff = [
          ...gameState.characters[position].buff,
          {
            id: "179-passive-3",
            name: "使自身造成傷害增加10%",
            type: 0,
            condition: Condition.NONE,
            duration: 100,
            _0: {
              value: 0.1,
              affectType: AffectType.INCREASE_DMG,
            },
          },
          {
            id: "179-passive-4",
            name: "攻擊時，觸發「使目標受到傷害增加5%(最多5層)」",
            type: 4,
            condition: Condition.ATTACK,
            duration: 100,
            _4: {
              increaseStack: 1,
              targetSkill: "179-passive-4-1",
              target: Target.ENEMY,
              applyBuff: {
                id: "179-passive-4-1",
                name: "受到傷害增加",
                type: 3,
                condition: Condition.NONE,
                duration: 100,
                _3: {
                  id: "179-passive-4-1",
                  name: "受到傷害增加5%",
                  value: 0.05,
                  stack: 1,
                  maxStack: 5,
                  affectType: AffectType.INCREASE_DMG_RECEIVED,
                },
              },
            },
          },
        ];
      }

      if (gameState.characters[position].passive4) {
        gameState.characters[position].buff = [
          ...gameState.characters[position].buff,
          {
            id: "179-passive-4",
            name: "使自身攻擊力增加10%",
            type: 0,
            condition: Condition.NONE,
            duration: 100,
            _0: {
              value: 0.1,
              affectType: AffectType.ATK,
            },
          },
        ];
      }

      break;
    case "198":
      gameState.characters[position].buff = [
        ...gameState.characters[position].buff,
        {
          id: "198-passive-1",
          name: "每經過1回合，觸發「使敵方全體受到傷害增加5%(最多11層)」",
          type: 4,
          condition: Condition.EVERY_X_TURN,
          conditionTurn: 1,
          duration: 100,
          _4: {
            target: Target.ENEMY,
            increaseStack: 1,
            targetSkill: "198-passive-1-1",
            applyBuff: {
              id: "198-passive-1-1",
              name: "受到傷害增加",
              type: 3,
              condition: Condition.NONE,
              duration: 100,
              _3: {
                id: "198-passive-1-1",
                name: "受到傷害增加5%",
                stack: 1,
                maxStack: 11,
                value: 0.05,
                affectType: AffectType.INCREASE_DMG_RECEIVED,
              },
            },
          },
        },
      ];

      gameState.characters[position].buff = [
        ...gameState.characters[position].buff,
        {
          id: "198-passive-2",
          name: "自身受到護盾效果增加25%",
          type: 0,
          condition: Condition.NONE,
          duration: 100,
          _0: {
            value: 0.25,
            affectType: AffectType.INCREASE_SHIELD_RATE_RECEIVED,
          },
        },
        {
          id: "198-passive-3",
          name: "自身被治療時回復量增加25%",
          type: 0,
          condition: Condition.NONE,
          duration: 100,
          _0: {
            value: 0.25,
            affectType: AffectType.INCREASE_HEAL_RATE,
          },
        },
        {
          id: "198-passive-4",
          name: "自身受到持續型治療效果增加25%",
          type: 0,
          condition: Condition.NONE,
          duration: 100,
          _0: {
            value: 0.25,
            affectType: AffectType.INCREASE_HEAL_RATE_OVER_TIME,
          },
        },
      ];

      if (gameState.characters[position].stars === 5) {
        gameState.characters[position].buff = [
          ...gameState.characters[position].buff,
          {
            id: "198-passive-5",
            name: "自身造成傷害增加35%",
            type: 0,
            condition: Condition.NONE,
            duration: 100,
            _0: {
              value: 0.35,
              affectType: AffectType.INCREASE_DMG,
            },
          },
          {
            id: "198-passive-6",
            name: "必殺時，觸發「使目標受到《鬼抓人大賽開始喏∼》 賦予的受到傷害增加狀態增加4層」",
            type: 4,
            condition: Condition.ULTIMATE,
            duration: 100,
            _4: {
              target: Target.ENEMY,
              increaseStack: 4,
              targetSkill: "198-passive-1-1",
              applyBuff: {
                id: "198-passive-1-1",
                name: "受到傷害增加",
                type: 3,
                condition: Condition.NONE,
                duration: 100,
                _3: {
                  id: "198-passive-1-1",
                  name: "受到傷害增加5%",
                  stack: 1,
                  maxStack: 11,
                  value: 0.05,
                  affectType: AffectType.INCREASE_DMG_RECEIVED,
                },
              },
            },
          },
        ];
      }

      if (gameState.characters[position].passive4) {
        gameState.characters[position].buff = [
          ...gameState.characters[position].buff,
          {
            id: "198-passive4",
            name: "使自身攻擊力增加10%",
            type: 0,
            condition: Condition.NONE,
            duration: 100,
            _0: {
              value: 0.1,
              affectType: AffectType.ATK,
            },
          },
        ];
      }

      break;

    case "196":
      gameState.characters[position].buff = [
        ...gameState.characters[position].buff,
        {
          id: "196-passive-1",
          name: "普攻時，觸發「使我方全體普攻傷害增加30%(1回合)」",
          type: 11,
          condition: Condition.BASIC_ATTACK,
          duration: 100,
          _11: {
            target: Target.ALL,
            applyBuff: [
              {
                id: "196-passive-1-1",
                name: "普攻傷害增加",
                type: 0,
                condition: Condition.NONE,
                duration: 1,
                _0: {
                  value: 0.3,
                  affectType: AffectType.INCREASE_BASIC_DAMAGE,
                },
              },
            ],
          },
        },
        {
          id: "196-passive-2",
          name: "必殺時，觸發「使我方全體必殺技傷害增加10%(2回合)」",
          type: 11,
          condition: Condition.ULTIMATE,
          duration: 100,
          _11: {
            target: Target.ALL,
            applyBuff: [
              {
                id: "196-passive-2-1",
                name: "必殺技傷害增加",
                type: 0,
                condition: Condition.NONE,
                duration: 2,
                _0: {
                  value: 0.1,
                  affectType: AffectType.INCREASE_ULTIMATE_DAMAGE,
                },
              },
            ],
          },
        },
        {
          id: "196-passive-3",
          name: "每經過4回合，觸發「使敵方全體受到傷害增加30%(1回合)」",
          type: 11,
          condition: Condition.EVERY_X_TURN,
          conditionTurn: 4,
          duration: 100,
          _11: {
            target: Target.ENEMY,
            applyBuff: [
              {
                id: "196-passive-3-1",
                name: "受到傷害增加",
                type: 0,
                condition: Condition.NONE,
                duration: 1,
                _0: {
                  value: 0.3,
                  affectType: AffectType.INCREASE_DMG_RECEIVED,
                },
              },
            ],
          },
        },
      ];

      if (gameState.characters[position].stars === 5) {
        gameState.characters.forEach((character, index) => {
          if (
            character.class === CharacterClass.ATTACKER ||
            character.class === CharacterClass.OBSTRUCTER ||
            character.class === CharacterClass.PROTECTOR
          ) {
            gameState.characters[index].buff = [
              ...gameState.characters[index].buff,
              {
                id: "196-passive-4",
                // 行動時，觸發「使我方全體攻擊力增加15%(50回合)」
                name: "行動時，觸發「使我方全體攻擊力增加15%(50回合)」",
                type: 11,
                condition: Condition.MOVE,
                duration: 1,
                _11: {
                  target: Target.ALL,
                  applyBuff: [
                    {
                      id: "196-passive-4-1",
                      name: "攻擊力增加",
                      type: 0,
                      condition: Condition.NONE,
                      duration: 50,
                      _0: {
                        value: 0.15,
                        affectType: AffectType.ATK,
                      },
                    },
                  ],
                },
              },
            ];
          }
        });
      }
      if (gameState.characters[position].passive4) {
        gameState.characters[position].buff = [
          ...gameState.characters[position].buff,
          {
            id: "196-passive-5",
            name: "使自身攻擊力增加10%",
            type: 0,
            condition: Condition.NONE,
            duration: 100,
            _0: {
              value: 0.1,
              affectType: AffectType.ATK,
            },
          },
        ];
      }
      break;
    // 魔法少女 朱諾安
    case "514":
      gameState.characters[position].buff = [
        ...gameState.characters[position].buff,
        {
          id: "514-passive-1",
          name: "攻擊力增加40%",
          type: 0,
          condition: Condition.NONE,
          duration: 100,
          _0: {
            value: 0.4,
            affectType: AffectType.ATK,
          },
        },
        {
          id: "514-passive-2",
          name: "必殺技傷害增加20%",
          type: 0,
          condition: Condition.NONE,
          duration: 100,
          _0: {
            value: 0.2,
            affectType: AffectType.INCREASE_ULTIMATE_DAMAGE,
          },
        },
      ];
      {
        const buff: Buff = {
          id: "514-passive-3",
          name: "我方站位5的角色獲得《重見光明》",
          type: 12,
          condition: Condition.NONE,
          duration: 100,
          _12: {
            position: 4,
            applyBuff: {
              id: "514-passive-3-1",
              name: "必殺技傷害增加40%",
              type: 0,
              condition: Condition.NONE,
              duration: 100,
              _0: {
                value: 0.4,
                affectType: AffectType.INCREASE_ULTIMATE_DAMAGE,
              },
            },
          },
        };
        triggerPassive(buff, gameState, position);
      }
      {
        const buff: Buff = {
          id: "514-passive-4",
          name: "我方站位5的角色獲得《重見光明》",
          type: 12,
          condition: Condition.NONE,
          duration: 100,
          _12: {
            position: 4,
            applyBuff: {
              id: "514-passive-3-1",
              name: "造成傷害增加40%",
              type: 0,
              condition: Condition.NONE,
              duration: 100,
              _0: {
                value: 0.4,
                affectType: AffectType.INCREASE_DMG,
              },
            },
          },
        };
        triggerPassive(buff, gameState, position);
      }

      if (gameState.characters[position].stars === 5) {
        gameState.characters[position].buff = [
          ...gameState.characters[position].buff,
          {
            id: "514-passive-5",
            name: "觸發技傷害增加100%",
            type: 0,
            condition: Condition.NONE,
            duration: 100,
            _0: {
              value: 1,
              affectType: AffectType.INCREASE_TRIGGER_DAMAGE,
            },
          },
          {
            id: "514-passive-6",
            name: "必殺時，觸發「以自身攻擊力180%對目標造成傷害」",
            type: 1,
            condition: Condition.ULTIMATE,
            duration: 100,
            _1: {
              value: 1.8,
              isTrigger: true,
              target: Target.ENEMY,
              damageType: 1,
            },
          },
        ];
      }
      if (gameState.characters[position].passive4) {
        gameState.characters[position].buff = [
          ...gameState.characters[position].buff,
          {
            id: "514-passive-7",
            name: "使自身攻擊力增加10%",
            type: 0,
            condition: Condition.NONE,
            duration: 100,
            _0: {
              value: 0.1,
              affectType: AffectType.ATK,
            },
          },
        ];
      }
      break;
    case "517":
      gameState.characters.forEach((character, index) => {
        if (character.attribute === Attribute.WATER) {
          gameState.characters[index].buff = [
            ...gameState.characters[index].buff,
            {
              id: "517-passive-1",
              name: "攻擊力增加30%",
              type: 0,
              condition: Condition.NONE,
              duration: 100,
              _0: {
                value: 0.3,
                affectType: AffectType.ATK,
              },
            },
            {
              id: "517-passive-2",
              name: "普攻傷害增加20%",
              type: 0,
              condition: Condition.NONE,
              duration: 100,
              _0: {
                value: 0.2,
                affectType: AffectType.INCREASE_BASIC_DAMAGE,
              },
            },
          ];
        }
      });

      {
        const fiveWaterCondtion = [
          CharacterAttribute.WATER,
          CharacterAttribute.WATER,
          CharacterAttribute.WATER,
          CharacterAttribute.WATER,
          CharacterAttribute.WATER,
        ];

        const fourWaterCondition = [
          CharacterAttribute.WATER,
          CharacterAttribute.WATER,
          CharacterAttribute.WATER,
          CharacterAttribute.WATER,
        ];

        gameState.characters.forEach((character, index) => {
          if (fiveWaterCondtion.includes(character.attribute)) {
            const index = fiveWaterCondtion.indexOf(character.attribute);
            if (index !== -1) {
              fiveWaterCondtion.splice(index, 1);
            }
            const index2 = fourWaterCondition.indexOf(character.attribute);
            if (index2 !== -1) {
              fourWaterCondition.splice(index2, 1);
            }
          }
        });

        if (fourWaterCondition.length === 0) {
          gameState.characters.forEach((character, index) => {
            // 使我方全體攻擊者和妨礙者獲得
            if (
              character.class === CharacterClass.ATTACKER ||
              character.class === CharacterClass.OBSTRUCTER
            ) {
              gameState.characters[index].buff = [
                ...gameState.characters[index].buff,
                {
                  id: "517-passive-3",
                  name: "普攻時，追加『以自身攻擊力15%對目標造成傷害』",
                  type: 1,
                  condition: Condition.BASIC_ATTACK,
                  duration: 100,
                  _1: {
                    value: 0.15,
                    isTrigger: false,
                    target: Target.ENEMY,
                    damageType: 1,
                  },
                },
              ];
            }
          });
        }
        if (fiveWaterCondtion.length === 0) {
          gameState.characters.forEach((character, index) => {
            // 使我方全體攻擊者和妨礙者獲得
            if (
              character.class === CharacterClass.ATTACKER ||
              character.class === CharacterClass.OBSTRUCTER
            ) {
              gameState.characters[index].buff = [
                ...gameState.characters[index].buff,
                {
                  id: "517-passive-4",
                  name: "普攻時，追加『以自身攻擊力15%對目標造成傷害』",
                  type: 1,
                  condition: Condition.BASIC_ATTACK,
                  duration: 100,
                  _1: {
                    value: 0.15,
                    isTrigger: false,
                    target: Target.ENEMY,
                    damageType: 1,
                  },
                },
              ];
            }
          });
        }
        if (fourWaterCondition.length === 0) {
          gameState.characters.forEach((character, index) => {
            if (
              character.class === CharacterClass.ATTACKER ||
              character.class === CharacterClass.OBSTRUCTER
            ) {
              gameState.characters[index].buff = [
                ...gameState.characters[index].buff,
                {
                  id: "517-passive-5",
                  name: "普攻時，追加『使目標受到普攻傷害增加9%(最多5層)』",
                  type: 4,
                  condition: Condition.BASIC_ATTACK,
                  duration: 100,
                  _4: {
                    increaseStack: 1,
                    targetSkill: "517-passive-5-1",
                    target: Target.ENEMY,
                    applyBuff: {
                      id: "517-passive-5-1",
                      name: "受到普攻傷害增加",
                      type: 3,
                      condition: Condition.NONE,
                      duration: 100,
                      _3: {
                        id: "517-passive-5-1",
                        name: "受到普攻傷害增加9%",
                        value: 0.09,
                        stack: 1,
                        maxStack: 5,
                        affectType: AffectType.INCREASE_BASIC_DAMAGE_RECEIVED,
                      },
                    },
                  },
                },
              ];
            }
          });
        }

        if (fiveWaterCondtion.length === 0) {
          gameState.characters.forEach((character, index) => {
            if (
              character.class === CharacterClass.ATTACKER ||
              character.class === CharacterClass.OBSTRUCTER
            ) {
              gameState.characters[index].buff = [
                ...gameState.characters[index].buff,
                {
                  id: "517-passive-6",
                  name: "普攻時，追加『使目標受到普攻傷害增加9%(最多5層)』",
                  type: 4,
                  condition: Condition.BASIC_ATTACK,
                  duration: 100,
                  _4: {
                    increaseStack: 1,
                    targetSkill: "517-passive-6-1",
                    target: Target.ENEMY,
                    applyBuff: {
                      id: "517-passive-6-1",
                      name: "受到普攻傷害增加",
                      type: 3,
                      condition: Condition.NONE,
                      duration: 100,
                      _3: {
                        id: "517-passive-6-1",
                        name: "受到普攻傷害增加9%",
                        value: 0.09,
                        stack: 1,
                        maxStack: 5,
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

      if (gameState.characters[position].stars === 5) {
        const twoAttackerCondition = [
          CharacterClass.ATTACKER,
          CharacterClass.ATTACKER,
        ];

        gameState.characters.forEach((character) => {
          if (twoAttackerCondition.includes(character.class)) {
            const index = twoAttackerCondition.indexOf(character.class);
            if (index !== -1) {
              twoAttackerCondition.splice(index, 1);
            }
          }
        });

        if (twoAttackerCondition.length === 0) {
          gameState.characters.forEach((_, index) => {
            gameState.characters[index].buff = [
              ...gameState.characters[index].buff,
              {
                id: "517-passive-7",
                name: "造成傷害增加30%",
                type: 0,
                condition: Condition.NONE,
                duration: 100,
                _0: {
                  value: 0.3,
                  affectType: AffectType.INCREASE_DMG,
                },
              },
              {
                id: "517-passive-8",
                name: "普攻傷害增加30%",
                type: 0,
                condition: Condition.NONE,
                duration: 100,
                _0: {
                  value: 0.3,
                  affectType: AffectType.INCREASE_BASIC_DAMAGE,
                },
              },
            ];
          });
        }
      }

      if (gameState.characters[position].passive4) {
        gameState.characters[position].buff = [
          ...gameState.characters[position].buff,
          // 使自身普攻傷害增加10%
          {
            id: "517-passive4",
            name: "使自身普攻傷害增加10%",
            type: 0,
            condition: Condition.NONE,
            duration: 100,
            _0: {
              value: 0.1,
              affectType: AffectType.INCREASE_BASIC_DAMAGE,
            },
          },
        ];
      }

      break;

    //夏日 菲歐菈
    case "518":
      gameState.characters[position].buff = [
        ...gameState.characters[position].buff,
        {
          id: "518-passive-1",
          name: "必殺時，觸發「使我方全體攻擊力增加40%(最多1層)」",
          type: 4,
          condition: Condition.ULTIMATE,
          duration: 100,
          _4: {
            increaseStack: 1,
            targetSkill: "518-passive-1-1",
            target: Target.ALL,
            applyBuff: {
              id: "518-passive-1-1",
              name: "攻擊力增加",
              type: 3,
              condition: Condition.NONE,
              duration: 100,
              _3: {
                id: "518-passive-1-1",
                name: "攻擊力增加40%",
                value: 0.4,
                stack: 1,
                maxStack: 1,
                affectType: AffectType.ATK,
              },
            },
          },
        },
        {
          id: "518-passive-2",
          name: "被治療時，觸發「使我方全體攻擊力增加10%(1回合)」",
          type: 11,
          condition: Condition.GET_HEAL,
          duration: 100,
          _11: {
            target: Target.ALL,
            applyBuff: [
              {
                id: "518-passive-2-1",
                name: "攻擊力增加",
                type: 0,
                condition: Condition.NONE,
                duration: 1,
                _0: {
                  value: 0.1,
                  affectType: AffectType.ATK,
                },
              },
            ],
          },
        },
        {
          id: "518-passive-3",
          name: "必殺時，觸發「使我方全體必殺技傷害增加30%(最多1層)」",
          type: 4,
          condition: Condition.ULTIMATE,
          duration: 100,
          _4: {
            increaseStack: 1,
            targetSkill: "518-passive-3-1",
            target: Target.ALL,
            applyBuff: {
              id: "518-passive-3-1",
              name: "必殺技傷害增加",
              type: 3,
              condition: Condition.NONE,
              duration: 100,
              _3: {
                id: "518-passive-3-1",
                name: "必殺技傷害增加30%",
                value: 0.3,
                stack: 1,
                maxStack: 1,
                affectType: AffectType.INCREASE_ULTIMATE_DAMAGE,
              },
            },
          },
        },
        {
          id: "518-passive-4",
          name: "被治療時，觸發「使我方全體必殺技傷害增加10%(1回合)」",
          type: 11,
          condition: Condition.GET_HEAL,
          duration: 100,
          _11: {
            target: Target.ALL,
            applyBuff: [
              {
                id: "518-passive-4-1",
                name: "必殺技傷害增加",
                type: 0,
                condition: Condition.NONE,
                duration: 1,
                _0: {
                  value: 0.1,
                  affectType: AffectType.INCREASE_ULTIMATE_DAMAGE,
                },
              },
            ],
          },
        },
      ];

      if (gameState.characters[position].stars === 5) {
        gameState.characters[position].buff = [
          ...gameState.characters[position].buff,
          {
            id: "518-passive-5",
            name: "必殺時，觸發「使我方增造成傷害加20%(最多1層)」",
            type: 4,
            condition: Condition.ULTIMATE,
            duration: 100,
            _4: {
              increaseStack: 1,
              targetSkill: "518-passive-5-1",
              target: Target.ALL,
              applyBuff: {
                id: "518-passive-5-1",
                name: "造成傷害增加",
                type: 3,
                condition: Condition.NONE,
                duration: 100,
                _3: {
                  id: "518-passive-3-1",
                  name: "造成傷害增加20%",
                  value: 0.2,
                  stack: 1,
                  maxStack: 1,
                  affectType: AffectType.INCREASE_DMG,
                },
              },
            },
          },
          {
            id: "518-passive-6",
            name: "被治療時，觸發「使我方全體造成傷害增加5%(1回合)」",
            type: 11,
            condition: Condition.GET_HEAL,
            duration: 100,
            _11: {
              target: Target.ALL,
              applyBuff: [
                {
                  id: "518-passive-6-1",
                  name: "造成傷害增加",
                  type: 0,
                  condition: Condition.NONE,
                  duration: 1,
                  _0: {
                    value: 0.05,
                    affectType: AffectType.INCREASE_DMG,
                  },
                },
              ],
            },
          },
        ];
      }
      if (gameState.characters[position].passive4) {
        gameState.characters[position].buff = [
          ...gameState.characters[position].buff,
          {
            id: "518-passive4-1",
            name: "使自身普攻傷害增加10%",
            type: 0,
            condition: Condition.NONE,
            duration: 100,
            _0: {
              value: 0.1,
              affectType: AffectType.INCREASE_BASIC_DAMAGE,
            },
          },
        ];
      }

      break;
    // 杏仁咪嚕
    case "523":
      gameState.characters[position].buff = [
        ...gameState.characters[position].buff,
        {
          id: "523-passive-1",
          name: "必殺時，觸發「使自身攻擊力增加40%(最多2層)」",
          type: 4,
          condition: Condition.ULTIMATE,
          duration: 100,
          _4: {
            increaseStack: 1,
            targetSkill: "523-1",
            target: Target.SELF,
            applyBuff: {
              id: "523-1",
              name: "攻擊力增加",
              type: 3,
              condition: Condition.NONE,
              duration: 100,
              _3: {
                id: "523-1",
                name: "攻擊力增加40%",
                value: 0.4,
                stack: 1,
                maxStack: 2,
                affectType: AffectType.ATK,
              },
            },
          },
        },
        {
          id: "523-passive-2",
          name: "必殺時 ，觸發「使目標受到必殺技傷害增加20%(4回合)」",
          type: 11,
          condition: Condition.ULTIMATE,
          duration: 100,
          _11: {
            target: Target.ENEMY,
            applyBuff: [
              {
                id: "523-passive-2-1",
                name: "受到必殺技傷害增加",
                type: 0,
                condition: Condition.NONE,
                duration: 4,
                _0: {
                  value: 0.2,
                  affectType: AffectType.INCREASE_ULTIMATE_DAMAGE_RECEIVED,
                },
              },
            ],
          },
        },
      ];

      if (gameState.characters[position].stars === 5) {
        gameState.characters[position].buff = [
          ...gameState.characters[position].buff,
          {
            id: "523-passive-3",
            name: "必殺時 ，觸發「使目標受到傷害增加20%(4回合)」",
            type: 11,
            condition: Condition.ULTIMATE,
            duration: 100,
            _11: {
              target: Target.ENEMY,
              applyBuff: [
                {
                  id: "523-passive-3-1",
                  name: "受到傷害增加",
                  type: 0,
                  condition: Condition.NONE,
                  duration: 4,
                  _0: {
                    value: 0.2,
                    affectType: AffectType.INCREASE_DMG_RECEIVED,
                  },
                },
              ],
            },
          },
        ];
      }
      if (gameState.characters[position].passive4) {
        gameState.characters[position].buff = [
          ...gameState.characters[position].buff,
          {
            id: "523-passive-4",
            name: "使自身必殺技傷害增加10%",
            type: 0,
            condition: Condition.NONE,
            duration: 100,
            _0: {
              value: 0.1,
              affectType: AffectType.INCREASE_ULTIMATE_DAMAGE,
            },
          },
        ];
      }

      break;
    case "508":
      {
        const lowestHP = gameState.characters.reduce((prev, current) =>
          prev && prev.maxHp < current.maxHp ? prev : current,
        );
        const lowestHpIndex = gameState.characters.findIndex(
          (character) => character.id === lowestHP.id,
        );
        gameState.characters[lowestHpIndex].buff = [
          ...gameState.characters[lowestHpIndex].buff,
          {
            id: "508-passive-1",
            name: "受到傷害減少15%",
            type: 0,
            condition: Condition.NONE,
            duration: 100,
            _0: {
              value: 0.15,
              affectType: AffectType.DECREASE_DMG_RECEIVED,
            },
          },
        ];

        gameState.characters.forEach((_, index) => {
          gameState.characters[index].buff = [
            ...gameState.characters[index].buff,
            {
              id: "508-passive-2",
              name: "受到必殺技傷害減少10%",
              type: 0,
              condition: Condition.NONE,
              duration: 100,
              _0: {
                value: 0.1,
                affectType: AffectType.DECREASE_ULTIMATE_DAMAGE_RECEIVED,
              },
            },
          ];
        });
        gameState.characters[position].buff = [
          ...gameState.characters[position].buff,
          {
            id: "508-passive-3",
            name: "必殺時，觸發「使我方全體被治療時回復量增加20%(最多2層)」",
            type: 4,
            condition: Condition.ULTIMATE,
            duration: 100,
            _4: {
              increaseStack: 1,
              targetSkill: "508-passive-3-1",
              target: Target.ALL,
              applyBuff: {
                id: "508-passive-3-1",
                name: "被治療時回復量增加",
                type: 3,
                condition: Condition.NONE,
                duration: 100,
                _3: {
                  id: "508-passive-3-1",
                  name: "被治療時回復量增加20%",
                  value: 0.2,
                  stack: 1,
                  maxStack: 2,
                  affectType: AffectType.INCREASE_HEAL_RATE,
                },
              },
            },
          },
        ];
        if (gameState.characters[position].stars === 5) {
          gameState.characters.forEach((character, index) => {
            if (
              character.class === CharacterClass.HEALER ||
              character.class === CharacterClass.SUPPORT
            ) {
              gameState.characters[index].buff = [
                ...gameState.characters[index].buff,
                {
                  id: "508-passive-4",
                  name: "攻擊力增加40%",
                  type: 0,
                  condition: Condition.NONE,
                  duration: 100,
                  _0: {
                    value: 0.4,
                    affectType: AffectType.ATK,
                  },
                },
                {
                  id: "508-passive-5",
                  name: "防禦時，觸發「我方全體受到持續型治療增加20%(1回合)」",
                  type: 11,
                  condition: Condition.GUARD,
                  duration: 100,
                  _11: {
                    target: Target.ALL,
                    applyBuff: [
                      {
                        id: "508-passive-5-1",
                        name: "受到持續型治療增加",
                        type: 0,
                        condition: Condition.NONE,
                        duration: 1,
                        _0: {
                          value: 0.2,
                          affectType: AffectType.INCREASE_HEAL_RATE,
                        },
                      },
                    ],
                  },
                },
              ];
            }
          });
        }

        if (gameState.characters[position].passive4) {
          gameState.characters[position].buff = [
            ...gameState.characters[position].buff,
            {
              id: "508-passive4",
              name: "使自身攻擊力增加10%",
              type: 0,
              condition: Condition.NONE,
              duration: 100,
              _0: {
                value: 0.1,
                affectType: AffectType.ATK,
              },
            },
          ];
        }
      }
      break;
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
              base: false,
              duration: 1,
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
              base: false,
              value: 0.25,
              duration: 1,
              target: Target.OBSTRUCTER,
              affectType: AffectType.RAWATK,
            },
          },
        },
        {
          id: "525-4",
          name: "使自身攻擊力增加10%",
          type: 0,
          condition: Condition.NONE,
          duration: 100,
          _0: {
            value: 0.1,
            affectType: AffectType.ATK,
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
          id: "526-3",
          name: "每經過1回合時，觸發「給予自身『連環陷阱(最多9層)』」",
          type: 4,
          condition: Condition.EVERY_X_TURN,
          conditionTurn: 1,
          duration: 100,
          _4: {
            increaseStack: 1,
            targetSkill: "526-2-1",
            target: Target.SELF,
            applyBuff: {
              id: "526-2-1",
              name: "『連環陷阱』",
              type: 3,
              condition: Condition.NONE,
              duration: 100,
              _3: {
                id: "526-2-1",
                name: "連環陷阱",
                stack: 1,
                maxStack: 9,
                value: 0,
                affectType: AffectType.NONE,
              },
            },
          },
        },
        {
          id: "526-3",
          name: "必殺時，觸發「以自身攻擊力30%使我方全體攻擊力增加(1回合)」",
          type: 6,
          condition: Condition.ULTIMATE,
          duration: 100,
          _6: {
            base: false,
            duration: 1,
            value: 0.3,
            target: Target.ALL,
            affectType: AffectType.RAWATK,
          },
        },
        {
          id: "526-4",
          name: "當自身「連環陷阱」層數>3層時，開啟「受到護盾效果增加20%」",
          type: 7,
          condition: Condition.EVERY_X_TURN,
          conditionTurn: 1,
          duration: 100,
          _7: {
            stackCondition: SkillStackCondition.HIGHER,
            stack: 3,
            targetSkill: "526-2-1",
            target: Target.SELF,
            activated: false,
            applyTarget: Target.SELF,
            activateBuff: {
              id: "526-4-1",
              name: "受到護盾效果增加20%",
              type: 0,
              condition: Condition.NONE,
              duration: 100,
              _0: {
                value: 0.2,
                affectType: AffectType.INCREASE_SHIELD_RATE_RECEIVED,
              },
            },
          },
        },
        {
          id: "526-5",
          name: "當自身「連環陷阱」層數>6層時，開啟「攻擊力增加20%」",
          type: 7,
          condition: Condition.EVERY_X_TURN,
          conditionTurn: 1,
          duration: 100,
          _7: {
            stackCondition: SkillStackCondition.HIGHER,
            stack: 6,
            targetSkill: "526-2-1",
            target: Target.SELF,
            activated: false,
            applyTarget: Target.SELF,
            activateBuff: {
              id: "526-5-1",
              name: "攻擊力增加20%",
              type: 0,
              condition: Condition.NONE,
              duration: 100,
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
          condition: Condition.EVERY_X_TURN,
          conditionTurn: 1,
          duration: 100,
          _7: {
            stackCondition: SkillStackCondition.EQUAL,
            stack: 9,
            targetSkill: "526-2-1",
            target: Target.SELF,
            activated: false,
            applyTarget: Target.SELF,
            activateBuff: {
              id: "526-6-1",
              name: "攻擊力增加20%",
              type: 0,
              condition: Condition.NONE,
              duration: 100,
              _0: {
                value: 0.2,
                affectType: AffectType.ATK,
              },
            },
          },
        },
        {
          id: "526-7",
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
              id: "526-7-1",
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
          id: "526-8",
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
              id: "526-7-1",
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
        // 使自身受到傷害減少5%
        {
          id: "526-9",
          name: "使自身受到傷害減少5%",
          type: 0,
          condition: Condition.NONE,
          duration: 100,
          _0: {
            value: 0.05,
            affectType: AffectType.DECREASE_DMG_RECEIVED,
          },
        },
      ];
      break;

    // 使自身攻擊力增加10%
    case "527":
      break;
    case "528":
      gameState.characters.forEach((character, index) => {
        if (character.class === CharacterClass.ATTACKER) {
          gameState.characters[index].buff = [
            ...gameState.characters[index].buff,
            {
              id: "528-passive-1",
              name: "使我方全體攻擊者普攻增加30%",
              type: 0,
              condition: Condition.NONE,
              duration: 100,
              _0: {
                value: 0.3,
                affectType: AffectType.INCREASE_BASIC_DAMAGE,
              },
            },
          ];
        }
      });
      gameState.characters[position].buff = [
        ...gameState.characters[position].buff,
        {
          id: "528-passive-2",
          name: "自身普攻傷害增加60%",
          type: 0,
          condition: Condition.NONE,
          duration: 100,
          _0: {
            value: 0.6,
            affectType: AffectType.INCREASE_BASIC_DAMAGE,
          },
        },
      ];

      gameState.characters.forEach((character, index) => {
        if (character.class === CharacterClass.ATTACKER) {
          gameState.characters[index].buff = [
            ...gameState.characters[index].buff,
            {
              id: "528-passive-3",
              name: "使我方全體攻擊者攻擊力增加30%",
              type: 0,
              condition: Condition.NONE,
              duration: 100,
              _0: {
                value: 0.3,
                affectType: AffectType.ATK,
              },
            },
          ];
        }
      });

      gameState.characters[position].buff = [
        ...gameState.characters[position].buff,
        {
          id: "528-passive-4",
          name: "使自身攻擊力增加50%",
          type: 0,
          condition: Condition.NONE,
          duration: 100,
          _0: {
            value: 0.5,
            affectType: AffectType.ATK,
          },
        },
      ];

      if (gameState.characters[position].stars === 5) {
        gameState.characters.forEach((character, index) => {
          if (character.class === CharacterClass.ATTACKER) {
            gameState.characters[index].buff = [
              ...gameState.characters[index].buff,
              {
                id: "528-passive-5",
                name: "使我方全體攻擊者造成傷害增加15%",
                type: 0,
                condition: Condition.NONE,
                duration: 100,
                _0: {
                  value: 0.15,
                  affectType: AffectType.INCREASE_DMG,
                },
              },
            ];
          }
        });

        gameState.characters[position].buff = [
          ...gameState.characters[position].buff,
          {
            id: "528-passive-6",
            name: "造成傷害增加20%",
            type: 0,
            condition: Condition.NONE,
            duration: 100,
            _0: {
              value: 0.2,
              affectType: AffectType.INCREASE_DMG,
            },
          },
        ];
      }
      if (gameState.characters[position].passive4) {
        gameState.characters[position].buff = [
          ...gameState.characters[position].buff,
          {
            id: "528-passive-5",
            name: "使自身造成傷害加7.5%",
            type: 0,
            condition: Condition.NONE,
            duration: 100,
            _0: {
              value: 0.075,
              affectType: AffectType.INCREASE_DMG,
            },
          },
        ];
      }

      break;
    case "531":
      break;
    case "532":
      break;
    case "601":
      gameState.characters.forEach((character, index) => {
        if (character.class === CharacterClass.ATTACKER) {
          gameState.characters[index].buff = [
            ...gameState.characters[index].buff,
            {
              id: "601-passive-1",
              name: "每經過1回合，使目標受到普攻傷害增加30%",
              type: 11,
              condition: Condition.EVERY_X_TURN,
              conditionTurn: 1,
              duration: 100,
              _11: {
                target: Target.ENEMY,
                applyBuff: [
                  {
                    id: "601-passive-1-1",
                    name: "受到普攻傷害增加",
                    type: 0,
                    condition: Condition.NONE,
                    duration: 1,
                    _0: {
                      value: 0.3,
                      affectType: AffectType.INCREASE_BASIC_DAMAGE_RECEIVED,
                    },
                  },
                ],
              },
            },
            {
              id: "601-passive-2",
              name: "必殺時，觸發「使我方『夏日 千鶴』攻擊力增加20%(4回合)」",
              type: 13,
              condition: Condition.ULTIMATE,
              duration: 100,
              _13: {
                target: "601",
                applyBuff: [
                  {
                    id: "601-passive-2-1",
                    name: "攻擊力增加",
                    type: 0,
                    condition: Condition.NONE,
                    duration: 4,
                    _0: {
                      value: 0.2,
                      affectType: AffectType.ATK,
                    },
                  },
                ],
              },
            },
          ];
        }
      });
      if (gameState.characters[position].stars === 5) {
        gameState.characters[position].buff = [
          ...gameState.characters[position].buff,
          {
            id: "601-passive-3",
            name: "使自身當前必殺技CD減少4回合",
            type: 14,
            condition: Condition.ON_TURN_START,
            duration: 100,
            _14: {
              reduceCD: 4,
              target: Target.SELF,
            },
          },
          {
            id: "601-passive-4",
            name: "必殺時，觸發「使目標受到傷害增加20%(最多2層)」",
            type: 4,
            condition: Condition.ULTIMATE,
            duration: 100,
            _4: {
              increaseStack: 1,
              targetSkill: "601-passive-4-1",
              target: Target.ENEMY,
              applyBuff: {
                id: "601-passive-4-1",
                name: "受到傷害增加20%",
                type: 3,
                condition: Condition.NONE,
                duration: 100,
                _3: {
                  id: "601-passive-4-1",
                  name: "受到傷害增加20%",
                  value: 0.2,
                  stack: 1,
                  maxStack: 2,
                  affectType: AffectType.INCREASE_DMG_RECEIVED,
                },
              },
            },
          },
        ];
      }
      if (gameState.characters[position].passive4) {
        gameState.characters[position].buff = [
          ...gameState.characters[position].buff,
          {
            id: "601-passive4",
            name: "使自身攻擊力增加10%",
            type: 0,
            condition: Condition.NONE,
            duration: 100,
            _0: {
              value: 0.1,
              affectType: AffectType.ATK,
            },
          },
        ];
      }
      break;
    case "801":
      if (gameState.characters[position].stars === 5) {
        gameState.characters[position].buff = [
          ...gameState.characters[position].buff,
          {
            id: "801-passive-4",
            name: "每經過1回合時，觸發「以自身攻擊力25使我方全體攻擊力增加(1回合)」",
            type: 6,
            condition: Condition.EVERY_X_TURN,
            conditionTurn: 1,
            duration: 100,
            _6: {
              base: false,
              duration: 1,
              value: 0.25,
              target: Target.ALL,
              affectType: AffectType.RAWATK,
            },
          },
        ];
      }
      if (gameState.characters[position].passive4) {
        gameState.characters[position].buff = [
          ...gameState.characters[position].buff,
          {
            id: "801-passive4",
            name: "使自身攻擊力增加10%",
            type: 0,
            condition: Condition.NONE,
            duration: 100,
            _0: {
              value: 0.1,
              affectType: AffectType.ATK,
            },
          },
        ];
      }
      break;
    case "802":
      gameState.characters[position].buff = [
        ...gameState.characters[position].buff,
        {
          id: "802-passive-1",
          name: "攻擊力增加35%",
          type: 0,
          condition: Condition.NONE,
          duration: 100,
          _0: {
            value: 0.35,
            affectType: AffectType.ATK,
          },
        },
        {
          id: "802-passive-2",
          name: "必殺時，觸發「以自身攻擊力15使自身以外我方全體攻擊力增加(1回合)」",
          type: 6,
          condition: Condition.ULTIMATE,
          duration: 100,
          _6: {
            base: false,
            duration: 1,
            value: 0.15,
            target: Target.ALL_EXCEPT_SELF,
            affectType: AffectType.RAWATK,
          },
        },
      ];
      if (gameState.characters[position].stars === 5) {
        gameState.characters[position].buff = [
          ...gameState.characters[position].buff,
          {
            id: "802-passive-5",
            name: "必殺時，觸發「以自身攻擊力15使自身以外我方全體攻擊力增加(1回合)」",
            type: 6,
            condition: Condition.ULTIMATE,
            duration: 100,
            _6: {
              base: false,
              duration: 1,
              value: 0.15,
              target: Target.ALL_EXCEPT_SELF,
              affectType: AffectType.RAWATK,
            },
          },
        ];
      }
      break;
    case "804":
      gameState.characters[position].buff = [
        ...gameState.characters[position].buff,
        {
          id: "804-passive-1",
          name: "普攻傷害增加70%",
          type: 0,
          condition: Condition.NONE,
          duration: 100,
          _0: {
            value: 0.7,
            affectType: AffectType.INCREASE_BASIC_DAMAGE,
          },
        },
      ];
      gameState.characters[position].buff = [
        ...gameState.characters[position].buff,
        {
          id: "805-passive-1",
          name: "必殺時，觸發「使我方全體水屬性的攻擊者、守護者、妨礙者獲得《傳遞飛刀》」",
          type: 17,
          condition: Condition.ULTIMATE,
          duration: 100,
          _17: {
            includeSelf: true,
            target: [
              CharacterClass.ATTACKER,
              CharacterClass.PROTECTOR,
              CharacterClass.OBSTRUCTER,
            ],
            attributeTarget: Attribute.WATER,
            applyBuff: [
              {
                id: "805-passive-1-1",
                name: "普攻時，追加「以自身攻擊力30%對目標造成傷害」(1回合)",
                type: 101,
                condition: Condition.BASIC_ATTACK,
                duration: 1,
                _101: {
                  value: 0.3,
                  isTrigger: false,
                  target: Target.ENEMY,
                  damageType: 0,
                },
              },
            ],
          },
        },
        {
          id: "804-passive-2",
          name: "必殺時，觸發「使我方全體水屬性的攻擊者、守護者、妨礙者獲得「必殺時，觸發『使我方賞金獵人安潔娜爾』獲得《傳遞飛刀》』」",
          type: 17,
          condition: Condition.ULTIMATE,
          duration: 100,
          _17: {
            includeSelf: false,
            target: [
              CharacterClass.ATTACKER,
              CharacterClass.PROTECTOR,
              CharacterClass.OBSTRUCTER,
            ],
            attributeTarget: Attribute.WATER,
            applyBuff: [
              {
                id: "804-passive-2-1",
                name: "必殺時，觸發「使我方賞金獵人安潔娜爾獲得《傳遞飛刀》」",
                type: 13,
                condition: Condition.ULTIMATE,
                duration: 4,
                _13: {
                  target: "804",
                  applyBuff: [
                    {
                      id: "804-passive-2-2",
                      name: "普攻時，追加「以自身攻擊力30%對目標造成傷害」(1回合)",
                      type: 101,
                      condition: Condition.BASIC_ATTACK,
                      duration: 1,
                      _101: {
                        value: 0.3,
                        isTrigger: false,
                        target: Target.ENEMY,
                        damageType: 0,
                      },
                    },
                  ],
                },
              },
            ],
          },
        },
      ];

      if (gameState.characters[position].stars === 5) {
        gameState.characters[position].buff = [
          ...gameState.characters[position].buff,
          {
            id: "804-passive-3",
            name: "第一回合時，使自身當前必殺技CD減少4回合",
            type: 14,
            condition: Condition.ON_TURN_START,
            duration: 100,
            _14: {
              reduceCD: 4,
              target: Target.SELF,
            },
          },
          {
            id: "804-passive-4",
            name: "第一回合時，使自身以外的我方全體水屬性隊員當前必殺技CD減少1回合",
            type: 18,
            condition: Condition.ON_TURN_START,
            duration: 100,
            _18: {
              reduceCD: 1,
              attribute: Attribute.WATER,
              includeSelf: false,
            },
          },
        ];
      }
      if (gameState.characters[position].passive4) {
        gameState.characters[position].buff = [
          ...gameState.characters[position].buff,
          {
            id: "804-passive4",
            name: "普攻傷害增加10%",
            type: 0,
            condition: Condition.NONE,
            duration: 100,
            _0: {
              value: 0.1,
              affectType: AffectType.INCREASE_BASIC_DAMAGE,
            },
          },
        ];
      }
      break;
    case "805":
      gameState.characters[position].buff = [
        ...gameState.characters[position].buff,
        {
          id: "805-passive-1",
          name: "普攻時，觸發「使自身攻擊力增加15%(最多6層)」",
          type: 4,
          condition: Condition.BASIC_ATTACK,
          duration: 100,
          _4: {
            increaseStack: 1,
            targetSkill: "805-passive-1-1",
            target: Target.SELF,
            applyBuff: {
              id: "805-passive-1-1",
              name: "攻擊力增加",
              type: 3,
              condition: Condition.NONE,
              duration: 100,
              _3: {
                id: "805-passive-1-1",
                name: "攻擊力增加15%",
                value: 0.15,
                maxStack: 6,
                stack: 1,
                affectType: AffectType.ATK,
              },
            },
          },
        },
        {
          id: "805-passive-2",
          name: "普攻時，觸發「使目標受到普攻傷害增加15%(最多6層)」",
          type: 4,
          condition: Condition.BASIC_ATTACK,
          duration: 100,
          _4: {
            increaseStack: 1,
            targetSkill: "805-passive-2-1",
            target: Target.ENEMY,
            applyBuff: {
              id: "805-passive-2-1",
              name: "受到普攻傷害增加",
              type: 3,
              condition: Condition.NONE,
              duration: 100,
              _3: {
                id: "805-passive-2-1",
                name: "受到普攻傷害增加15%",
                value: 0.15,
                maxStack: 6,
                stack: 1,
                affectType: AffectType.INCREASE_BASIC_DAMAGE_RECEIVED,
              },
            },
          },
        },
      ];

      // 造成傷害增加20%
      // 必殺時，觸發「使目標受到風屬性傷害增加10%(最多3層)」
      if (gameState.characters[position].stars === 5) {
        gameState.characters[position].buff = [
          ...gameState.characters[position].buff,
          {
            id: "805-passive-3",
            name: "造成傷害增加20%",
            type: 0,
            condition: Condition.NONE,
            duration: 100,
            _0: {
              value: 0.2,
              affectType: AffectType.INCREASE_DMG,
            },
          },
          {
            id: "805-passive-4",
            name: "必殺時，觸發「使目標受到風屬性傷害增加10%(最多3層)」",
            type: 4,
            condition: Condition.ULTIMATE,
            duration: 100,
            _4: {
              increaseStack: 1,
              targetSkill: "805-passive-4-1",
              target: Target.ENEMY,
              applyBuff: {
                id: "805-passive-4-1",
                name: "受到風屬性傷害增加",
                type: 3,
                condition: Condition.NONE,
                duration: 100,
                _3: {
                  id: "805-passive-4-1",
                  name: "受到風屬性傷害增加10%",
                  value: 0.1,
                  stack: 1,
                  maxStack: 3,
                  affectType: AffectType.INCREASE_WIND_DMG_RECEIVED,
                },
              },
            },
          },
        ];
      }

      if (gameState.characters[position].passive4) {
        gameState.characters[position].buff = [
          ...gameState.characters[position].buff,
          {
            id: "805-passive4",
            name: "使自身普攻傷害增加10%",
            type: 0,
            condition: Condition.NONE,
            duration: 100,
            _0: {
              value: 0.1,
              affectType: AffectType.INCREASE_BASIC_DAMAGE,
            },
          },
        ];
      }
      break;

    case "806":
      //     使自身以外我方所有光屬性攻擊者免疫必殺技CD變動效果
      // 必殺時，觸發「使自身當前必殺技CD減少2回合」
      {
        gameState.characters[position].buff = [
          ...gameState.characters[position].buff,
          {
            id: "806-passive-2",
            // 必殺時，觸發「使自身當前必殺技CD減少2回合」
            name: "必殺時，觸發「使自身當前必殺技CD減少2回合」",
            type: 14,
            condition: Condition.ULTIMATE,
            duration: 100,
            _14: {
              reduceCD: 2,
              target: Target.SELF,
            },
          },
          {
            id: "806-passive-3",
            name: "必殺時，觸發「使自身造成傷害增加15%(最多2層)」",
            type: 4,
            condition: Condition.ULTIMATE,
            duration: 100,
            _4: {
              increaseStack: 1,
              targetSkill: "806-passive-3-1",
              target: Target.SELF,
              applyBuff: {
                id: "806-passive-3-1",
                name: "造成傷害增加",
                type: 3,
                condition: Condition.NONE,
                duration: 100,
                _3: {
                  id: "806-passive-3-1",
                  name: "造成傷害增加15%",
                  value: 0.15,
                  stack: 1,
                  maxStack: 2,
                  affectType: AffectType.INCREASE_DMG,
                },
              },
            },
          },
        ];
      }

      if (gameState.characters[position].stars === 5) {
        gameState.characters[position].buff = [
          ...gameState.characters[position].buff,
          {
            id: "806-passive-4",
            name: "第一回合時，觸發「使自身當前必殺技CD減少2回合」",
            type: 14,
            condition: Condition.ON_TURN_START,
            duration: 100,
            _14: {
              reduceCD: 2,
              target: Target.SELF,
            },
          },
          {
            id: "806-passive-5",
            name: "必殺時，觸發「使目標受到光屬性傷害增加20%(最多1層)」",
            type: 4,
            condition: Condition.ULTIMATE,
            duration: 100,
            _4: {
              increaseStack: 1,
              targetSkill: "806-passive-5-1",
              target: Target.ENEMY,
              applyBuff: {
                id: "806-passive-5-1",
                name: "受到光屬性傷害增加",
                type: 3,
                condition: Condition.NONE,
                duration: 100,
                _3: {
                  id: "806-passive-5-1",
                  name: "受到光屬性傷害增加20%",
                  value: 0.2,
                  stack: 1,
                  maxStack: 1,
                  affectType: AffectType.INCREASE_LIGHT_DMG_RECEIVED,
                },
              },
            },
          },
        ];
      }

      if (gameState.characters[position].passive4) {
        gameState.characters[position].buff = [
          ...gameState.characters[position].buff,
          {
            id: "806-passive4",
            name: "使自身必殺技傷害增加10%",
            type: 0,
            condition: Condition.NONE,
            duration: 100,
            _0: {
              value: 0.1,
              affectType: AffectType.INCREASE_ULTIMATE_DAMAGE,
            },
          },
        ];
      }
      break;

    case "813":
      // 每Wave的第9回合時，觸發「使敵方全體受到傷害增加50%(50回合)
      gameState.characters[position].buff = [
        ...gameState.characters[position].buff,
        {
          id: "813-passive-1",
          name: "攻擊力增加30%",
          type: 0,
          condition: Condition.NONE,
          duration: 100,
          _0: {
            value: 0.3,
            affectType: AffectType.ATK,
          },
        },
      ];
      if (gameState.characters[position].stars === 5) {
        // 每Wave的第9回合時，觸發「使敵方全體受到傷害增加50%(50回合)
        gameState.characters[position].buff = [
          ...gameState.characters[position].buff,
          {
            id: "813-passive-2",
            name: "每Wave的第9回合時，觸發「使敵方全體受到傷害增加50%(50回合)」",
            type: 11,
            condition: Condition.ON_SPECIFIC_TURN,
            duration: 100,
            conditionTurn: 9,
            _11: {
              target: Target.ENEMY,
              applyBuff: [
                {
                  id: "813-passive-2-1",
                  name: "受到傷害增加",
                  type: 0,
                  condition: Condition.NONE,
                  duration: 50,
                  _0: {
                    value: 0.5,
                    affectType: AffectType.INCREASE_DMG_RECEIVED,
                  },
                },
              ],
            },
          },
        ];
      }
      if (gameState.characters[position].passive4) {
        gameState.characters[position].buff = [
          ...gameState.characters[position].buff,
          {
            id: "813-passive4",
            name: "使自身攻擊力增加10%",
            type: 0,
            condition: Condition.NONE,
            duration: 100,
            _0: {
              value: 0.1,
              affectType: AffectType.ATK,
            },
          },
        ];
      }

      break;

    default:
      break;
  }
}
