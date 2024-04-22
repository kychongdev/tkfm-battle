import { AffectType, BuffType } from "../types/Skill";
import { GameState } from "./GameState";

export function calculateDamage(
  position: number,
  attackPercentage: number,
  gameState: GameState,
) {
  let characterAtk = gameState.characters[position].initAtk;
  gameState.characters[position].buff.forEach((buff) => {
    if (buff.type === BuffType.BUFF && buff.affect === AffectType.ATK) {
      characterAtk += characterAtk * (1 + buff.value);
    }
  });
  const damage = characterAtk * attackPercentage;
  return Math.floor(damage);
}
