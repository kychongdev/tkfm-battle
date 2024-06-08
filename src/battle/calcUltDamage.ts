import { CharacterAttribute, CharacterClass } from "../types/Character";
import { AffectType, Target } from "../types/Skill";
import type { GameState, IDamageLog } from "./GameState";
import { formatNumber, parseAttribute } from "./utilities";

export function calcUltDamage(
  position: number,
  value: number,
  gameState: GameState,
  isTrigger: boolean,
  target: Target,
  type?: "ultimate",
) {
  const atk = gameState.characters[position].atk;
  let rawAtk = 0;
  let atkPercentage = 1;
  let ultBuff = 1;
  let increaseDamage = 1;
  let enemyDamageReceivedIncrease = 1;
  const charClass = gameState.characters[position].class;
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
    if (
      buff.type === 3 &&
      buff._3?.affectType === AffectType.INCREASE_ULTIMATE_DAMAGE
    ) {
      ultBuff += buff._3?.value * buff._3?.stack;
    }
    if (
      buff.type === 3 &&
      buff._3?.affectType === AffectType.DECREASE_ULTIMATE_DAMAGE
    ) {
      ultBuff -= buff._3?.value * buff._3?.stack;
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
    if (
      buff.type === 3 &&
      buff._3?.affectType === AffectType.INCREASE_LIGHT_DMG &&
      attribute === CharacterAttribute.LIGHT
    ) {
      attributeDamage += buff._3?.value * buff._3?.stack;
    }
    if (
      buff.type === 3 &&
      buff._3?.affectType === AffectType.INCREASE_DARK_DMG &&
      attribute === CharacterAttribute.DARK
    ) {
      attributeDamage += buff._3?.value * buff._3?.stack;
    }
    if (
      buff.type === 3 &&
      buff._3?.affectType === AffectType.INCREASE_FIRE_DMG &&
      attribute === CharacterAttribute.FIRE
    ) {
      attributeDamage += buff._3?.value * buff._3?.stack;
    }
    if (
      buff.type === 3 &&
      buff._3?.affectType === AffectType.INCREASE_WATER_DMG &&
      attribute === CharacterAttribute.WATER
    ) {
      attributeDamage += buff._3?.value * buff._3?.stack;
    }
    if (
      buff.type === 3 &&
      buff._3?.affectType === AffectType.INCREASE_WIND_DMG &&
      attribute === CharacterAttribute.WIND
    ) {
      attributeDamage += buff._3?.value * buff._3?.stack;
    }
    if (
      buff.type === 3 &&
      buff._3?.affectType === AffectType.DECREASE_LIGHT_DMG &&
      attribute === CharacterAttribute.LIGHT
    ) {
      attributeDamage -= buff._3?.value * buff._3?.stack;
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
      buff._0?.affectType === AffectType.INCREASE_ULTIMATE_DAMAGE_RECEIVED
    ) {
      ultBuff += buff._0?.value;
    }
    if (
      buff.type === 0 &&
      buff._0?.affectType === AffectType.DECREASE_ULTIMATE_DAMAGE_RECEIVED
    ) {
      ultBuff -= buff._0?.value;
    }
    if (
      buff.type === 3 &&
      buff._3?.affectType === AffectType.INCREASE_ULTIMATE_DAMAGE_RECEIVED
    ) {
      ultBuff += buff._3?.value * buff._3?.stack;
    }
    if (
      buff.type === 3 &&
      buff._3?.affectType === AffectType.DECREASE_ULTIMATE_DAMAGE_RECEIVED
    ) {
      ultBuff -= buff._3?.value * buff._3?.stack;
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
      buff._3?.affectType === AffectType.DECREASE_WIND_DMG_RECEIVED &&
      attribute === CharacterAttribute.WIND
    ) {
      attributeDamage -= buff._3?.value * buff._3?.stack;
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
      buff.type === 0 &&
      buff._0?.affectType === AffectType.DECREASE_WIND_DMG_RECEIVED &&
      attribute === CharacterAttribute.WIND
    ) {
      attributeDamage -= buff._0?.value;
    }

    //TODO: Add more stuff on class buff
    if (
      buff.type === 3 &&
      buff._3?.affectType === AffectType.INCREASE_ATTACKER_DAMAGE_RECEIVED &&
      charClass === CharacterClass.ATTACKER
    ) {
      ultBuff += buff._3?.value * buff._3?.stack;
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
      if (
        buff.type === 3 &&
        buff._3?.affectType === AffectType.INCREASE_TRIGGER_DAMAGE
      ) {
        ultBuff += buff._3?.value * buff._3?.stack;
      }
      if (
        buff.type === 3 &&
        buff._3?.affectType === AffectType.DECREASE_TRIGGER_DAMAGE
      ) {
        ultBuff -= buff._3?.value * buff._3?.stack;
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
        buff.type === 0 &&
        buff._0?.affectType === AffectType.DECREASE_TRIGGER_DAMAGE_RECEIVED
      ) {
        ultBuff -= buff._0?.value;
      }
      if (
        buff.type === 3 &&
        buff._3?.value &&
        buff._3?.affectType === AffectType.INCREASE_TRIGGER_DAMAGE_RECEIVED
      ) {
        ultBuff += buff._3?.value * buff._3?.stack;
      }
      if (
        buff.type === 3 &&
        buff._3?.value &&
        buff._3?.affectType === AffectType.DECREASE_TRIGGER_DAMAGE_RECEIVED
      ) {
        ultBuff -= buff._3?.value * buff._3?.stack;
      }
    }

    const res = Math.floor(
      (Math.floor(atk * atkPercentage) + rawAtk) *
        ultBuff *
        increaseDamage *
        enemyDamageReceivedIncrease *
        attributeDamage *
        attributeNum *
        value,
    );
    dealDamageToTarget(gameState, position, res, target, isTrigger);
    return;
  }

  const res = Math.floor(
    (Math.floor(atk * atkPercentage) + rawAtk) *
      ultBuff *
      increaseDamage *
      enemyDamageReceivedIncrease *
      attributeDamage *
      attributeNum *
      value,
  );
  dealDamageToTarget(
    gameState,
    position,
    res,
    target,
    isTrigger,
    type ? type : "none",
  );
}

function dealDamageToTarget(
  gameState: GameState,
  position: number,
  damage: number,
  target: Target,
  isTrigger: boolean,
  type: "ultimate" | "basic" | "none",
) {
  switch (target) {
    case Target.ENEMY:
      {
        const character = gameState.characters[position];
        gameState.enemies[gameState.targeting].hp -= damage;
        writeToSpecificLog(gameState, position, {
          damage,
          type: isTrigger ? "trigger" : "ultimate",
          turn: gameState.turns,
          position: gameState.targeting,
          source: type,
        });
        gameState.log.push(
          `${character.name}對敵${gameState.targeting + 1}造成${formatNumber(
            damage,
          )}(${isTrigger ? "觸" : "必"}傷)`,
        );
      }
      break;
  }
}

function writeToSpecificLog(
  gameState: GameState,
  position: number,
  content: IDamageLog,
) {
  switch (position) {
    case 0:
      gameState.damageLog.push(content);
      break;
    case 1:
      gameState.damageLog1.push(content);
      break;
    case 2:
      gameState.damageLog2.push(content);
      break;
    case 3:
      gameState.damageLog3.push(content);
      break;
    case 4:
      gameState.damageLog4.push(content);
      break;
  }
}
