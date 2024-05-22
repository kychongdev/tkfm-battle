// // import { AffectType, BuffType, Condition, Target } from "../types/Skill";
// import { AffectType, BuffType, Condition, Target } from "../types/Skill";
// import { calculateUltimateDamage, parseCondition } from "./Calculate";
import { CharacterClass } from "../types/Character";
import { AffectType, Condition } from "../types/Skill";
import { applyRawAttBuff } from "./calculate";
import { GameState } from "./GameState";

export function activateUltimate(position: number, gameState: GameState) {
  const bond = gameState.characters[position].bond;
  switch (gameState.characters[position].id) {
    case "525":
      gameState.characters[position].buff = [
        ...gameState.characters[position].buff,
        {
          // 使自身攻擊力增加200/200/250/250/300%(1回合)，以自身攻擊力25/30/35/40/45%使自身攻擊力增加(1回合)，再以自身攻擊力25%使我方攻擊者、妨礙者攻擊力增加(1回合)，CD:3
          id: "525-ult-1",
          name: "使自身攻擊力增加200%(1回合)",
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
            value:
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
                value: applyRawAttBuff(gameState, position) * 0.25,
              },
            },
          ];
        }
      });
  }
}
