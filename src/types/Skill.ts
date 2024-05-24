import type { _0, _1, _2, _3, _4, _5, _6, _7, _8 } from "./ISkills";

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
  _2?: Buff;
  _3?: _3;
  _4?: _4;
  _5?: _5;
  _6?: _6;
  _7?: _7;
  _8?: _8;
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
  SHIELD_RATE_RECEIVED,
  INCREASE_DMG,
  INCREASE_DMG_RECEIVED,
  DECREASE_DMG_RECEIVED,
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
  ON_TURN_START = 7,
  NONE = 8,
}

enum SpecialCondition {
  HP_LOWER_THAN = 0,
  SKILL_STACK = 1,
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

enum SkillStackCondition {
  HIGHER = 0,
  LOWER = 1,
  EQUAL = 2,
}

export type { Buff };
export {
  Condition,
  Target,
  AffectType,
  DurationType,
  ValueType,
  SpecialCondition,
  SkillStackCondition,
};
