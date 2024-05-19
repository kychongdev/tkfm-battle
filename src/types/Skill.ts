import { _0, _1, _2 } from "./ISkills";

interface IBuff {
  id: string;
  name: string;
  type: number;
  condition: Condition;
  conditionTurn?: number;
  duration: number;
}

interface Buff extends IBuff {
  _0?: _0;
  _1?: _1;
  _2?: _2;
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
export { Condition, Target, AffectType, DurationType, ValueType };
