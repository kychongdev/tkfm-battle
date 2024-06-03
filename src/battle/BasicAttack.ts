import { AffectType, Condition, Target } from "../types/Skill";
import type { GameState } from "./GameState";
import { applyRawAttBuff, heal } from "./calculate";
import { calcBasicDamage } from "./calcBasicDamage";

export function basicAttack(
  id: string,
  position: number,
  gameState: GameState,
) {
  switch (id) {
    case "196":
      gameState.characters.forEach((character) => {
        const attack = Math.ceil(applyRawAttBuff(gameState, position) * 0.3);
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
      break;
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
    case "523":
      gameState.enemies[gameState.targeting].hp -= calcBasicDamage(
        position,
        1,
        gameState,
      );
      break;
    case "528":
      gameState.enemies[gameState.targeting].hp -= calcBasicDamage(
        position,
        1,
        gameState,
      );
      break;
  }
}
