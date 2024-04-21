interface Buff {
  name: string;
  type: BuffType;
  value: number;
  target: Target;
  affect: AffectType;
  condition: Condition[];
  duration: number;
  durationType: DurationType;
}

enum AffectType {
  RAWATK,
  ATK,
  HP,
  INCREASEDMG,
  FIRE,
  WATER,
  WIND,
  DARK,
  LIGHT,
  OTHER,
  NONE,
}

enum BuffType {
  BUFF,
  DEBUFF,
  APPLYBUFF,
  APPLYDEBUFF,
  ATTACK,
  HEAL,
  ATKBUFF,
  ATTRIBUTE,
  NONE,
}

enum Condition {
  ATTACK,
  ATTACKED,
  BASIC_ATTACK,
  ULTIMATE,
  NONE,
}

enum Target {
  SELF,
  ENEMY,
  ALL,
  ATTACKER,
  PROTECTOR,
  HEALER,
  OBSTRUCTER,
  SUPPORT,
  CHARACTER,
  NONE,
}

enum DurationType {
  PERMANENT,
  TEMPORARY,
}

export type { Buff };
export { BuffType, Condition, Target, AffectType, DurationType };
