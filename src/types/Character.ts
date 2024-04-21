enum Attribute {
  FIRE,
  WATER,
  WIND,
  LIGHT,
  DARK,
  NONE,
}

interface CharacterState {
  id: string;
  isExist: boolean;
  initAtk: number;
  initHp: number;
  atk: number;
  hp: number;
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
  buff: any[];
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
