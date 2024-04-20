import { create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { CharacterState } from "../types/Character";
import { initCharacterSelection, initCharacterState } from "./Data";

interface GameState {
  turns: number;
  turnsState: "before" | "during" | "after";
  characters: CharacterState[];
  init: (characters: CharacterState[]) => void;
  basicAttack: (position: number) => void;
}

const initTeamState = [
  initCharacterState,
  initCharacterState,
  initCharacterState,
  initCharacterState,
  initCharacterState,
];

const InitCharacterSelectionTeam = [
  initCharacterSelection,
  initCharacterSelection,
  initCharacterSelection,
  initCharacterSelection,
  initCharacterSelection,
];

export const useGameState = create<GameState>()(
  persist(
    immer((set) => ({
      turns: 0,
      turnsState: "before",
      characters: initTeamState,
      init: (characters: CharacterState[]) => {
        set((state) => {
          state.characters = characters;
        });
      },
      basicAttack: (position: number) => {
        set((state) => {
          state.characters[position].isMoved =
            !state.characters[position].isMoved;
        });
      },
      checkEndTurns: () => {
        set((state) => {
          if (
            state.characters[0].isDead &&
            state.characters[1].isDead &&
            state.characters[2].isDead &&
            state.characters[3].isDead &&
            state.characters[4].isDead
          ) {
            state.turns += 1;
            state.turnsState = "before";
          }
          if (state.characters[0].isMoved && state.characters[1].isMoved) {
            state.turnsState = "after";
          }
        });
      },
    })),
    {
      name: "game-state",
    },
  ),
);
