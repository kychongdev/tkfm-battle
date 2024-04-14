import { useEffectOnce, useLocalStorage } from "react-use";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import characterDetails from "../assets/characterDetails.json";
import { CharacterInit } from "./SelectCharacter";

interface CharacterState {
  isExist: boolean;
  baseAtk: number;
  baseHp: number;
  atk: number;
  hp: number;
  attribute: number;
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

interface GameState {
  turns: number;
  turnsState: "before" | "during" | "after";
  characters: CharacterState[];
  init: (characters: CharacterState[]) => void;
}

const CharacterInitialState: CharacterState = {
  isExist: false,
  baseAtk: 0,
  baseHp: 0,
  atk: 0,
  hp: 0,
  attribute: 0,
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

const useGameState = create<GameState>()(
  immer((set) => ({
    turns: 0,
    turnsState: "before",
    characters: [
      CharacterInitialState,
      CharacterInitialState,
      CharacterInitialState,
      CharacterInitialState,
      CharacterInitialState,
    ],
    init: (characters: CharacterState[]) => {
      set((state) => {
        state.characters = characters;
      });
    },
  })),
);

export default function Battle() {
  const [value, setValue, remove] =
    useLocalStorage<CharacterInit[]>("last-session");

  const initCharacters = useGameState((state) => state.init);
  const battleChar = useGameState((state) => state.characters);

  useEffectOnce(() => {
    const battleCharacters: CharacterState[] = value?.map((character) => {
      const characterDetail = characterDetails.find(
        (detail) => detail.id === character.id,
      );
      return {
        isExist: true,
        baseAtk: characterDetail?.stats.initATK,
        baseHp: characterDetail?.stats.initHP,
        atk: 0,
        hp: 0,
        attribute: characterDetail?.tags.attribute,
        position: character.position,
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
    });
    initCharacters(battleCharacters);
    console.log(battleChar);
  });

  return <div>Battle</div>;
}
