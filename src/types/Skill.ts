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

// biome-ignore lint/style/useEnumInitializers: <explanation>
enum ValueType {
  // Just take original value
  NONE,
  MAXHP,
  SKILL,
}

// biome-ignore lint/style/useEnumInitializers: <explanation>
enum AffectType {
  RAWATK,
  ATK,
  MAXHP,
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
  ATTACK = 0,
  ATTACKED = 1,
  BASIC_ATTACK = 2,
  ULTIMATE = 3,
  TURN = 4,
  EVERY_X_TURN = 5,
  MOVE = 6,
  NONE = 7,
}

enum Target {
  ATTACKER = 5,
  PROTECTOR = 6,
  HEALER = 7,
  OBSTRUCTER = 8,
  SUPPORT = 9,
  SELF = 10,
  ENEMY = 11,
  ALL = 12,
  CHARACTER = 13,
  NONE = 14,
}

enum DurationType {
  PERMANENT = 0,
  TEMPORARY = 1,
  STACK = 2,
}

export type { Buff };
export { Condition, Target, AffectType, DurationType, ValueType };
