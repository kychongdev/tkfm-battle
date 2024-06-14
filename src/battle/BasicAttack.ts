import { AffectType, type Buff, Condition, Target } from "../types/Skill";
import type { GameState } from "./GameState";
import {
  applyRawAttBuff,
  heal,
  parseCondition,
  triggerPassive,
} from "./calculate";
import { calcBasicDamage } from "./calcBasicDamage";
import { calcUltDamage } from "./calcUltDamage";

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
    case "172":
      {
        const attack = Math.floor(applyRawAttBuff(gameState, position) * 0.75);
        const buff: Buff = {
          id: "172-basic-1",
          name: "攻擊力",
          type: 12,
          condition: Condition.NONE,
          duration: 1,
          _12: {
            position: 1,
            applyBuff: {
              id: "172-basic-1",
              name: "攻擊力",
              type: 0,
              condition: Condition.NONE,
              duration: 1,
              _0: {
                value: attack,
                affectType: AffectType.RAWATK,
              },
            },
          },
        };
        triggerPassive(buff, gameState, position);
      }
      break;
    case "178":
      calcBasicDamage(position, 1, gameState, Target.ENEMY, "basic");
      break;
    case "179":
      calcBasicDamage(position, 1.25, gameState, Target.ENEMY, "basic");
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

      gameState.characters.forEach((_, index) => {
        parseCondition(index, [Condition.GET_HEAL], gameState);
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
    case "801":
      // 以自身攻擊力25給予我方全體護盾(1回合)、以自身最大HP30給予我方全體護盾(1回合)
      break;
    case "802":
      gameState.characters.forEach((character, index) => {
        parseCondition(index, [Condition.GET_HEAL], gameState);
      });
      break;
    case "804":
      calcBasicDamage(position, 1, gameState, Target.ENEMY, "basic");
      break;
    case "805":
      // 使自身攻擊力增加50%(1回合)、再以自身攻擊力70%對目標造成傷害
      gameState.characters[position].buff = [
        ...gameState.characters[position].buff,
        {
          id: "805-basic-1",
          name: "攻擊力",
          type: 0,
          condition: Condition.NONE,
          duration: 1,
          _0: {
            value: 0.5,
            affectType: AffectType.ATK,
          },
        },
      ];

      calcBasicDamage(position, 0.7, gameState, Target.ENEMY, "basic");
      break;
    case "806":
      calcBasicDamage(position, 1, gameState, Target.ENEMY, "basic");
      break;
    case "813":
      break;
  }
}
