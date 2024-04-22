import { create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { CharacterState } from "../types/Character";
import { initCharacterState } from "./Data";
import { triggerLeaderSkill } from "./LeaderSkill";
import { calculateDamage } from "./Calculate";
import { AffectType, BuffType } from "../types/Skill";

export interface GameState {
  turns: number;
  turnsState: "before" | "during" | "after";
  enemy: CharacterState;
  characters: CharacterState[];
  init: (characters: CharacterState[]) => void;
  initLeaderSkill: () => void;
  activateHpBuff: () => void;
  addTurn: () => void;
  basicAttack: (position: number) => void;
  checkBuffEnd: () => void;
  checkEndTurns: () => void;
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
        initHp: 10000000000,
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
          triggerLeaderSkill(parseInt(state.characters[0].id), state);
          state.activateHpBuff();
          // Immediate calculate max hp
        });
      },
      activateHpBuff: () => {
        set((state) => {
          state.characters.forEach((character, index) => {
            let hpBuff = 1;
            character.buff.forEach((buff) => {
              if (
                buff.type === BuffType.BUFF &&
                buff.affect === AffectType.HP
              ) {
                hpBuff += buff.value;
              }
            });
            state.characters[index].hp = Math.ceil(character.hp * hpBuff);
            state.characters[index].initHp = Math.ceil(
              character.initHp * hpBuff,
            );
          });
        });
      },
      addTurn: () => {
        set((state) => {
          state.turns += 1;
        });
      },
      basicAttack: (position: number) => {
        set((state) => {
          state.characters[position].isMoved =
            !state.characters[position].isMoved;

          const damage = calculateDamage(position, 1, state);
          state.enemy.hp -= damage;
        });
      },
      checkBuffEnd: () => {
        set((state) => {
          state.characters.forEach((character) => {
            if (character.buff.length > 0) {
              character.buff.forEach((buff) => {});
            }
          });
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
