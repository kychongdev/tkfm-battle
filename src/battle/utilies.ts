import { AffectType, type Buff } from "../types/Skill";

export function formatNumber(number: number) {
  //format number to have commas
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function parseSkillName(buff: Buff) {
  if (buff.type === 0) {
    switch (buff._0?.affectType) {
      case AffectType.RAWATK:
        return `攻擊增加${buff._0.value}`;
      case AffectType.FIRE:
        return `受到火屬性攻擊增加${buff._0.value * 100}%`;
      case AffectType.WATER:
        return `受到水屬性攻擊增加${buff._0.value * 100}%`;
      case AffectType.WIND:
        return `受到風屬性攻擊增加${buff._0.value * 100}%`;
      case AffectType.LIGHT:
        return `受到光屬性攻擊增加${buff._0.value * 100}%`;
      case AffectType.DARK:
        return `受到暗屬性攻擊增加${buff._0.value * 100}%`;
      case AffectType.ATK:
        return `攻擊增加${buff._0.value * 100}%`;
      case AffectType.MAXHP:
        return `最大HP增加${buff._0.value * 100}%`;
      case AffectType.INCREASE_DMG:
        return `造成傷害增加${buff._0.value * 100}%`;
    }

    return buff.name;
  }
  if (buff.type === 3 && buff._3) {
    return `${buff.name}[${buff._3.stack}層]最多${buff._3.maxStack})`;
  }
  if (buff.type === 7) {
    return `${buff.name}[${buff._7?.activated ? "已觸發" : "未觸發"}])`;
  }
  return buff.name;
}
