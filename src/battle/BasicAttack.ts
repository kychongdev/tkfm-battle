import { Target } from "../types/Skill";
import type { GameState } from "./GameState";
import { calcBasicDamage, heal } from "./calculate";

export function basicAttack(
  id: string,
  position: number,
  gameState: GameState,
) {
  switch (id) {
    case "514":
      gameState.enemies[gameState.targeting].hp -= calcBasicDamage(
        position,
        1,
        gameState,
      );
      break;
    case "518":
      heal(position, 0.75, gameState, true, Target.ALL);
      break;
    case "532":
      break;
  }
}
