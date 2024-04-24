interface Buff {
  name: string;
  type: BuffType;
  value: number;
  target: Target;
  affect?: AffectType;
  condition: Condition;
  valueModfiy?: string;
  stack?: number;
  maxStack?: number;
  duration?: number;
  durationType?: DurationType;
  unique_id?: string;
}

enum AffectType {
  RAWATK,
  ATK,
  HP,
  SHIELD,
  INCREASE_DMG,
  INCREASE_DMG_RECEIVED,
  ULTIMATE_DAMAGE,
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
  STACK,
}

export type { Buff };
export { BuffType, Condition, Target, AffectType, DurationType };
