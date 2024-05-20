import type { CharacterClass } from "./Character";
import type { AffectType, Buff, Condition, Target } from "./Skill";

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

// 傳功
export interface _2 {
  name: string;
  type: number;
  value: number;
  affectType: AffectType;
  condition: Condition;
  target: Target | CharacterClass;
}

// RAW BUFF 純數值
export interface _3 {
  affectType: AffectType;
  value: number;
}
