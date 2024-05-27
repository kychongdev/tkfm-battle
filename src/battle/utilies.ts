import { AffectType, type Buff } from "../types/Skill";

export function formatNumber(number: number) {
  //format number to have commas
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function parseSkillName(buff: Buff) {
  if (buff.type === 0) {
    switch (buff._0?.affectType) {
      case AffectType.RAWATK:
        return `攻擊增加${buff._0.value} (${buff.duration}回合)`;
      case AffectType.FIRE:
        return `受到火屬性攻擊增加${buff._0.value * 100}% (${
          buff.duration
        }回合)`;
      case AffectType.WATER:
        return `受到水屬性攻擊增加${buff._0.value * 100}% (${
          buff.duration
        }回合)`;
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
