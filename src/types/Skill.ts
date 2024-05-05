interface Buff {
  name: string;
  type: BuffType;
  value: number;
  valueType?: ValueType;
  //if valueType is skill, then value target must be defined
  valueTarget?: string;
  target: Target;
  affect?: AffectType;
  // Only exist for reading character
  affectTarget?: string;
  condition: Condition;
  conditionTurn?: number;
  stack?: number;
  increaseStack?: number;
  maxStack?: number;
  stackTarget?: string;
  //if undefined means infinite
  duration?: number;
  applyBuffDuration?: number;
  //if durationType is stack, then stack, increaseStack and maxstack must be defined
  durationType?: DurationType;
  unique_id?: string;
  trigger?: boolean;
}

enum ValueType {
  // Just take original value
  NONE,
  MAXHP,
  SKILL,
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
  OTHER_CHARACTER_INCREASE_DAMAGE,
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
  TURN,
  EVERY_X_TURN,
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
export { BuffType, Condition, Target, AffectType, DurationType, ValueType };
