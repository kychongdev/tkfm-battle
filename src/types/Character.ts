enum Attribute {
  None,
  Fire,
  Water,
  Wind,
  Light,
  Dark,
}

interface CharacterState {
  id: string;
  isExist: boolean;
  baseAtk: number;
  baseHp: number;
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
}

interface CharacterSelect {
  id: string;
  position: number;
  level: number;
  hpPotential: number;
  hpSubPotential?: number;
  atkPotential: number;
  atkSubPotential: number;
  disclipline: number;
  stars: number;
  bond: number;
}

export type { CharacterState, CharacterSelect };
export { Attribute };
