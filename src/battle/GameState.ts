import { create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { CharacterState } from "../types/Character";
import { initCharacterState } from "./Data";
import { triggerLeaderSkill } from "./LeaderSkill";
import { checkEndTurn, onTurnStart, parseCondition } from "./Calculate";
import { AffectType, Condition } from "../types/Skill";
import { basicAttack } from "./BasicAttack";
import { initPassiveSkill } from "./Passive";
import { activateUltimate, initUltimateSkill } from "./Ultimate";

export interface GameState {
  turns: number;
  turnsState: "before" | "during" | "after";
  enemy: CharacterState;
  characters: CharacterState[];
  init: (characters: CharacterState[]) => void;
  initLeaderSkill: () => void;
  activateHpBuff: () => void;
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
          state.activateHpBuff();
        });
      },
      activateHpBuff: () => {
        set((state) => {
          // state.characters.forEach((character, index) => {
          //   let hpBuff = 1;
          //   character.buff.forEach((buff) => {
          //     if (
          //       buff.type === BuffType.BUFF &&
          //       buff.affect === AffectType.HP
          //     ) {
          //       hpBuff += buff.value;
          //     }
          //   });
          //   state.characters[index].hp = Math.ceil(character.hp * hpBuff);
          //   state.characters[index].maxHp = Math.ceil(character.maxHp * hpBuff);
          // });
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
