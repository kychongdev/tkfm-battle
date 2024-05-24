import type { CharacterClass } from "./Character";
import type {
  AffectType,
  Buff,
  Condition,
  SkillStackCondition,
  SpecialCondition,
  Target,
} from "./Skill";

// 只是BUFF
export interface _0 {
  affectType: AffectType;
  value: number;
}

// 純攻擊
export interface _1 {
  value: number;
  isTrigger: boolean;
  target: Target | CharacterClass;
  // 0 is basic, 1 is ultimate
  damageType: 0 | 1;
}

//給予條件式BUFF
export interface _2 {
  // id: string;
  // name: string;
  // type: number;
  // value: number;
  // affectType: AffectType;
  // condition: Condition;
  //
  id: string;
  name: string;
  type: number;
  condition: Condition;
  conditionTurn?: number;
  duration: number;
  // target: Target | CharacterClass;
}

// Stack buff 層數BUFF
export interface _3 {
  id: string;
  name: string;
  stack: number;
  maxStack: number;
  affectType: AffectType;
}

// increase _3 stack buff
export interface _4 {
  value: number;
  targetSkill: string;
  target: Target | CharacterClass;
}

// immediately effect buff
// 立即生效的BUFF
export interface _5 {
  condition: SpecialCondition;
  conditionValue: number;
  value: number;
  affectType: AffectType;
  target: Target | CharacterClass;
}

// 傳功
export interface _6 {
  value: number;
  affectType: AffectType.RAWATK;
  target: Target | CharacterClass;
}

// Check skill stack and apply buff
export interface _7 {
  stackCondition: SkillStackCondition;
  stack: number;
  targetSkill: string;
  activateBuff: Buff;
}

// apply debuff/buff
export interface _8 {
  value: number;
  stackTarget?: string;
  target: Target | CharacterClass;
  applyBuff: Buff;
}
