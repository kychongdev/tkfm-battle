import type { Buff } from "./Skill";

export enum CharacterAttribute {
  FIRE = 0,
  WATER = 1,
  WIND = 2,
  LIGHT = 3,
  DARK = 4,
  NONE = 5,
}
export enum CharacterClass {
  ATTACKER = 5,
  PROTECTOR = 6,
  HEALER = 7,
  OBSTRUCTER = 8,
  SUPPORT = 9,
}

interface CharacterState {
  id: string;
  name: string;
  isExist: boolean;
  baseAtk: number;
  baseHp: number;
  maxAtk: number;
  maxHp: number;
  atk: number;
  hp: number;
  stars: number;
  bond: number;
  passive4: boolean;
  class: CharacterClass;
  attribute: CharacterAttribute;
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
  pot6: boolean;
}

export type { CharacterState, CharacterSelect };
export { CharacterAttribute as Attribute };
