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
    }
    return buff.name;
  }
  if (buff.type === 3 && buff._3) {
    return `${buff.name}[${buff._3.stack}層]最多${buff._3.maxStack})`;
  }
  return buff.name;
}
