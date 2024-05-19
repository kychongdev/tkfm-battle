import { AffectType, Buff, Condition, Target } from "./Skill";

// 給予角色的Buff
export interface _0 {
  name: string;
  type: number;
  condition: Condition;
  rawBuff: Buff;
}

// 純攻擊
export interface _1 {
  value: number;
  isTrigger: boolean;
  target: Target.ENEMY;
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
  target: Target;
}
