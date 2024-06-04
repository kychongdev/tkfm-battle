import type { GameState } from "./GameState";
import { formatNumber } from "./utilities";

export function damageLog(
  gameState: GameState,
  position: number,
  damage: number,
) {
  const character = gameState.characters[position];
  gameState.log.push(
    `${character.name}對敵人造成了${formatNumber(damage)}點傷害`,
  );
}
