import { CharacterClass } from "../types/Character";
import { Condition, Target } from "../types/Skill";
import type { GameState } from "./GameState";

export function applyExtra(gameState: GameState, position: number) {
  const bond = gameState.characters[position].bond;
  switch (gameState.characters[position].id) {
    case "523":
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
    default:
      break;
  }
}
