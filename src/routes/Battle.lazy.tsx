import { Button } from "@mantine/core";
import { createLazyFileRoute } from "@tanstack/react-router";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

export const Route = createLazyFileRoute("/Battle")({
  component: () => <div>Hello /Battle!</div>,
});

interface GameState {
  turns: number;
  turnState: "before" | "current" | "after";
  enemy: Character;
  character: {
    pos1: Character | null;
    pos2: Character | null;
    pos3: Character | null;
    pos4: Character | null;
    pos5: Character | null;
  };
  selectCharacter: (position: number, character: Character) => void;
  move: (position: keyof GameState["character"], action: string) => void;
}

interface CharacterState {
  baseAtk: number;
  baseHp: number;
  atk: number;
  hp: number;
  attributes: number;
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

interface Character {
  baseAtk: number;
  baseHp: number;
  attributes: number;
  position: number;
  level: number;
  hpPotential: number;
  atkPotential: number;
  disclipline: number;
  stars: number;
  bond: number;
}

interface CharacterSkill {
  target: string[];
  type: string;
  condition: string;
}

// export interface ISkill {
//   type: SkillActionType | SkillEffectType;
//   condition: SkillCondition;
//   conditionValue?: number;
//   otherCondition?:
//     | SkillCondition.HP_GREATER_THAN
//     | SkillCondition.HP_LESS_THAN
//     | SkillCondition.EXIST_CHARACTER;
//   otherConditionValue?: number | string;
//   value?: number;
//   basis?: SkillEffectBasis;
//   target: SkillTarget | number[] | string[];
//   on: SkillOn;
//   duration?: number /* undefined -> always */;
//   CD?: number;
//   maxStack?: number /* undefined -> no limit */;
//   byAttribute?: CharacterAttribute /* get extra damaged by A attribute */;
//   repeat?: number;
//   possibility?: number;
//   skill?: ExtraSkill;
// }

interface CharacterBuff {}

const useGameState = create<GameState>()(
  immer((set) => ({
    turns: 0,
    turnState: "before",
    enemy: {
      baseAtk: 0,
      baseHp: 100,
      attributes: 0,
      position: 0,
      level: 0,
      hpPotential: 0,
      atkPotential: 0,
      disclipline: 0,
      stars: 0,
      bond: 0,
    },
    character: {
      pos1: null,
      pos2: null,
      pos3: null,
      pos4: null,
      pos5: null,
    },
    move: (position, action) => {
      set((state) => {});
    },
    selectCharacter: (position, character) => {
      set((state) => {
        // @ts-ignore
        state.character[`pos${position}`] = character;
        return state;
      });
    },
  })),
);

const Battle = () => {
  return (
    <div>
      <Button>Start Battle</Button>
      <h1>dqdw</h1>
    </div>
  );
};
