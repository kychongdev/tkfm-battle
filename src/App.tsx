import {
  Button,
  Combobox,
  Group,
  Input,
  InputBase,
  Modal,
  useCombobox,
} from "@mantine/core";
import { useState } from "react";
import { create } from "zustand";

interface GameState {
  turns: number;
  character: {
    pos1: Character | null;
    pos2: Character | null;
    pos3: Character | null;
    pos4: Character | null;
    pos5: Character | null;
  };
  selectCharacter: (position: number, character: Character) => void;
}

interface Character {
  baseAtk: number;
  baseHp: number;
  attributes: number;
  positiion: number;
  level: number;
  hpPotential: number;
  atkPotential: number;
  disclipline: number;
  stars: number;
  bond: number;
}

const useGameState = create<GameState>((set) => ({
  turns: 0,
  character: {
    pos1: null,
    pos2: null,
    pos3: null,
    pos4: null,
    pos5: null,
  },
  selectCharacter: (position, character) => {
    set((state) => {
      switch (position) {
        case 1:
          return { character: { ...state.character, pos1: character } };
        case 2:
          return { character: { ...state.character, pos2: character } };
        case 3:
          return { character: { ...state.character, pos3: character } };
        case 4:
          return { character: { ...state.character, pos4: character } };
        case 5:
          return { character: { ...state.character, pos5: character } };
        default:
          return state;
      }
    });
  },
}));

function App() {
  const selectCharacter = useGameState((state) => state.selectCharacter);
  const [open, setOpen] = useState(false);

  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const [value, setValue] = useState<string | null>();

  const characterList = ["test", "test2"];
  const options = characterList.map((item) => (
    <Combobox.Option value={item} key={item}>
      {item}
    </Combobox.Option>
  ));

  const firstChar = {
    baseAtk: 100,
    baseHp: 100,
    attributes: 1,
    positiion: 1,
    level: 1,
    hpPotential: 1,
    atkPotential: 1,
    disclipline: 1,
    stars: 1,
    bond: 1,
  };

  return (
    <>
      <Modal opened={open} onClose={() => setOpen(false)} title="選擇角色">
        <Combobox
          store={combobox}
          onOptionSubmit={(val) => {
            setValue(val);
          }}
        >
          <Combobox.Target>
            <InputBase
              component="button"
              type="button"
              pointer
              rightSection={<Combobox.Chevron />}
              rightSectionPointerEvents="none"
              onClick={() => combobox.toggleDropdown()}
            >
              {value || <Input.Placeholder>Pick value</Input.Placeholder>}
            </InputBase>
          </Combobox.Target>
          <Combobox.Dropdown>
            <Combobox.Options>{options}</Combobox.Options>
          </Combobox.Dropdown>
        </Combobox>
      </Modal>
      <Group grow wrap="nowrap">
        <Button variant="filled" onClick={() => setOpen(true)}>
          1
        </Button>
        <Button variant="filled" onClick={() => selectCharacter(2, firstChar)}>
          2
        </Button>
        <Button variant="filled" onClick={() => selectCharacter(3, firstChar)}>
          3
        </Button>
        <Button variant="filled" onClick={() => selectCharacter(4, firstChar)}>
          4
        </Button>
        <Button variant="filled" onClick={() => selectCharacter(5, firstChar)}>
          5
        </Button>
      </Group>
    </>
  );
}

export default App;
