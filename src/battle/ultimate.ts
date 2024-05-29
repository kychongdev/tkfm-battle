import { CharacterClass } from "../types/Character";
import { AffectType, Condition, Target } from "../types/Skill";
import { applyRawAttBuff, calcUltDamage } from "./calculate";
import type { GameState } from "./GameState";

export function activateUltimate(position: number, gameState: GameState) {
  const bond = gameState.characters[position].bond;
  switch (gameState.characters[position].id) {
    // 杏仁咪嚕
    case "523":
      gameState.characters.forEach((_, index) => {
        gameState.characters[index].buff = [
          ...gameState.characters[index].buff,
          {
            id: "523-ult-1",
            name: "造成觸發技效果增加100%(4回合)",
            type: 0,
            condition: Condition.NONE,
            duration: 4,
            _0: {
              affectType: AffectType.INCREASE_TRIGGER_DAMAGE,
              value:
                bond === 1
                  ? 1
                  : bond === 2
                    ? 1
                    : bond === 3
                      ? 1
                      : bond === 4
                        ? 1
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
        gameState.enemy.hp -= calcUltDamage(
          position,
          ultPercentage,
          gameState,
          false,
        );
      }
      gameState.characters.forEach((character, index) => {
        if (
          character.class === CharacterClass.ATTACKER ||
          character.class === CharacterClass.OBSTRUCTER
        ) {
          gameState.characters[index].buff = [
            ...gameState.characters[index].buff,
            {
              id: "523-ult-2",
              name: "攻擊時，觸發『以自身攻擊力59%對目標造成傷害』(3回合)",
              type: 1,
              condition: Condition.ATTACK,
              duration: 3,
              _1: {
                value:
                  bond === 1
                    ? 0.33
                    : bond === 2
                      ? 0.39
                      : bond === 3
                        ? 0.46
                        : bond === 4
                          ? 0.52
                          : 0.59,
                isTrigger: true,
                target: Target.ENEMY,
                damageType: 1,
              },
            },
          ];
        }
      });

      break;
    case "525":
      gameState.characters[position].buff = [
        ...gameState.characters[position].buff,
        {
          // 使自身攻擊力增加200/200/250/250/300%(1回合)，以自身攻擊力25/30/35/40/45%使自身攻擊力增加(1回合)，再以自身攻擊力25%使我方攻擊者、妨礙者攻擊力增加(1回合)，CD:3
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
            value: Math.ceil(
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
                value: Math.ceil(applyRawAttBuff(gameState, position) * 0.25),
              },
            },
          ];
        }
      });
      break;
    case "526":
      // 使目標受到傷害增加30/30/40/40/45%(4回合)、使目標受到傷害增加0/10/10/20/20%(最多1層)、使我方全體必殺技傷害增加10/15/20/25/30%(4回合)，CD:4
      gameState.enemy.buff = [
        ...gameState.enemy.buff,
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
      // export interface _3 {
      //   id: string;
      //   name: string;
      //   stack: number;
      //   maxStack: number;
      //   affectType: AffectType;
      //   value?: number;

      if (bond > 1) {
        const stack = gameState.enemy.buff.find(
          (buff) => buff.id === "526-ult-2",
        )?._3?.stack;
        if (stack !== 1 || !stack) {
          gameState.enemy.buff = [
            ...gameState.enemy.buff,
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
              affectType: AffectType.ULTIMATE_DAMAGE,
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
  }
}
