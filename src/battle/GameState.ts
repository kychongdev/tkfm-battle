import { create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import type { CharacterState } from "../types/Character";
import { initCharacterState } from "./Data";
import { triggerLeaderSkill } from "./leader";
import {
  checkEndTurn,
  applyHpBuff,
  onTurnStart,
  parseCondition,
} from "./calculate";
import { AffectType, Condition } from "../types/Skill";
import { basicAttack } from "./BasicAttack";
import { initPassiveSkill } from "./Passive";
import { activateUltimate } from "./ultimate";

export interface GameState {
  turns: number;
  turnsState: "before" | "during" | "after";
  enemy: CharacterState;
  characters: CharacterState[];
  init: (characters: CharacterState[]) => void;
  initLeaderSkill: () => void;
  addTurn: () => void;
  basicMove: (position: number) => void;
  ultimateMove: (position: number) => void;
}

const initTeamState = [
  initCharacterState,
  initCharacterState,
  initCharacterState,
  initCharacterState,
  initCharacterState,
];

export const useGameState = create<GameState>()(
  persist(
    immer((set) => ({
      turns: 0,
      turnsState: "before",
      enemy: {
        ...initCharacterState,
        maxHp: 10000000000,
        hp: 10000000000,
      },
      characters: initTeamState,
      init: (characters: CharacterState[]) => {
        set((state) => {
          state.characters = characters;
        });
      },
      initLeaderSkill: () => {
        set((state) => {
          state.turns = 0;
          state.enemy.hp = state.enemy.maxHp;
          state.characters.forEach((_, index) => {
            state.characters[index].cd = state.characters[index].maxCd;
          });
          triggerLeaderSkill(state.characters[0].id, state);
          applyHpBuff(state);
          initPassiveSkill(0, state);
          initPassiveSkill(1, state);
          initPassiveSkill(2, state);
          initPassiveSkill(3, state);
          initPassiveSkill(4, state);
        });
      },
      addTurn: () => {
        set((state) => {
          state.turns += 1;
          onTurnStart(state);
        });
      },
      basicMove: (position: number) => {
        set((state) => {
          state.characters[position].isMoved =
            !state.characters[position].isMoved;
          basicAttack(state.characters[position].id, position, state);
          parseCondition(position, Condition.BASIC_ATTACK, state);
          checkEndTurn(state);
        });
      },
      ultimateMove: (position: number) => {
        set((state) => {
          state.characters[position].isMoved =
            !state.characters[position].isMoved;
          activateUltimate(position, state);
          parseCondition(position, Condition.ULTIMATE, state);
          checkEndTurn(state);
          state.characters[position].cd = state.characters[position].maxCd;
        });
      },
    })),
    {
      name: "game-state",
    },
  ),
);
