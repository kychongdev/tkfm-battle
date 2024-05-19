import { Attribute, CharacterSelect, CharacterState } from "../types/Character";

const initCharacterState: CharacterState = {
  id: "",
  isExist: false,
  maxHp: 0,
  maxAtk: 0,
  atk: 0,
  hp: 0,
  bond: 1,
  cd: 0,
  maxCd: 0,
  ultimateName: "",
  attribute: Attribute.NONE,
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
  buff: [],
};

function initCharacterSelection(position: number) {
  return {
    id: "",
    position: position,
    level: 60,
    hpPot: 100,
    atkPot: 100,
    stars: 5,
    bond: 1,
    disclipline: 3,
  };
}

export { initCharacterState, initCharacterSelection };
