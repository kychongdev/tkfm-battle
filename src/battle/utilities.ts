import { CharacterAttribute } from "../types/Character";
import { AffectType, type Buff } from "../types/Skill";

export function formatNumber(number: number) {
  //format number to have commas
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function parseSkillName(buff: Buff) {
  if (buff.type === 0) {
    switch (buff._0?.affectType) {
      case AffectType.RAWATK:
        return `攻擊增加${formatNumber(buff._0.value)}`;
      case AffectType.INCREASE_FIRE_DMG_RECEIVED:
        return `受到火屬性攻擊增加${buff._0.value * 100}%`;
      case AffectType.INCREASE_WATER_DMG_RECEIVED:
        return `受到水屬性攻擊增加${buff._0.value * 100}%`;
      case AffectType.INCREASE_WIND_DMG_RECEIVED:
        return `受到風屬性攻擊增加${buff._0.value * 100}%`;
      case AffectType.INCREASE_LIGHT_DMG_RECEIVED:
        return `受到光屬性攻擊增加${buff._0.value * 100}%`;
      case AffectType.INCREASE_DARK_DMG_RECEIVED:
        return `受到暗屬性攻擊增加${buff._0.value * 100}%`;
      case AffectType.ATK:
        return `攻擊增加${buff._0.value * 100}%`;
      case AffectType.MAXHP:
        return `最大HP增加${buff._0.value * 100}%`;
      case AffectType.INCREASE_DMG:
        return `造成傷害增加${buff._0.value * 100}%`;
      case AffectType.INCREASE_BASIC_DAMAGE:
        return `普攻傷害增加${buff._0.value * 100}%`;
      case AffectType.INCREASE_ULTIMATE_DAMAGE:
        return `必殺技傷害增加${buff._0.value * 100}%`;
      case AffectType.INCREASE_DMG_RECEIVED:
        return `受到傷害增加${buff._0.value * 100}%`;
      case AffectType.INCREASE_ULTIMATE_DAMAGE_RECEIVED:
        return `受到必殺技傷害增加${buff._0.value * 100}%`;
      case AffectType.REDUCE_ATTRIBUTE_EFFECT:
        return `屬性相剋傷害減少${buff._0.value * 100}%`;
    }

    return buff.name;
  }
  if (buff.type === 3 && buff._3) {
    switch (buff._3.affectType) {
      case AffectType.INCREASE_FIRE_DMG_RECEIVED:
        return `受到火屬性攻擊增加${formatToTwoDecimal(
          buff._3.value * buff._3.stack * 100,
        )}% (最多${buff._3.maxStack}層)`;
      case AffectType.INCREASE_WATER_DMG_RECEIVED:
        return `受到水屬性攻擊增加${formatToTwoDecimal(
          buff._3.value * buff._3.stack * 100,
        )}% (最多${buff._3.maxStack}層)`;
      case AffectType.INCREASE_WIND_DMG_RECEIVED:
        return `受到風屬性攻擊增加${formatToTwoDecimal(
          buff._3.value * buff._3.stack * 100,
        )}% (最多${buff._3.maxStack}層)`;
      case AffectType.INCREASE_LIGHT_DMG_RECEIVED:
        return `受到光屬性攻擊增加${formatToTwoDecimal(
          buff._3.value * buff._3.stack * 100,
        )}% (最多${buff._3.maxStack}層)`;
      case AffectType.INCREASE_DARK_DMG_RECEIVED:
        return `受到暗屬性攻擊增加${formatToTwoDecimal(
          buff._3.value * buff._3.stack * 100,
        )}% (最多${buff._3.maxStack}層)`;
      case AffectType.ATK:
        return `攻擊增加${formatToTwoDecimal(
          buff._3.value * buff._3.stack * 100,
        )}% (最多${buff._3.maxStack}層)`;
      case AffectType.MAXHP:
        return `最大HP增加${formatToTwoDecimal(
          buff._3.value * buff._3.stack * 100,
        )}% (最多${buff._3.maxStack}層)`;
      case AffectType.INCREASE_DMG:
        return `造成傷害增加${formatToTwoDecimal(
          buff._3.value * buff._3.stack * 100,
        )}% (最多${buff._3.maxStack}層)`;
      case AffectType.INCREASE_BASIC_DAMAGE:
        return `普攻傷害增加${formatToTwoDecimal(
          buff._3.value * buff._3.stack * 100,
        )}% (最多${buff._3.maxStack}層)`;
      case AffectType.INCREASE_ULTIMATE_DAMAGE:
        return `必殺技傷害增加${formatToTwoDecimal(
          buff._3.value * buff._3.stack * 100,
        )}% (最多${buff._3.maxStack}層)`;
      case AffectType.INCREASE_DMG_RECEIVED:
        return `受到傷害增加${formatToTwoDecimal(
          buff._3.value * buff._3.stack * 100,
        )}% (最多${buff._3.maxStack}層)`;
      case AffectType.INCREASE_ATTACKER_DAMAGE_RECEIVED:
        return `受到攻擊者傷害增加${formatToTwoDecimal(
          buff._3.value * buff._3.stack * 100,
        )}% (最多${buff._3.maxStack}層)`;
      case AffectType.INCREASE_TRIGGER_DAMAGE_RECEIVED:
        return `受到觸發傷害增加${formatToTwoDecimal(
          buff._3.value * buff._3.stack * 100,
        )}% (最多${buff._3.maxStack}層)`;
      case AffectType.INCREASE_ULTIMATE_DAMAGE_RECEIVED:
        return `受到必殺技傷害增加${formatToTwoDecimal(
          buff._3.value * buff._3.stack * 100,
        )}% (最多${buff._3.maxStack}層)`;
    }
  }
  if (buff.type === 7) {
    return `${buff.name}[${buff._7?.activated ? "已觸發" : "未觸發"}])`;
  }
  return buff.name;
}

export function parseAttribute(
  active: CharacterAttribute,
  passive: CharacterAttribute,
) {
  switch (active) {
    case CharacterAttribute.DARK:
      if (passive === CharacterAttribute.LIGHT) return 1.5;
      break;
    case CharacterAttribute.LIGHT:
      if (passive === CharacterAttribute.DARK) return 1.5;
      break;
    case CharacterAttribute.FIRE:
      if (passive === CharacterAttribute.WIND) return 1.5;
      if (passive === CharacterAttribute.WATER) return 0.5;
      break;
    case CharacterAttribute.WATER:
      if (passive === CharacterAttribute.FIRE) return 1.5;
      if (passive === CharacterAttribute.WIND) return 0.5;
      break;
    case CharacterAttribute.WIND:
      if (passive === CharacterAttribute.WATER) return 1.5;
      if (passive === CharacterAttribute.FIRE) return 0.5;
      break;
    case CharacterAttribute.NONE:
      return 1;
    default:
      return 1;
  }
  return 1;
}

export function formatToTwoDecimal(num: number) {
  return Math.round(num * 100) / 100;
}
