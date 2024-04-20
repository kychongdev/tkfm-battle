import { Attribute, CharacterSelect, CharacterState } from "../types/Character";

const initCharacterState: CharacterState = {
  id: "",
  isExist: false,
  baseAtk: 0,
  baseHp: 0,
  atk: 0,
  hp: 0,
  attribute: Attribute.None,
  position: 0,
  shield: 0,
  isMoved: false,
  isGuard: false,
  isBroken: false,
  isTaunt: false,
  isParalysis: false,
  isSleep: false,
  isSilence: false,
  isDead: false,
};

function initCharacterSelection(position: number) {
  return {
    id: "",
    position: position,
    level: 60,
    hpPotential: 12,
    hpSubPotential: 6,
    atkPotential: 12,
    atkSubPotential: 6,
    stars: 3,
    bond: 1,
    disclipline: 3,
  };
}

export { initCharacterState, initCharacterSelection };
