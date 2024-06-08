import type { CharacterClass } from "./Character";
import type {
  AffectType,
  Buff,
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
  target: Target;
  // 0 is basic, 1 is ultimate
  damageType: 0 | 1;
}

//給予條件式BUFF
export interface _2 extends Buff {
  target: Target | CharacterClass;
}

// Stack buff 層數BUFF
export interface _3 {
  id: string;
  name: string;
  stack: number;
  maxStack: number;
  affectType: AffectType;
  value: number;
}

// increase _3 stack buff
// 增加層次的BUFF
export interface _4 {
  increaseStack: number;
  targetSkill: string;
  target: Target | CharacterClass;
  applyBuff?: Buff;
}

// immediately effect buff
// 立即生效的BUFF
// 未寫
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
  duration: number;
  base: boolean;
}

// Check skill stack and apply buff
export interface _7 {
  stackCondition: SkillStackCondition;
  stack: number;
  target: Target | CharacterClass;
  targetSkill: string;
  activateBuff: Buff;
  applyTarget: Target | CharacterClass;
  activated: boolean;
}

// apply debuff/buff
// 白被動3
// 必殺時，觸發「依據自身『連環陷阱』的層數觸發『使目標受到火、水屬性傷害增加3%(1回合)』」
export interface _8 {
  value: number;
  target: Target | CharacterClass;
  targetSkill: string;
  applyTarget: Target | CharacterClass;
  applyBuff: Buff;
}

// 潛6的被動
export interface _9 {
  applyBuff: Buff;
}

// Apply HP based shield
// 必殺時，觸發「以自身最大HP10%給予我方全體護盾(1回合)」
export interface _10 {
  value: number;
  hpBased: string;
  target: Target | CharacterClass;
  affectType: AffectType;
}

// Apply Simple buff
export interface _11 {
  target: Target | CharacterClass;
  applyBuff: Buff[];
}

// Apply buff based on position, random it if position does not exist
export interface _12 {
  position: 0 | 1 | 2 | 3 | 4;
  applyBuff: Buff;
}

//Apply to X character buff
export interface _13 {
  target: string;
  applyBuff: Buff[];
}

// Reduce CD on target
export interface _14 {
  reduceCD: number;
  target: Target;
}

//Reduce CD on position
export interface _15 {
  position: 0 | 1 | 2 | 3 | 4;
  reduceCD: number;
}
