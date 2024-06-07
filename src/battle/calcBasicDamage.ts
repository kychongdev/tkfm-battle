import { CharacterAttribute, CharacterClass } from "../types/Character";
import { AffectType, Target } from "../types/Skill";
import type { GameState } from "./GameState";
import { formatNumber, parseAttribute } from "./utilities";

export function calcBasicDamage(
  position: number,
  value: number,
  gameState: GameState,
  target: Target,
) {
  const atk = gameState.characters[position].atk;
  let rawAtk = 0;
  let atkPercentage = 1;
  let basicBuff = 1;
  let increaseDamage = 1;
  let enemyDamageReceivedIncrease = 1;
  let attributeDamage = 1;
  const charClass = gameState.characters[position].class;
  const attribute = gameState.characters[position].attribute;
  //TODO: reduce attribute effect
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

    if (buff.type === 3 && buff._3?.affectType === AffectType.ATK) {
      atkPercentage += buff._3?.value * buff._3?.stack;
    }
    if (buff.type === 3 && buff._3?.affectType === AffectType.DECREASE_ATK) {
      atkPercentage -= buff._3?.value * buff._3?.stack;
    }

    if (buff.type === 0 && buff._0?.affectType === AffectType.RAWATK) {
      rawAtk += buff._0?.value;
    }

    if (
      buff.type === 0 &&
      buff._0?.affectType === AffectType.INCREASE_BASIC_DAMAGE
    ) {
      basicBuff += buff._0?.value;
    }
    if (
      buff.type === 0 &&
      buff._0?.affectType === AffectType.DECREASE_BASIC_DAMAGE
    ) {
      basicBuff -= buff._0?.value;
    }

    if (
      buff.type === 0 &&
      buff._3?.affectType === AffectType.INCREASE_BASIC_DAMAGE
    ) {
      basicBuff += buff._3?.value * buff._3?.stack;
    }
    if (
      buff.type === 3 &&
      buff._3?.affectType === AffectType.DECREASE_BASIC_DAMAGE
    ) {
      basicBuff += buff._3?.value * buff._3?.stack;
    }

    if (buff.type === 0 && buff._0?.affectType === AffectType.INCREASE_DMG) {
      increaseDamage += buff._0?.value;
    }
    if (buff.type === 0 && buff._0?.affectType === AffectType.DECREASE_DMG) {
      increaseDamage -= buff._0?.value;
    }

    if (buff.type === 3 && buff._3?.affectType === AffectType.INCREASE_DMG) {
      increaseDamage += buff._3?.value * buff._3?.stack;
    }
    if (buff.type === 3 && buff._3?.affectType === AffectType.DECREASE_DMG) {
      increaseDamage -= buff._3?.value * buff._3?.stack;
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

    if (
      buff.type === 3 &&
      buff._3?.affectType === AffectType.INCREASE_DARK_DMG &&
      attribute === CharacterAttribute.DARK
    ) {
      attributeDamage += buff._3?.value;
    }
    if (
      buff.type === 3 &&
      buff._3?.affectType === AffectType.INCREASE_FIRE_DMG &&
      attribute === CharacterAttribute.FIRE
    ) {
      attributeDamage += buff._3?.value;
    }
    if (
      buff.type === 3 &&
      buff._3?.affectType === AffectType.INCREASE_WATER_DMG &&
      attribute === CharacterAttribute.WATER
    ) {
      attributeDamage += buff._3?.value;
    }
    if (
      buff.type === 3 &&
      buff._3?.affectType === AffectType.INCREASE_WIND_DMG &&
      attribute === CharacterAttribute.WIND
    ) {
      attributeDamage += buff._3?.value;
    }
    if (
      buff.type === 3 &&
      buff._3?.affectType === AffectType.INCREASE_LIGHT_DMG &&
      attribute === CharacterAttribute.LIGHT
    ) {
      attributeDamage += buff._3?.value;
    }

    if (
      buff.type === 3 &&
      buff._3?.affectType === AffectType.DECREASE_DARK_DMG &&
      attribute === CharacterAttribute.DARK
    ) {
      attributeDamage -= buff._3?.value * buff._3?.stack;
    }
    if (
      buff.type === 3 &&
      buff._3?.affectType === AffectType.DECREASE_FIRE_DMG &&
      attribute === CharacterAttribute.FIRE
    ) {
      attributeDamage -= buff._3?.value * buff._3?.stack;
    }
    if (
      buff.type === 3 &&
      buff._3?.affectType === AffectType.DECREASE_WATER_DMG &&
      attribute === CharacterAttribute.WATER
    ) {
      attributeDamage -= buff._3?.value * buff._3?.stack;
    }
    if (
      buff.type === 3 &&
      buff._3?.affectType === AffectType.DECREASE_WIND_DMG &&
      attribute === CharacterAttribute.WIND
    ) {
      attributeDamage -= buff._3?.value * buff._3?.stack;
    }
    if (
      buff.type === 3 &&
      buff._3?.affectType === AffectType.DECREASE_LIGHT_DMG &&
      attribute === CharacterAttribute.LIGHT
    ) {
      attributeDamage -= buff._3?.value * buff._3?.stack;
    }

    if (
      buff.type === 0 &&
      buff._0?.affectType === AffectType.DECREASE_LIGHT_DMG &&
      attribute === CharacterAttribute.LIGHT
    ) {
      attributeDamage -= buff._0?.value;
    }
    if (
      buff.type === 0 &&
      buff._0?.affectType === AffectType.DECREASE_DARK_DMG &&
      attribute === CharacterAttribute.DARK
    ) {
      attributeDamage -= buff._0?.value;
    }
    if (
      buff.type === 0 &&
      buff._0?.affectType === AffectType.DECREASE_FIRE_DMG &&
      attribute === CharacterAttribute.FIRE
    ) {
      attributeDamage -= buff._0?.value;
    }
    if (
      buff.type === 0 &&
      buff._0?.affectType === AffectType.DECREASE_WATER_DMG &&
      attribute === CharacterAttribute.WATER
    ) {
      attributeDamage -= buff._0?.value;
    }
    if (
      buff.type === 0 &&
      buff._0?.affectType === AffectType.DECREASE_WIND_DMG &&
      attribute === CharacterAttribute.WIND
    ) {
      attributeDamage -= buff._0?.value;
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
      enemyDamageReceivedIncrease += buff._3?.value * buff._3?.stack;
    }

    if (
      buff.type === 0 &&
      buff._0?.affectType === AffectType.INCREASE_LIGHT_DMG_RECEIVED &&
      attribute === CharacterAttribute.LIGHT
    ) {
      attributeDamage += buff._0?.value;
    }
    if (
      buff.type === 0 &&
      buff._0?.affectType === AffectType.INCREASE_DARK_DMG_RECEIVED &&
      attribute === CharacterAttribute.DARK
    ) {
      attributeDamage += buff._0?.value;
    }
    if (
      buff.type === 0 &&
      buff._0?.affectType === AffectType.INCREASE_FIRE_DMG_RECEIVED &&
      attribute === CharacterAttribute.FIRE
    ) {
      attributeDamage += buff._0?.value;
    }
    if (
      buff.type === 0 &&
      buff._0?.affectType === AffectType.INCREASE_WATER_DMG_RECEIVED &&
      attribute === CharacterAttribute.WATER
    ) {
      attributeDamage += buff._0?.value;
    }
    if (
      buff.type === 0 &&
      buff._0?.affectType === AffectType.INCREASE_WIND_DMG_RECEIVED &&
      attribute === CharacterAttribute.WIND
    ) {
      attributeDamage += buff._0?.value;
    }
    if (
      buff.type === 0 &&
      buff._0?.affectType === AffectType.DECREASE_WIND_DMG_RECEIVED &&
      attribute === CharacterAttribute.WIND
    ) {
      attributeDamage -= buff._0?.value;
    }
    if (
      buff.type === 0 &&
      buff._0?.affectType === AffectType.DECREASE_LIGHT_DMG_RECEIVED &&
      attribute === CharacterAttribute.LIGHT
    ) {
      attributeDamage -= buff._0?.value;
    }
    if (
      buff.type === 0 &&
      buff._0?.affectType === AffectType.DECREASE_DARK_DMG_RECEIVED &&
      attribute === CharacterAttribute.DARK
    ) {
      attributeDamage -= buff._0?.value;
    }
    if (
      buff.type === 0 &&
      buff._0?.affectType === AffectType.DECREASE_FIRE_DMG_RECEIVED &&
      attribute === CharacterAttribute.FIRE
    ) {
      attributeDamage -= buff._0?.value;
    }
    if (
      buff.type === 0 &&
      buff._0?.affectType === AffectType.DECREASE_WATER_DMG_RECEIVED &&
      attribute === CharacterAttribute.WATER
    ) {
      attributeDamage -= buff._0?.value;
    }
    if (
      buff.type === 3 &&
      buff._3?.affectType === AffectType.INCREASE_LIGHT_DMG_RECEIVED &&
      attribute === CharacterAttribute.LIGHT
    ) {
      attributeDamage += buff._3?.value * buff._3?.stack;
    }
    if (
      buff.type === 3 &&
      buff._3?.affectType === AffectType.INCREASE_DARK_DMG_RECEIVED &&
      attribute === CharacterAttribute.DARK
    ) {
      attributeDamage += buff._3?.value * buff._3?.stack;
    }
    if (
      buff.type === 3 &&
      buff._3?.affectType === AffectType.INCREASE_FIRE_DMG_RECEIVED &&
      attribute === CharacterAttribute.FIRE
    ) {
      attributeDamage += buff._3?.value * buff._3?.stack;
    }
    if (
      buff.type === 3 &&
      buff._3?.affectType === AffectType.INCREASE_WATER_DMG_RECEIVED &&
      attribute === CharacterAttribute.WATER
    ) {
      attributeDamage += buff._3?.value * buff._3?.stack;
    }
    if (
      buff.type === 3 &&
      buff._3?.affectType === AffectType.INCREASE_WIND_DMG_RECEIVED &&
      attribute === CharacterAttribute.WIND
    ) {
      attributeDamage += buff._3?.value * buff._3?.stack;
    }
    if (
      buff.type === 3 &&
      buff._3?.affectType === AffectType.DECREASE_WIND_DMG_RECEIVED &&
      attribute === CharacterAttribute.WIND
    ) {
      attributeDamage -= buff._3?.value * buff._3?.stack;
    }
    if (
      buff.type === 3 &&
      buff._3?.affectType === AffectType.DECREASE_LIGHT_DMG_RECEIVED &&
      attribute === CharacterAttribute.LIGHT
    ) {
      attributeDamage -= buff._3?.value * buff._3?.stack;
    }
    if (
      buff.type === 3 &&
      buff._3?.affectType === AffectType.DECREASE_DARK_DMG_RECEIVED &&
      attribute === CharacterAttribute.DARK
    ) {
      attributeDamage -= buff._3?.value * buff._3?.stack;
    }
    if (
      buff.type === 3 &&
      buff._3?.affectType === AffectType.DECREASE_FIRE_DMG_RECEIVED &&
      attribute === CharacterAttribute.FIRE
    ) {
      attributeDamage -= buff._3?.value * buff._3?.stack;
    }
    if (
      buff.type === 3 &&
      buff._3?.affectType === AffectType.DECREASE_WATER_DMG_RECEIVED &&
      attribute === CharacterAttribute.WATER
    ) {
      attributeDamage -= buff._3?.value * buff._3?.stack;
    }

    if (
      buff.type === 3 &&
      buff._3?.affectType === AffectType.INCREASE_BASIC_DAMAGE_RECEIVED
    ) {
      basicBuff += buff._3?.value * buff._3?.stack;
    }

    if (
      buff.type === 3 &&
      buff._3?.affectType === AffectType.DECREASE_BASIC_DAMAGE_RECEIVED
    ) {
      basicBuff -= buff._3?.value * buff._3?.stack;
    }

    if (
      buff.type === 3 &&
      buff._3?.affectType === AffectType.INCREASE_ATTACKER_DAMAGE_RECEIVED &&
      charClass === CharacterClass.ATTACKER
    ) {
      basicBuff += buff._3?.value * buff._3?.stack;
    }
  }
  if (basicBuff < 0) {
    basicBuff = 0;
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

  const res = Math.floor(
    (atk * atkPercentage + rawAtk) *
      basicBuff *
      increaseDamage *
      enemyDamageReceivedIncrease *
      attributeDamage *
      attributeNum *
      value,
  );
  dealBasicDamageToTarget(gameState, position, res, target);
}

function dealBasicDamageToTarget(
  gameState: GameState,
  position: number,
  damage: number,
  target: Target,
) {
  switch (target) {
    case Target.ENEMY:
      {
        const character = gameState.characters[position];
        gameState.enemies[gameState.targeting].hp -= damage;
        gameState.log.push(
          `${character.name}對敵人造成了${formatNumber(
            damage,
          )}點傷害 (普攻傷害)`,
        );
      }
      break;
  }
}
