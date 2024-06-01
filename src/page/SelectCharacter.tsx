import {
  Container,
  Select,
  Image,
  Group,
  Button,
  Title,
  Space,
  Modal,
  Stack,
  NumberInput,
  Card,
  Flex,
  Text,
} from "@mantine/core";
import { useCallback, useState } from "react";
import character from "../assets/character.json";
import { produce } from "immer";
import { useLocalStorage } from "react-use";
import { initCharacterSelection } from "../battle/Data";
import type { CharacterSelect } from "../types/Character";

// const gallery = Object.values(
//   import.meta.glob("../assets/character/*.{png,jpg,jpeg,PNG,JPEG}", {
//     eager: true,
//     as: "url",
//   }),
// );

export default function SelectCharacterPage() {
  const characterOption = [];
  for (const [key, value] of Object.entries(character.name)) {
    const available = ["196", "514", "518", "523", "525", "526", "528"];
    if (available.includes(key)) {
      characterOption.push({ value: key, label: value });
    }
  }

  const [value, setValue, remove] = useLocalStorage("last-session");

  const [opened, setOpened] = useState(false);
  const [position, setPosition] = useState<number>(1);
  const [characterList, setCharacterList] = useState<CharacterSelect[]>([
    initCharacterSelection(0),
    initCharacterSelection(1),
    initCharacterSelection(2),
    initCharacterSelection(3),
    initCharacterSelection(4),
  ]);

  const updateCharacter = useCallback(
    (position: number, characterSettings: CharacterSelect) => {
      setCharacterList(
        produce((characterList) => {
          characterList[position] = characterSettings;
        }),
      );
    },
    [],
  );

  const openModal = (position: number) => {
    setPosition(position);
    setOpened(true);
  };

  const characterImage = (position: number) => {
    return (
      <Image
        onClick={() => openModal(position)}
        src={`/src/assets/character/char_${characterList[position].id}.png`}
        fallbackSrc="/src/assets/character/char_nr.png"
      />
    );
  };

  const characterInfo = (position: number) => {
    return (
      <>
        <Card padding={"xs"}>
          <Text fw={500} c="yellow">
            {characterList[position].id === null
              ? "未選擇"
              : //@ts-ignore
                character.name[characterList[position].id]}
          </Text>
          <Flex gap={"xs"} wrap={"wrap"}>
            <Text>等級: {characterList[position].level}</Text>
            <Text>星數: {characterList[position].stars}</Text>
            <Text>絆數: {characterList[position].bond}</Text>
            <Text>HP: {characterList[position].hpPot}%</Text>
            <Text>ATK: {characterList[position].atkPot}%</Text>
          </Flex>
        </Card>
      </>
    );
  };

  const validateNumber = (value: string, start: number, end: number) => {
    return (parseInt(value) >= start && parseInt(value) <= end) || value === "";
  };

  return (
    <Container>
      <Space h="lg" />
      <Title order={3}>選擇角色</Title>
      <Space h="xs" />
      <Group grow wrap="nowrap">
        {characterImage(0)}
        {characterImage(1)}
        {characterImage(2)}
        {characterImage(3)}
        {characterImage(4)}
      </Group>
      <Space h="xs" />
      <Stack gap="xs">{characterInfo(0)}</Stack>
      <Space h="xs" />
      <Stack gap="xs">{characterInfo(1)}</Stack>
      <Space h="xs" />
      <Stack gap="xs">{characterInfo(2)}</Stack>
      <Space h="xs" />
      <Stack gap="xs">{characterInfo(3)}</Stack>
      <Space h="xs" />
      <Stack gap="xs">{characterInfo(4)}</Stack>
      <Modal opened={opened} onClose={() => setOpened(false)} title="選擇角色">
        <Select
          data={characterOption}
          value={characterList[position].id}
          onChange={(value) => {
            updateCharacter(position, {
              ...characterList[position],
              id: value ? value : "",
            });
          }}
        />
        <Space h="sm" />
        <Group grow wrap="nowrap">
          <NumberInput
            label="等級"
            allowNegative={false}
            min={1}
            max={60}
            value={characterList[position].level}
            onChange={(value) => {
              if (typeof value === "string") {
                value = parseInt(value);
              }
              updateCharacter(position, {
                ...characterList[position],
                level: value,
              });
            }}
            isAllowed={(numberFormatValue) =>
              validateNumber(numberFormatValue.value, 1, 60)
            }
          />
          <NumberInput
            label="星數"
            allowNegative={false}
            min={3}
            max={5}
            value={characterList[position].stars}
            onChange={(value) => {
              if (typeof value === "string") {
                value = parseInt(value);
              }
              updateCharacter(position, {
                ...characterList[position],
                stars: value,
              });
            }}
            isAllowed={(numberFormatValue) =>
              validateNumber(numberFormatValue.value, 3, 5)
            }
          />
          <NumberInput
            label="絆數"
            allowNegative={false}
            min={1}
            max={5}
            value={characterList[position].bond}
            onChange={(value) => {
              if (typeof value === "string") {
                value = parseInt(value);
              }
              updateCharacter(position, {
                ...characterList[position],
                bond: value,
              });
            }}
            isAllowed={(numberFormatValue) =>
              validateNumber(numberFormatValue.value, 1, 5)
            }
          />
        </Group>
        <Space h="xs" />
        <Group grow wrap="nowrap">
          <NumberInput
            label="HP潛力%"
            allowNegative={false}
            min={1}
            max={100}
            value={characterList[position].hpPot}
            onChange={(value) => {
              if (typeof value === "string") {
                value = parseInt(value);
              }
              updateCharacter(position, {
                ...characterList[position],
                hpPot: value,
              });
            }}
            isAllowed={(numberFormatValue) =>
              validateNumber(numberFormatValue.value, 0, 100)
            }
          />
          <NumberInput
            label="ATK潛力%"
            allowNegative={false}
            min={1}
            max={100}
            value={characterList[position].atkPot}
            onChange={(value) => {
              if (typeof value === "string") {
                value = parseInt(value);
              }
              updateCharacter(position, {
                ...characterList[position],
                atkPot: value,
              });
            }}
            isAllowed={(numberFormatValue) =>
              validateNumber(numberFormatValue.value, 0, 100)
            }
          />
        </Group>
      </Modal>
      <Space h="lg" />
      <Button
        color="blue"
        onClick={() =>
          // @ts-ignore
          setValue(characterList)
        }
      >
        開始戰鬥
      </Button>
    </Container>
  );
}
