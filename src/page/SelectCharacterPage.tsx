import {
  Container,
  Select,
  Image,
  Group,
  Button,
  Title,
  Space,
  Modal,
} from "@mantine/core";
import { useState } from "react";
import character from "../assets/character.json";

// const gallery = Object.values(
//   import.meta.glob("../assets/character/*.{png,jpg,jpeg,PNG,JPEG}", {
//     eager: true,
//     as: "url",
//   }),
// );

const SelectCharacterPage = () => {
  let characterOption = [];
  for (const [key, value] of Object.entries(character.name)) {
    characterOption.push({ value: key, label: value });
  }
  const [opened, setOpened] = useState(false);
  const [position, setPosition] = useState<number>(0);
  const [characterList, setCharacterList] = useState(["", "", "", "", ""]);

  const openModal = (position: number) => {
    setPosition(position);
    setOpened(true);
  };

  return (
    <Container>
      <Space h="lg" />
      <Title order={3}>選擇角色</Title>
      <Group grow wrap="nowrap">
        <Image
          onClick={() => openModal(1)}
          src={characterList[0]}
          fallbackSrc="/src/assets/character/char_nr.png"
        />
        <Image
          onClick={() => openModal(2)}
          src={characterList[1]}
          fallbackSrc="/src/assets/character/char_nr.png"
        />
        <Image
          onClick={() => openModal(3)}
          src={characterList[2]}
          fallbackSrc="/src/assets/character/char_nr.png"
        />
        <Image
          onClick={() => openModal(4)}
          src={characterList[3]}
          fallbackSrc="/src/assets/character/char_nr.png"
        />
        <Image
          onClick={() => openModal(5)}
          src={characterList[4]}
          fallbackSrc="/src/assets/character/char_nr.png"
        />
      </Group>
      <Modal opened={opened} onClose={() => setOpened(false)} title="選擇角色">
        <Select
          data={characterOption}
          onChange={(value) => {
            const newCharacterList = [...characterList];
            newCharacterList[position - 1] =
              `/src/assets/character/char_${value}.png`;
            setCharacterList(newCharacterList);
          }}
        />
      </Modal>
      <Space h="lg" />
      <Button color="blue">開始戰鬥</Button>
    </Container>
  );
};

export { SelectCharacterPage };
