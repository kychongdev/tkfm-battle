import { AffectType, BuffType } from "../types/Skill";
import { GameState } from "./GameState";

export function CalculateDamage(
  position: number,
  attackPercentage: number,
  gameState: GameState,
) {
  let characterAtk = gameState.characters[position].initAtk;
  gameState.characters[position].buff.forEach((buff) => {
    if (buff.type === BuffType.BUFF && buff.affect === AffectType.ATK) {
      characterAtk += characterAtk * buff.value;
    }
  });

  // const characterAtk = gameState.characters[position].initAtk
  // return damage;
}
