import { CharacterAttribute } from "../types/Character";
import { AffectType } from "../types/Skill";
import type { GameState } from "./GameState";
import { parseAttribute } from "./utilities";

export function calcUltDamage(
  position: number,
  value: number,
  gameState: GameState,
  isTrigger: boolean,
) {
  const atk = gameState.characters[position].atk;
  let rawAtk = 0;
  let atkPercentage = 1;
  let ultBuff = 1;
  let increaseDamage = 1;
  let enemyDamageReceivedIncrease = 1;
  let attributeDamage = 1;
  const attribute = gameState.characters[position].attribute;
  const attributeNum = parseAttribute(
    attribute,
    gameState.enemies[gameState.targeting].attribute,
  );

  for (const buff of gameState.characters[position].buff) {
    if (buff.type === 0 && buff._0?.affectType === AffectType.ATK) {
      atkPercentage += buff._0?.value;
    }
    if (buff.type === 0 && buff._0?.affectType === AffectType.DECREASE_ATK) {
      atkPercentage -= buff._0?.value;
    }
    if (buff.type === 0 && buff._0?.affectType === AffectType.RAWATK) {
      rawAtk += buff._0?.value;
    }
    if (
      buff.type === 0 &&
      buff._0?.affectType === AffectType.INCREASE_ULTIMATE_DAMAGE
    ) {
      ultBuff += buff._0?.value;
    }
    if (
      buff.type === 0 &&
      buff._0?.affectType === AffectType.DECREASE_ULTIMATE_DAMAGE
    ) {
      ultBuff -= buff._0?.value;
    }
    if (buff.type === 0 && buff._0?.affectType === AffectType.INCREASE_DMG) {
      increaseDamage += buff._0?.value;
    }
    if (buff.type === 0 && buff._0?.affectType === AffectType.DECREASE_DMG) {
      increaseDamage -= buff._0?.value;
    }
    if (
      buff.type === 0 &&
      buff._0?.affectType === AffectType.INCREASE_FIRE_DMG &&
      attribute === CharacterAttribute.FIRE
    ) {
      attributeDamage += buff._0?.value;
    }
    if (
      buff.type === 0 &&
      buff._0?.affectType === AffectType.INCREASE_WATER_DMG &&
      attribute === CharacterAttribute.WATER
    ) {
      attributeDamage += buff._0?.value;
    }
    if (
      buff.type === 0 &&
      buff._0?.affectType === AffectType.INCREASE_WIND_DMG &&
      attribute === CharacterAttribute.WIND
    ) {
      attributeDamage += buff._0?.value;
    }
    if (
      buff.type === 0 &&
      buff._0?.affectType === AffectType.INCREASE_LIGHT_DMG &&
      attribute === CharacterAttribute.LIGHT
    ) {
      attributeDamage += buff._0?.value;
    }
    if (
      buff.type === 0 &&
      buff._0?.affectType === AffectType.INCREASE_DARK_DMG &&
      attribute === CharacterAttribute.DARK
    ) {
      attributeDamage += buff._0?.value;
    }
  }

  for (const buff of gameState.enemies[gameState.targeting].buff) {
    if (
      buff.type === 0 &&
      buff._0?.affectType === AffectType.INCREASE_DMG_RECEIVED
    ) {
      enemyDamageReceivedIncrease += buff._0?.value;
    }
    if (
      buff.type === 3 &&
      buff._3?.value &&
      buff._3?.affectType === AffectType.INCREASE_DMG_RECEIVED
    ) {
      enemyDamageReceivedIncrease += buff._3?.value * buff._3?.stack;
    }
    if (
      buff.type === 0 &&
      buff._0?.affectType === AffectType.DECREASE_DMG_RECEIVED
    ) {
      enemyDamageReceivedIncrease += buff._0?.value;
    }
    if (
      buff.type === 3 &&
      buff._3?.value &&
      buff._3?.affectType === AffectType.DECREASE_DMG_RECEIVED
    ) {
      enemyDamageReceivedIncrease += buff._3?.value;
    }
  }
  if (ultBuff < 0) {
    ultBuff = 0;
  }
  if (increaseDamage < 0) {
    increaseDamage = 0;
  }
  if (enemyDamageReceivedIncrease < 0) {
    enemyDamageReceivedIncrease = 0;
  }
  if (attributeDamage < 0) {
    attributeDamage = 0;
  }

  if (isTrigger) {
    for (const buff of gameState.characters[position].buff) {
      if (
        buff.type === 0 &&
        buff._0?.affectType === AffectType.INCREASE_TRIGGER_DAMAGE
      ) {
        ultBuff += buff._0?.value;
      }
      if (
        buff.type === 0 &&
        buff._0?.affectType === AffectType.DECREASE_TRIGGER_DAMAGE
      ) {
        ultBuff -= buff._0?.value;
      }
    }
    for (const buff of gameState.enemies[gameState.targeting].buff) {
      if (
        buff.type === 0 &&
        buff._0?.affectType === AffectType.INCREASE_TRIGGER_DAMAGE_RECEIVED
      ) {
        ultBuff += buff._0?.value;
      }
      if (
        buff.type === 3 &&
        buff._3?.value &&
        buff._3?.affectType === AffectType.DECREASE_TRIGGER_DAMAGE_RECEIVED
      ) {
        ultBuff -= buff._3?.value;
      }
    }

    return Math.floor(
      (Math.floor(atk * atkPercentage) + rawAtk) *
        ultBuff *
        increaseDamage *
        enemyDamageReceivedIncrease *
        attributeDamage *
        attributeNum *
        value,
    );
  }
  console.log(
    atk,
    ultBuff,
    increaseDamage,
    enemyDamageReceivedIncrease,
    attributeDamage,
    attributeNum,
    value,
  );

  const res = Math.floor(
    (Math.floor(atk * atkPercentage) + rawAtk) *
      ultBuff *
      increaseDamage *
      enemyDamageReceivedIncrease *
      attributeDamage *
      attributeNum *
      value,
  );
  return res;
}
