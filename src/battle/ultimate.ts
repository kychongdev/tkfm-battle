import { CharacterClass } from "../types/Character";
import { AffectType, Condition, Target } from "../types/Skill";
import type { Buff } from "../types/Skill";
import { applyRawAttBuff, parseCondition, triggerPassive } from "./calculate";
import { calcUltDamage } from "./calcUltDamage";
import type { GameState } from "./GameState";

export function activateUltimate(gameState: GameState, position: number) {
  const bond = gameState.characters[position].bond;
  switch (gameState.characters[position].id) {
    case "163":
      gameState.characters.forEach((character) => {
        const attack = Math.floor(
          applyRawAttBuff(gameState, position) *
            (bond === 1
              ? 0.15
              : bond === 2
                ? 0.2
                : bond === 3
                  ? 0.3
                  : bond === 4
                    ? 0.3
                    : 0.3),
        );
        character.buff = [
          ...character.buff,
          {
            id: "163-ult-1",
            name: "攻擊力",
            type: 0,
            condition: Condition.NONE,
            duration: 1,
            _0: {
              value: attack,
              affectType: AffectType.RAWATK,
            },
          },
        ];
      });
      {
        const buff: Buff = {
          id: "163-ult-2",
          name: "必殺時，觸發「使我方站位5的隊員攻擊力增加%(1回合)」",
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
              duration: 1,
              _0: {
                value:
                  bond === 1
                    ? 0.2
                    : bond === 2
                      ? 0.25
                      : bond === 3
                        ? 0.3
                        : bond === 4
                          ? 0.45
                          : 0.6,
                affectType: AffectType.ATK,
              },
            },
          },
        };
        triggerPassive(buff, gameState, position);
        gameState.characters.forEach((character, index) => {
          parseCondition(index, [Condition.GET_HEAL], gameState);
        });

        const buff2: Buff = {
          id: "163-ult-3",
          name: "使5號位當前必殺技CD減少4回合",
          type: 15,
          condition: Condition.NONE,
          duration: 100,
          _15: {
            reduceCD: 4,
            position: 4,
          },
        };
        triggerPassive(buff2, gameState, position);
      }
      break;
    //花嫁 巴爾
    case "172":
      {
        const buff: Buff = {
          id: "172-ult-1",
          name: "攻擊力",
          type: 6,
          condition: Condition.NONE,
          duration: 1,
          _6: {
            duration: 1,
            base: false,
            value:
              bond === 1
                ? 0.4
                : bond === 2
                  ? 0.4
                  : bond === 3
                    ? 0.45
                    : bond === 4
                      ? 0.45
                      : 0.5,
            affectType: AffectType.RAWATK,
            target: Target.SELF,
          },
        };
        triggerPassive(buff, gameState, position);
      }
      {
        const atk = Math.floor(
          applyRawAttBuff(gameState, position) *
            (bond === 1
              ? 0.65
              : bond === 2
                ? 0.65
                : bond === 3
                  ? 0.7
                  : bond === 4
                    ? 0.7
                    : 0.75),
        );
        const buff: Buff = {
          id: "172-ult-1",
          name: "攻擊力",
          type: 12,
          condition: Condition.NONE,
          duration: 1,
          _12: {
            position: 1,
            applyBuff: {
              id: "172-ult-1",
              name: "攻擊力",
              type: 0,
              condition: Condition.NONE,
              duration: 1,
              _0: {
                value: atk,
                affectType: AffectType.RAWATK,
              },
            },
          },
        };
        triggerPassive(buff, gameState, position);
        const buff2: Buff = {
          id: "172-ult-2",
          name: "普攻傷害增加(2回合)",
          type: 12,
          condition: Condition.ULTIMATE,
          duration: 100,
          _12: {
            position: 1,
            applyBuff: {
              id: "172-ult-2",
              name: "普攻傷害增加",
              type: 0,
              condition: Condition.NONE,
              duration: 2,
              _0: {
                value:
                  bond === 1
                    ? 0.8
                    : bond === 2
                      ? 0.9
                      : bond === 3
                        ? 0.9
                        : bond === 4
                          ? 1
                          : 1,
                affectType: AffectType.INCREASE_BASIC_DAMAGE,
              },
            },
          },
        };
        triggerPassive(buff2, gameState, position);

        const buff3: Buff = {
          id: "172-ult-3",
          name: "必殺傷害增加(1回合)",
          type: 12,
          condition: Condition.ULTIMATE,
          duration: 100,
          _12: {
            position: 1,
            applyBuff: {
              id: "172-ult-3",
              name: "必殺傷害增加",
              type: 0,
              condition: Condition.NONE,
              duration: 1,
              _0: {
                value:
                  bond === 1
                    ? 0.3
                    : bond === 2
                      ? 0.35
                      : bond === 3
                        ? 0.35
                        : bond === 4
                          ? 0.4
                          : 0.4,
                affectType: AffectType.INCREASE_ULTIMATE_DAMAGE,
              },
            },
          },
        };
        triggerPassive(buff3, gameState, position);
      }
      break;
    // 黑鷹 貝里絲
    case "177":
      {
        const buff: Buff = {
          id: "177-ult-1",
          name: "以自身最大HP10/10/12.5/15/20%使自身攻擊力增加(3/3/4/4/4回合)",
          type: 16,
          condition: Condition.ULTIMATE,
          duration: 100,
          _16: {
            value:
              bond === 1
                ? 0.1
                : bond === 2
                  ? 0.1
                  : bond === 3
                    ? 0.125
                    : bond === 4
                      ? 0.15
                      : 0.2,
            affectType: AffectType.RAWATK,
            target: Target.SELF,
            duration:
              bond === 1
                ? 3
                : bond === 2
                  ? 3
                  : bond === 3
                    ? 4
                    : bond === 4
                      ? 4
                      : 4,
          },
        };
        triggerPassive(buff, gameState, position);
      }
      //再以自身攻擊力100/125/150/175/200%對我方全體進行治療，再以自身最大HP30/35/40/45/50%每回合對我方全體進行治療(4回合)，CD：4
      gameState.characters.forEach((_, index) => {
        parseCondition(index, [Condition.GET_HEAL], gameState);
      });
      break;

    case "178":
      {
        const buff: Buff = {
          id: "178-ult-1",
          name: "受到傷害增加(最多2層)",
          type: 4,
          condition: Condition.ULTIMATE,
          duration: 100,
          _4: {
            increaseStack: 1,
            targetSkill: "178-ult-1-1",
            target: Target.ENEMY,
            applyBuff: {
              id: "178-ult-1-1",
              name: "受到傷害增加(最多2層)",
              type: 3,
              condition: Condition.NONE,
              duration: 100,
              _3: {
                id: "178-ult-1-1",
                name: "受到傷害增加(最多1層)",
                stack: 1,
                maxStack: 2,
                affectType: AffectType.INCREASE_DMG_RECEIVED,
                value:
                  bond === 1
                    ? 0.075
                    : bond === 2
                      ? 0.075
                      : bond === 3
                        ? 0.1
                        : bond === 4
                          ? 0.125
                          : 0.15,
              },
            },
          },
        };
        triggerPassive(buff, gameState, position);

        const buff2: Buff = {
          id: "178-ult-2",
          name: "受到水屬性傷害增加(最多2層)",
          type: 4,
          condition: Condition.ULTIMATE,
          duration: 100,
          _4: {
            increaseStack: 1,
            targetSkill: "178-ult-2-1",
            target: Target.ENEMY,
            applyBuff: {
              id: "178-ult-2-1",
              name: "受到水屬性傷害增加(最多2層)",
              type: 3,
              condition: Condition.NONE,
              duration: 100,
              _3: {
                id: "178-ult-2-1",
                name: "受到水屬性傷害增加(最多1層)",
                stack: 1,
                maxStack: 2,
                affectType: AffectType.INCREASE_WATER_DMG_RECEIVED,
                value:
                  bond === 1
                    ? 0.05
                    : bond === 2
                      ? 0.075
                      : bond === 3
                        ? 0.075
                        : bond === 4
                          ? 0.1
                          : 0.125,
              },
            },
          },
        };
        triggerPassive(buff2, gameState, position);
        calcUltDamage(
          position,
          bond === 1
            ? 3.3
            : bond === 2
              ? 3.76
              : bond === 3
                ? 4.22
                : bond === 4
                  ? 4.68
                  : 5.14,
          gameState,
          false,
          Target.ENEMY,
          "ultimate",
        );
      }

      break;

    case "179":
      gameState.characters[position].buff = [
        ...gameState.characters[position].buff,
        {
          id: "179-ult-1",
          name: "攻擊力增加(1回合)",
          type: 0,
          condition: Condition.NONE,
          duration:
            bond === 1
              ? 3
              : bond === 2
                ? 3
                : bond === 3
                  ? 3
                  : bond === 4
                    ? 4
                    : 4,
          _0: {
            affectType: AffectType.ATK,
            value:
              bond === 1
                ? 0.5
                : bond === 2
                  ? 0.65
                  : bond === 3
                    ? 0.8
                    : bond === 4
                      ? 0.95
                      : 1.1,
          },
        },
      ];

      calcUltDamage(position, 2, gameState, false, Target.ENEMY, "ultimate");

      if (bond > 2) {
        const buff: Buff = {
          id: "179-ult-2",
          name: "造成傷害增加(最多1層)",
          type: 4,
          condition: Condition.ULTIMATE,
          duration: 100,
          _4: {
            increaseStack: 1,
            targetSkill: "179-ult-2-1",
            target: Target.SELF,
            applyBuff: {
              id: "179-ult-2-1",
              name: "造成傷害增加(最多1層)",
              type: 3,
              condition: Condition.NONE,
              duration: 100,
              _3: {
                id: "179-ult-2-1",
                name: "造成傷害增加(最多1層)",
                stack: 1,
                maxStack: 1,
                affectType: AffectType.INCREASE_DMG,
                value: bond === 3 ? 0.1 : bond === 4 ? 0.15 : 0.2,
              },
            },
          },
        };
        triggerPassive(buff, gameState, position);
      }
      break;
    case "196":
      {
        gameState.characters.forEach((character) => {
          const attack = Math.floor(
            applyRawAttBuff(gameState, position) *
              (bond === 1
                ? 0.3
                : bond === 2
                  ? 0.35
                  : bond === 3
                    ? 0.4
                    : bond === 4
                      ? 0.4
                      : 0.4),
          );
          character.buff = [
            ...character.buff,
            {
              id: "RAWATTACK",
              name: "攻擊力",
              type: 0,
              condition: Condition.NONE,
              duration: 1,
              _0: {
                value: attack,
                affectType: AffectType.RAWATK,
              },
            },
          ];
        });
        gameState.characters.forEach((character, index) => {
          if (
            character.class === CharacterClass.ATTACKER ||
            character.class === CharacterClass.OBSTRUCTER ||
            character.class === CharacterClass.PROTECTOR
          ) {
            gameState.characters[index].buff = [
              ...gameState.characters[index].buff,
              {
                id: "196-ult-1",
                name: "攻擊時，觸發『以自身攻擊力15%使自身以外我方全體攻擊力增加(1回合)』(1回合)",
                type: 6,
                condition: Condition.ATTACK,
                duration: 1,
                _6: {
                  duration: 1,
                  base: false,
                  value:
                    bond === 1
                      ? 0.1
                      : bond === 2
                        ? 0.1
                        : bond === 3
                          ? 0.125
                          : bond === 4
                            ? 0.125
                            : 0.15,
                  affectType: AffectType.RAWATK,
                  target: Target.ALL_EXCEPT_SELF,
                },
              },
            ];
          }
        });
      }
      break;
    case "198":
      {
        const buff: Buff = {
          id: "198-ult-1",
          name: "受到必殺技傷害增加(最多1層)",
          type: 4,
          condition: Condition.ULTIMATE,
          duration: 100,
          _4: {
            increaseStack: 1,
            targetSkill: "198-ult-1-1",
            target: Target.ENEMY,
            applyBuff: {
              id: "198-ult-1-1",
              name: "受到必殺技傷害增加(最多1層)",
              type: 3,
              condition: Condition.NONE,
              duration: 100,
              _3: {
                id: "198-ult-1-1",
                name: "受到必殺技傷害增加(最多1層)",
                stack: 1,
                maxStack:
                  bond === 1
                    ? 3
                    : bond === 2
                      ? 3
                      : bond === 3
                        ? 3
                        : bond === 4
                          ? 2
                          : 2,
                affectType: AffectType.INCREASE_ULTIMATE_DAMAGE_RECEIVED,
                value:
                  bond === 1
                    ? 0.08
                    : bond === 2
                      ? 0.08
                      : bond === 3
                        ? 0.08
                        : bond === 4
                          ? 0.18
                          : 0.225,
              },
            },
          },
        };
        triggerPassive(buff, gameState, position);
      }

      calcUltDamage(
        position,
        bond === 1
          ? 3.3
          : bond === 2
            ? 3.76
            : bond === 3
              ? 4.22
              : bond === 4
                ? 4.68
                : 5.14,
        gameState,
        false,
        Target.ENEMY,
        "ultimate",
      );

      break;
    case "514":
      {
        const buff: Buff = {
          id: "514-ultimate-1",
          name: "必殺技傷害增加70%(2回合)",
          type: 12,
          condition: Condition.NONE,
          duration: 100,
          _12: {
            position: 4,
            applyBuff: {
              id: "514-ultimate-1",
              name: "必殺技傷害增加70%(2回合)",
              type: 0,
              condition: Condition.NONE,
              duration: 2,
              _0: {
                value:
                  bond === 1
                    ? 0.3
                    : bond === 2
                      ? 0.4
                      : bond === 3
                        ? 0.5
                        : bond === 4
                          ? 0.6
                          : 0.7,
                affectType: AffectType.INCREASE_ULTIMATE_DAMAGE,
              },
            },
          },
        };
        triggerPassive(buff, gameState, position);
        const ultPercentage =
          bond === 1
            ? 3.88
            : bond === 2
              ? 4.45
              : bond === 3
                ? 5.03
                : bond === 4
                  ? 5.6
                  : 6.18;
        calcUltDamage(
          position,
          ultPercentage,
          gameState,
          false,
          Target.ENEMY,
          "ultimate",
        );
      }
      break;
    // 夏日 巴爾
    case "517":
      calcUltDamage(position, 1, gameState, false, Target.ENEMY, "ultimate");
      gameState.characters[position].buff = [
        ...gameState.characters[position].buff,
        {
          id: "517-ult-1",
          name: "普攻時，追加『以自身攻擊力96/115/135/154/173%對目標造成傷害』(4回合)",
          type: 1,
          condition: Condition.BASIC_ATTACK,
          duration: 4,
          _1: {
            value:
              bond === 1
                ? 0.96
                : bond === 2
                  ? 1.15
                  : bond === 3
                    ? 1.35
                    : bond === 4
                      ? 1.54
                      : 1.73,
            isTrigger: false,
            target: Target.ENEMY,
            damageType: 0,
          },
        },
      ];

      break;

    case "508":
      // 以自身攻擊力20%使自身以外我方全體攻擊力增加(1回合)，使目標受到傷害增加15/15/22.5/22.5/30%(最多3/3/2/2/2層)，以自身攻擊力96/110/123/137/150%每回合對我方全體進行治療(3回合)，CD: 4
      gameState.characters.forEach((character, index) => {
        const attack = Math.floor(applyRawAttBuff(gameState, position) * 0.2);
        if (index !== position) {
          character.buff = [
            ...character.buff,
            {
              id: "508-ult-1",
              name: "攻擊力",
              type: 0,
              condition: Condition.NONE,
              duration: 1,
              _0: {
                value: attack,
                affectType: AffectType.RAWATK,
              },
            },
          ];
        }
      });
      {
        const buff: Buff = {
          id: "508-ult-2",
          name: "受到傷害增加(最多1層)",
          type: 4,
          condition: Condition.ULTIMATE,
          duration: 100,
          _4: {
            increaseStack: 1,
            targetSkill: "508-ult-2-1",
            target: Target.ENEMY,
            applyBuff: {
              id: "508-ult-2-1",
              name: "受到傷害增加",
              type: 3,
              condition: Condition.NONE,
              duration: 100,
              _3: {
                id: "508-ult-2-1",
                name: "受到傷害增加",
                stack: 1,
                maxStack:
                  bond === 1
                    ? 3
                    : bond === 2
                      ? 3
                      : bond === 3
                        ? 2
                        : bond === 4
                          ? 2
                          : 2,
                affectType: AffectType.INCREASE_DMG_RECEIVED,
                value:
                  bond === 1
                    ? 0.15
                    : bond === 2
                      ? 0.15
                      : bond === 3
                        ? 0.225
                        : bond === 4
                          ? 0.225
                          : 0.3,
              },
            },
          },
        };
        triggerPassive(buff, gameState, position);
      }
      break;
    case "518":
      gameState.characters[position].buff = [
        ...gameState.characters[position].buff,
        {
          id: "518-ult-1",
          name: "治療增加50%(4回合)",
          type: 0,
          condition: Condition.NONE,
          duration: 4,
          _0: {
            affectType: AffectType.INCREASE_HEAL_RATE,
            value:
              bond === 1
                ? 0.3
                : bond === 2
                  ? 0.35
                  : bond === 3
                    ? 0.4
                    : bond === 4
                      ? 0.45
                      : 0.5,
          },
        },
      ];
      gameState.characters.forEach((_, index) => {
        parseCondition(index, [Condition.GET_HEAL], gameState);
      });

      gameState.enemies[gameState.targeting].buff = [
        ...gameState.enemies[gameState.targeting].buff,
        {
          id: "518-ult-2",
          name: "受到光屬性傷害增加25%(1回合)",
          type: 0,
          condition: Condition.NONE,
          duration: 1,
          _0: {
            affectType: AffectType.INCREASE_LIGHT_DMG_RECEIVED,
            value:
              bond === 1
                ? 0.1
                : bond === 2
                  ? 0.1
                  : bond === 3
                    ? 0.15
                    : bond === 4
                      ? 0.2
                      : 0.25,
          },
        },
      ];
      break;
    // 杏仁咪嚕
    case "523":
      gameState.characters.forEach((_, index) => {
        gameState.characters[index].buff = [
          ...gameState.characters[index].buff,
          {
            id: "523-ult-1",
            name: "造成觸發技效果增加(4回合)",
            type: 0,
            condition: Condition.NONE,
            duration: 4,
            _0: {
              affectType: AffectType.INCREASE_TRIGGER_DAMAGE,
              value:
                bond === 1
                  ? 0.6
                  : bond === 2
                    ? 0.7
                    : bond === 3
                      ? 0.8
                      : bond === 4
                        ? 0.9
                        : 1,
            },
          },
        ];
      });
      {
        const ultPercentage =
          bond === 1
            ? 2.65
            : bond === 2
              ? 2.98
              : bond === 3
                ? 3.31
                : bond === 4
                  ? 3.64
                  : 3.97;
        calcUltDamage(
          position,
          ultPercentage,
          gameState,
          false,
          Target.ENEMY,
          "ultimate",
        );
      }
      break;
    case "525":
      gameState.characters[position].buff = [
        ...gameState.characters[position].buff,
        {
          id: "525-ult-1",
          name: "攻擊力增加200%(1回合)",
          type: 0,
          condition: Condition.NONE,
          duration: 1,
          _0: {
            affectType: AffectType.ATK,
            value:
              bond === 1
                ? 2
                : bond === 2
                  ? 2
                  : bond === 3
                    ? 2.5
                    : bond === 4
                      ? 2.5
                      : 3,
          },
        },
      ];
      gameState.characters[position].buff = [
        ...gameState.characters[position].buff,
        {
          id: "525-ult-2",
          name: "以自身攻擊力25%使自身攻擊力增加(1回合)",
          type: 0,
          condition: Condition.NONE,
          duration: 1,
          _0: {
            affectType: AffectType.RAWATK,
            value: Math.floor(
              applyRawAttBuff(gameState, position) *
                (bond === 1
                  ? 0.25
                  : bond === 2
                    ? 0.3
                    : bond === 3
                      ? 0.35
                      : bond === 4
                        ? 0.4
                        : 0.45),
            ),
          },
        },
      ];
      gameState.characters.forEach((character, index) => {
        if (
          character.class === CharacterClass.OBSTRUCTER ||
          character.class === CharacterClass.ATTACKER
        ) {
          gameState.characters[index].buff = [
            ...gameState.characters[index].buff,
            {
              id: "525-ult-3",
              name: "以自身攻擊力25%使我方攻擊者、妨礙者攻擊力增加(1回合)",
              type: 0,
              condition: Condition.NONE,
              duration: 1,
              _0: {
                affectType: AffectType.RAWATK,
                value: Math.floor(applyRawAttBuff(gameState, position) * 0.25),
              },
            },
          ];
        }
      });
      break;
    case "526":
      gameState.enemies[gameState.targeting].buff = [
        ...gameState.enemies[gameState.targeting].buff,
        {
          id: "526-ult-1",
          name: "受到傷害增加30%(4回合)",
          type: 0,
          condition: Condition.NONE,
          duration: 4,
          _0: {
            affectType: AffectType.INCREASE_DMG_RECEIVED,
            value:
              bond === 1
                ? 0.3
                : bond === 2
                  ? 0.3
                  : bond === 3
                    ? 0.4
                    : bond === 4
                      ? 0.4
                      : 0.45,
          },
        },
      ];
      if (bond > 1) {
        const stack = gameState.enemies[gameState.targeting].buff.find(
          (buff) => buff.id === "526-ult-2",
        )?._3?.stack;
        if (stack !== 1 || !stack) {
          gameState.enemies[gameState.targeting].buff = [
            ...gameState.enemies[gameState.targeting].buff,
            {
              id: "526-ult-2",
              name: "受到傷害增加10%(最多1層)",
              type: 3,
              condition: Condition.NONE,
              duration: 4,
              _3: {
                id: "526-ult-2",
                name: "受到傷害增加10%(最多1層)",
                stack: 1,
                maxStack: 1,
                affectType: AffectType.INCREASE_DMG_RECEIVED,
                value:
                  bond === 2 ? 0.1 : bond === 3 ? 0.1 : bond === 4 ? 0.2 : 0.2,
              },
            },
          ];
        }
      }

      gameState.characters.forEach((_, index) => {
        gameState.characters[index].buff = [
          ...gameState.characters[index].buff,
          {
            id: "526-ult-3",
            name: "必殺技傷害增加30%(4回合)",
            type: 0,
            condition: Condition.NONE,
            duration: 4,
            _0: {
              affectType: AffectType.INCREASE_ULTIMATE_DAMAGE,
              value:
                bond === 1
                  ? 0.1
                  : bond === 2
                    ? 0.15
                    : bond === 3
                      ? 0.2
                      : bond === 4
                        ? 0.25
                        : 0.3,
            },
          },
        ];
      });
      break;
    case "528":
      {
        const buff: Buff = {
          id: "528-ult-1",
          name: "受到攻擊者傷害增加30%(2回合)",
          type: 4,
          condition: Condition.ULTIMATE,
          duration: 100,
          _4: {
            increaseStack: 1,
            target: Target.ENEMY,
            targetSkill: "528-ult-1",
            applyBuff: {
              id: "528-ult-1",
              name: "受到攻擊者傷害增加30%(2回合)",
              type: 3,
              condition: Condition.NONE,
              duration: 100,
              _3: {
                id: "528-ult-1",
                name: "受到攻擊者傷害增加(最多2層)",
                affectType: AffectType.INCREASE_ATTACKER_DAMAGE_RECEIVED,
                value:
                  bond === 1
                    ? 0.3
                    : bond === 2
                      ? 0.365
                      : bond === 3
                        ? 0.4
                        : bond === 4
                          ? 0.465
                          : 0.5,
                stack: 1,
                maxStack: 2,
              },
            },
          },
        };
        triggerPassive(buff, gameState, position);
      }
      gameState.characters[position].buff = [
        ...gameState.characters[position].buff,
        {
          id: "528-ult-2",
          name: "普攻時，追加『以攻擊力50/56.5/70/76.5/90%對目標造成傷害』(4回合)",
          type: 1,
          condition: Condition.BASIC_ATTACK,
          duration: 4,
          _1: {
            value:
              bond === 1
                ? 0.5
                : bond === 2
                  ? 0.565
                  : bond === 3
                    ? 0.7
                    : bond === 4
                      ? 0.765
                      : 0.9,
            isTrigger: false,
            target: Target.ENEMY,
            damageType: 0,
          },
        },
      ];
      calcUltDamage(
        position,
        bond === 1
          ? 3.3
          : bond === 2
            ? 3.76
            : bond === 3
              ? 4.22
              : bond === 4
                ? 4.68
                : 5.14,
        gameState,
        false,
        Target.ENEMY,
        "ultimate",
      );

      break;
    case "601":
      // 使自身普攻傷害增加50/70/90/110/130%(4回合)、使自身造成傷害增加20/25/30/35/40%(4回合)、使我方全體攻擊者獲得普攻時，追加「以自身攻擊力20/30/30/40/60%對目標造成傷害、使我方『夏日 千鶴』攻擊力增加10/10/20/20/30%(1回合)」(4回合)、再以自身攻擊力200%對目標造成傷害，CD:4
      gameState.characters[position].buff = [
        ...gameState.characters[position].buff,
        {
          id: "601-ult-1",
          name: "普攻傷害增加(4回合)",
          type: 0,
          condition: Condition.NONE,
          duration: 4,
          _0: {
            affectType: AffectType.INCREASE_BASIC_DAMAGE,
            value:
              bond === 1
                ? 0.5
                : bond === 2
                  ? 0.7
                  : bond === 3
                    ? 0.9
                    : bond === 4
                      ? 1.1
                      : 1.3,
          },
        },
        {
          id: "601-ult-2",
          name: "造成傷害增加(4回合)",
          type: 0,
          condition: Condition.NONE,
          duration: 4,
          _0: {
            affectType: AffectType.INCREASE_DMG,
            value:
              bond === 1
                ? 0.2
                : bond === 2
                  ? 0.25
                  : bond === 3
                    ? 0.3
                    : bond === 4
                      ? 0.35
                      : 0.4,
          },
        },
      ];

      gameState.characters.forEach((character, index) => {
        if (character.class === CharacterClass.ATTACKER) {
          gameState.characters[index].buff = [
            ...gameState.characters[index].buff,
            {
              id: "601-ult-3",
              name: `普攻時，追加『以自身攻擊力${
                bond === 1
                  ? 20
                  : bond === 2
                    ? 30
                    : bond === 3
                      ? 30
                      : bond === 4
                        ? 40
                        : 60
              }%對目標造成傷害』(4回合)`,
              type: 101,
              condition: Condition.BASIC_ATTACK,
              duration: 4,
              _101: {
                value:
                  bond === 1
                    ? 0.2
                    : bond === 2
                      ? 0.3
                      : bond === 3
                        ? 0.3
                        : bond === 4
                          ? 0.4
                          : 0.6,
                isTrigger: false,
                target: Target.ENEMY,
                damageType: 0,
              },
            },
            {
              id: "601-ult-4",
              name: "必殺時，觸發『使我方夏日 千鶴攻擊力增加10/10/20/20/30%(1回合)』(4回合)",
              type: 13,
              condition: Condition.ATTACK,
              duration: 4,
              _13: {
                target: "601",
                applyBuff: [
                  {
                    id: "601-ult-4",
                    name: "攻擊力增加(1回合)",
                    type: 0,
                    condition: Condition.NONE,
                    duration: 1,
                    _0: {
                      affectType: AffectType.ATK,
                      value:
                        bond === 1
                          ? 0.1
                          : bond === 2
                            ? 0.1
                            : bond === 3
                              ? 0.2
                              : bond === 4
                                ? 0.2
                                : 0.3,
                    },
                  },
                ],
              },
            },
          ];
        }
      });

      calcUltDamage(position, 2, gameState, false, Target.ENEMY, "ultimate");

      break;
    case "801":
      {
        const buff: Buff = {
          id: "801-ult-1",
          name: "攻擊力",
          type: 6,
          condition: Condition.ULTIMATE,
          duration: 100,
          _6: {
            affectType: AffectType.RAWATK,
            value:
              bond === 1
                ? 0.5
                : bond === 2
                  ? 0.55
                  : bond === 3
                    ? 0.6
                    : bond === 4
                      ? 0.65
                      : 0.7,
            target: Target.ALL,
            duration: 4,
            base: true,
          },
        };
        triggerPassive(buff, gameState, position);
      }

      gameState.characters.forEach((_, index) => {
        gameState.characters[index].buff = [
          ...gameState.characters[index].buff,
          {
            id: "801-ult-2",
            name: "攻擊力",
            type: 0,
            condition: Condition.NONE,
            duration: 4,
            _0: {
              affectType: AffectType.INCREASE_ULTIMATE_DAMAGE,
              value:
                bond === 1
                  ? 0.2
                  : bond === 2
                    ? 0.25
                    : bond === 3
                      ? 0.3
                      : bond === 4
                        ? 0.35
                        : 0.4,
            },
          },
        ];
      });

      break;
    case "802":
      gameState.characters.forEach((character, index) => {
        if (
          character.class === CharacterClass.ATTACKER ||
          character.class === CharacterClass.OBSTRUCTER
        ) {
          gameState.characters[index].buff = [
            ...gameState.characters[index].buff,
            {
              id: "802-ult-2",
              name: `必殺時，追加『以自身攻擊力${
                bond === 1 ? 65 : 75
              }對目標造成傷害』(1回合)`,
              type: 101,
              condition: Condition.ULTIMATE,
              duration: 1,
              _101: {
                value: bond === 1 ? 0.65 : 0.75,
                target: Target.ENEMY,
                damageType: 1,
                isTrigger: false,
              },
            },
            {
              id: "802-ult-2",
              name: "造成傷害增加(1回合)",
              type: 0,
              condition: Condition.NONE,
              duration: 1,
              _0: {
                affectType: AffectType.INCREASE_DMG,
                value:
                  bond === 1
                    ? 0.3
                    : bond === 2
                      ? 0.375
                      : bond === 3
                        ? 0.45
                        : bond === 4
                          ? 0.525
                          : 0.6,
              },
            },
          ];
        }
      });
      gameState.characters.forEach((_, index) => {
        parseCondition(index, [Condition.GET_HEAL], gameState);
      });
      break;
    case "804":
      gameState.enemies[gameState.targeting].buff = [
        ...gameState.enemies[gameState.targeting].buff,
        {
          id: "804-ult-1",
          name: "受到傷害增加(4回合)",
          type: 0,
          condition: Condition.NONE,
          duration: 4,
          _0: {
            affectType: AffectType.INCREASE_DMG_RECEIVED,
            value:
              bond === 1
                ? 0.3
                : bond === 2
                  ? 0.35
                  : bond === 3
                    ? 0.4
                    : bond === 4
                      ? 0.45
                      : 0.5,
          },
        },
      ];
      calcUltDamage(
        position,
        bond === 1
          ? 3.3
          : bond === 2
            ? 3.76
            : bond === 3
              ? 4.22
              : bond === 4
                ? 4.68
                : 5.14,
        gameState,
        false,
        Target.ENEMY,
        "ultimate",
      );
      // 自身獲得「普攻時，追加『以自身攻擊力15/15/22.5/22.5/30%對目標造成傷害』(4回合)」
      gameState.characters[position].buff = [
        ...gameState.characters[position].buff,
        {
          id: "804-ult-2",
          name: "普攻時，追加『以自身攻擊力15/15/22.5/22.5/30%對目標造成傷害』",
          type: 1,
          condition: Condition.BASIC_ATTACK,
          duration: 4,
          _1: {
            value:
              bond === 1
                ? 0.15
                : bond === 2
                  ? 0.15
                  : bond === 3
                    ? 0.225
                    : bond === 4
                      ? 0.225
                      : 0.3,
            isTrigger: false,
            target: Target.ENEMY,
            damageType: 0,
          },
        },
      ];

      break;
    case "805":
      // 使目標受到傷害增加20/25/30/35/40%(4回合)、使我方全體攻擊者、守護者、妨礙者獲得「普攻時，追加以自身攻擊力10/15/20/25/30%對目標造成傷害』(4回合)」、再使自身獲得「普攻時， 追加『以自身攻擊力20/30/40/50/60%對目標造成傷害』(4回合)」，CD:4
      gameState.enemies[gameState.targeting].buff = [
        ...gameState.enemies[gameState.targeting].buff,
        {
          id: "805-ult-1",
          name: "受到傷害增加(4回合)",
          type: 0,
          condition: Condition.NONE,
          duration: 4,
          _0: {
            affectType: AffectType.INCREASE_DMG_RECEIVED,
            value:
              bond === 1
                ? 0.2
                : bond === 2
                  ? 0.25
                  : bond === 3
                    ? 0.3
                    : bond === 4
                      ? 0.35
                      : 0.4,
          },
        },
      ];
      gameState.characters.forEach((character, index) => {
        if (
          character.class === CharacterClass.ATTACKER ||
          character.class === CharacterClass.OBSTRUCTER ||
          character.class === CharacterClass.PROTECTOR
        ) {
          gameState.characters[index].buff = [
            ...gameState.characters[index].buff,
            {
              id: "805-ult-2",
              name: `普攻時，追加『以自身攻擊力${
                bond === 1
                  ? 0.1
                  : bond === 2
                    ? 0.15
                    : bond === 3
                      ? 0.2
                      : bond === 4
                        ? 0.25
                        : 0.3
              }%對目標造成傷害』`,
              type: 101,
              condition: Condition.BASIC_ATTACK,
              duration: 4,
              _101: {
                value:
                  bond === 1
                    ? 0.1
                    : bond === 2
                      ? 0.15
                      : bond === 3
                        ? 0.2
                        : bond === 4
                          ? 0.25
                          : 0.3,
                isTrigger: false,
                target: Target.ENEMY,
                damageType: 0,
              },
            },
          ];
        }
      });

      gameState.characters[position].buff = [
        ...gameState.characters[position].buff,
        {
          id: "805-ult-3",
          name: "普攻時，追加『以自身攻擊力20/30/40/50/60%對目標造成傷害』",
          type: 101,
          condition: Condition.BASIC_ATTACK,
          duration: 4,
          _101: {
            value:
              bond === 1
                ? 0.2
                : bond === 2
                  ? 0.3
                  : bond === 3
                    ? 0.4
                    : bond === 4
                      ? 0.5
                      : 0.6,
            isTrigger: false,
            target: Target.ENEMY,
            damageType: 0,
          },
        },
      ];
      break;
  }
}
