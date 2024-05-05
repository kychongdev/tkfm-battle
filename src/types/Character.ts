import { Buff } from "./Skill";

enum Attribute {
  FIRE,
  WATER,
  WIND,
  LIGHT,
  DARK,
  NONE,
}
export enum CharacterClass {
  ATTACKER,
  PROTECTOR,
  HEALER,
  OBSTRUCTER,
  SUPPORT,
}

interface CharacterState {
  id: string;
  isExist: boolean;
  initAtk: number;
  initHp: number;
  atk: number;
  hp: number;
  bond: number;
  class: CharacterClass;
  attribute: Attribute;
  position: number;
  shield: number;
  isMoved: boolean;
  isGuard: boolean;
  isBroken: boolean;
  isTaunt: boolean;
  isParalysis: boolean;
  isSleep: boolean;
  isSilence: boolean;
  isDead: boolean;
  buff: Buff[] | [];
  cd: number;
  maxCd: number;
  ultimateName: string;
}

interface CharacterSelect {
  id: string;
  position: number;
  level: number;
  hpPot: number;
  atkPot: number;
  disclipline: number;
  stars: number;
  bond: number;
}

export type { CharacterState, CharacterSelect };
export { Attribute };
