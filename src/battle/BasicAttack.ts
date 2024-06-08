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
    case "163":
      gameState.characters.forEach((character) => {
        const attack = Math.floor(applyRawAttBuff(gameState, position) * 0.3);
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
    case "179":
      calcBasicDamage(position, 1.25, gameState, Target.ENEMY);
      break;
    case "196":
      gameState.characters.forEach((character) => {
        const attack = Math.floor(applyRawAttBuff(gameState, position) * 0.3);
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
    case "198":
      calcBasicDamage(position, 1, gameState, Target.ENEMY, "basic");
      break;
    case "508":
      gameState.characters.forEach((character, index) => {
        const attack = Math.floor(applyRawAttBuff(gameState, position) * 0.2);
        if (index !== position) {
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
        }
      });
      break;
    case "514":
      calcBasicDamage(position, 1, gameState, Target.ENEMY, "basic");
      break;
    case "517":
      calcBasicDamage(position, 1, gameState, Target.ENEMY, "basic");
      break;
    case "518":
      heal(position, 0.75, gameState, true, Target.ALL);
      break;
    case "523":
      calcBasicDamage(position, 1, gameState, Target.ENEMY, "basic");
      break;
    case "526":
      gameState.characters.forEach((character) => {
        const attack = Math.floor(applyRawAttBuff(gameState, position) * 0.3);
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
    case "528":
      calcBasicDamage(position, 1, gameState, Target.ENEMY, "basic");
      break;
    case "601":
      calcBasicDamage(position, 1.25, gameState, Target.ENEMY, "basic");
      break;
  }
}
