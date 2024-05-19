interface Buff {
  name: string;
  type: BuffType;
  // 條件
  condition: Condition;
  // 0 表示沒在用
  value: number;
  // 直接添加BUFF
  // For recursive use
  applyBuff?: Buff;
  // 取X屬性當成數值
  valueType?: ValueType;
  cdValue?: number;
  // if valueType is skill, then value target must be defined
  // 取X角色的技能當成數值
  valueTarget?: string;
  // 目標
  target: Target;
  // 影響的屬性
  affect?: AffectType;
  // Only exist for reading character
  affectTarget?: string;
  // 如果條件是回合
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
  BASICATTACK,
  ULTIMATEATTACK,
  TRIGGERAPPLYBUFF,
  TRIGGERATTACK,
  HEAL,
  ATKBUFF,
  ATTRIBUTE,
  DECREASECD,
  APPLYRAWBUFF,
  NONE,
}

enum Condition {
  ATTACK,
  ATTACKED,
  BASIC_ATTACK,
  ULTIMATE,
  TURN,
  EVERY_X_TURN,
  MOVE,
  NONE,
}

enum Target {
  SELF,
  ENEMY,
  ALL,
  ALLEXCEPTSELF,
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
