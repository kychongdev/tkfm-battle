import type { GameState } from "./GameState";
import { calcBasicDamage } from "./calculate";

export function basicAttack(
  id: string,
  position: number,
  gameState: GameState,
) {
  switch (id) {
    case "514":
      gameState.enemy.hp -= calcBasicDamage(position, 1, gameState);
      break;
    case "532":
      break;
  }
}
