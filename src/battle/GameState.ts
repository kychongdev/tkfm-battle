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
import { initPassiveSkill } from "./passive";
import { activateUltimate } from "./ultimate";
import { applyExtra } from "./extra";

export interface GameState {
  turns: number;
  turnsState: "before" | "during" | "after";
  enemies: CharacterState[];
  targeting: number;
  characters: CharacterState[];
  init: (characters: CharacterState[]) => void;
  initLeaderSkill: () => void;
  addTurn: () => void;
  basicMove: (position: number) => void;
  ultimateMove: (position: number) => void;
  log: string[];
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
      enemies: [
        {
          ...initCharacterState,
          maxHp: 10854389981,
          hp: 10854389981,
        },
      ],
      log: [],
      targeting: 0,
      characters: initTeamState,
      init: (characters: CharacterState[]) => {
        set((state) => {
          state.characters = characters;
          state.turns = 0;
          state.enemies[0].hp = state.enemies[0].maxHp;
          state.enemies[0].buff = [];
          state.log = [];
          state.characters.forEach((_, index) => {
            state.characters[index].hp = state.characters[index].maxHp;
            state.characters[index].buff = [];
            state.characters[index].isMoved = false;
          });
        });
      },
      initLeaderSkill: () => {
        set((state) => {
          state.turns = 0;
          state.enemies[0].hp = state.enemies[0].maxHp;
          state.enemies[0].buff = [];
          state.log = [];
          state.characters.forEach((_, index) => {
            state.characters[index].hp = state.characters[index].maxHp;
            state.characters[index].buff = [];
            state.characters[index].isMoved = false;
          });
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
          parseCondition(
            position,
            [Condition.BASIC_ATTACK, Condition.MOVE, Condition.ATTACK],
            state,
          );
          checkEndTurn(state);
        });
      },
      ultimateMove: (position: number) => {
        set((state) => {
          state.characters[position].isMoved =
            !state.characters[position].isMoved;
          activateUltimate(state, position);
          parseCondition(
            position,
            [Condition.ULTIMATE, Condition.MOVE, Condition.ATTACK],
            state,
          );
          applyExtra(state, position);
          state.characters[position].cd = state.characters[position].maxCd;
          checkEndTurn(state);
        });
      },
    })),
    {
      name: "game-state",
    },
  ),
);
