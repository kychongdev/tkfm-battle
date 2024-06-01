import type {
  _0,
  _1,
  _2,
  _3,
  _4,
  _5,
  _6,
  _7,
  _8,
  _9,
  _10,
  _11,
  _12,
} from "./ISkills";

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
  _3?: _3;
  _4?: _4;
  _5?: _5;
  _6?: _6;
  _7?: _7;
  _8?: _8;
  _9?: _9;
  _10?: _10;
  _11?: _11;
  _12?: _12;
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
  RAW_SHIELD,
  INCREASE_SHIELD_RATE_RECEIVED,
  DECREASE_SHIELD_RATE_RECEIVED,
  INCREASE_SHIELD_RATE_OUTPUT,
  DECREASE_SHIELD_RATE_OUTPUT,
  INCREASE_DMG,
  INCREASE_DMG_RECEIVED,
  DECREASE_DMG_RECEIVED,
  INCREASE_BASIC_DAMAGE,
  INCREASE_ULTIMATE_DAMAGE,
  DECREASE_ULTIMATE_DAMAGE,
  INCREASE_FIRE_DMG_RECEIVED,
  INCREASE_WATER_DMG_RECEIVED,
  INCREASE_WIND_DMG_RECEIVED,
  INCREASE_DARK_DMG_RECEIVED,
  INCREASE_LIGHT_DMG_RECEIVED,
  INCREASE_FIRE_DMG,
  INCREASE_WATER_DMG,
  INCREASE_WIND_DMG,
  INCREASE_DARK_DMG,
  INCREASE_LIGHT_DMG,
  DECREASE_FIRE_DMG,
  DECREASE_WATER_DMG,
  DECREASE_WIND_DMG,
  DECREASE_DARK_DMG,
  DECREASE_LIGHT_DMG,
  DECREASE_FIRE_DMG_RECEIVED,
  DECREASE_WATER_DMG_RECEIVED,
  DECREASE_WIND_DMG_RECEIVED,
  DECREASE_DARK_DMG_RECEIVED,
  DECREASE_LIGHT_DMG_RECEIVED,
  INCREASE_HEAL_RATE,
  DECREASE_HEAL_RATE,
  DECREASE_BASIC_DAMAGE,
  INCREASE_TRIGGER_DAMAGE,
  INCREASE_TRIGGER_DAMAGE_RECEIVED,
  DEAL_TRIGGER_DAMAGE,
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
  APPLY_BUFF = 8,
  GET_HEAL = 9,
  NONE = 10,
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
  EQUALORHIGHER = 2,
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
