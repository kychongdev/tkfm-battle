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
  Checkbox,
  Text,
  SegmentedControl,
  Avatar,
  Center,
} from "@mantine/core";
import { useCallback, useState } from "react";
import character from "../assets/character.json";
import characterDetails from "../assets/characterDetails.json";
import { produce } from "immer";
import { useLocalStorage, useLongPress } from "react-use";
import { initCharacterSelection } from "../battle/Data";
import type { CharacterSelect } from "../types/Character";

// const gallery = Object.values(
//   import.meta.glob("../assets/character/*.{png,jpg,jpeg,PNG,JPEG}", {
//     eager: true,
//     as: "url",
//   }),
// );

export default function SelectCharacterPage() {
  const bond1 = "/tkfm-battle/character/ui_bond_1.png";
  const bond2 = "/tkfm-battle/character/ui_bond_2.png";
  const bond3 = "/tkfm-battle/character/ui_bond_3.png";
  const bond4 = "/tkfm-battle/character/ui_bond_4.png";
  const bond5 = "/tkfm-battle/character/ui_bond_5.png";
  const star = "/tkfm-battle/character/ui_star_ssr.png";
  const atk = "/tkfm-battle/character/ui_small_atk.png";
  const hp = "/tkfm-battle/character/ui_small_hp.png";
  function generateCharOptions() {
    const characterOptions = [];
    for (const [key, value] of Object.entries(character.name)) {
      const available = [
        "163",
        "172",
        "177",
        "178",
        "179",
        "196",
        "198",
        "508",
        "514",
        "517",
        "518",
        "523",
        "525",
        "526",
        "528",
        "601",
      ];
      if (available.includes(key)) {
        const find = characterDetails.find((item) => item.id === key);
        if (
          find &&
          find.tags.attribute === +attributeOptions &&
          find.tags.position === +classOptions
        ) {
          characterOptions.push({ value: key, label: value });
        }
      }
    }
    return characterOptions;
  }

  const [attributeOptions, setAttributeOptions] = useState("0");
  const [classOptions, setClassOptions] = useState("5");

  const [saved1, saveTeam1, removeTeam1] =
    useLocalStorage<CharacterSelect[]>("saved-team");
  const [saved2, saveTeam2, removeTeam2] =
    useLocalStorage<CharacterSelect[]>("saved-team2");
  const [saved3, saveTeam3, removeTeam3] =
    useLocalStorage<CharacterSelect[]>("saved-team3");
  const [saved4, saveTeam4, removeTeam4] =
    useLocalStorage<CharacterSelect[]>("saved-team4");
  const [saved5, saveTeam5, removeTeam5] =
    useLocalStorage<CharacterSelect[]>("saved-team5");

  const defaultOptions = {
    isPreventDefault: false,
    delay: 1000,
  };
  const longPress1 = useLongPress(() => {
    if (saved1) {
      setCharacterList(saved1);
      setOpenTeam(false);
    }
  }, defaultOptions);
  const longPress2 = useLongPress(() => {
    if (saved2) {
      setCharacterList(saved2);
      setOpenTeam(false);
    }
  }, defaultOptions);
  const longPress3 = useLongPress(() => {
    if (saved3) {
      setCharacterList(saved3);
      setOpenTeam(false);
    }
  }, defaultOptions);
  const longPress4 = useLongPress(() => {
    if (saved4) {
      setCharacterList(saved4);
      setOpenTeam(false);
    }
  }, defaultOptions);
  const longPress5 = useLongPress(() => {
    if (saved5) {
      setCharacterList(saved5);
      setOpenTeam(false);
    }
  }, defaultOptions);

  const [opened, setOpened] = useState(false);
  const [openTeam, setOpenTeam] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [position, setPosition] = useState<number>(1);
  const [selectedSlot, setSelectedSlot] = useState<number>(0);
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
    const bond = characterList[position].bond;
    const stars = characterList[position].stars;
    const hpPot = characterList[position].hpPot;
    const atkPot = characterList[position].atkPot;
    const room = characterList[position].disclipline;
    return (
      <Stack>
        <Image
          onClick={() => openModal(position)}
          src={`/tkfm-battle/character/char_${characterList[position].id}.png`}
          fallbackSrc="/tkfm-battle/character/char_nr.png"
        />
        <div>Lvl. {characterList[position].level}</div>
        <Image
          src={
            bond === 1
              ? bond1
              : bond === 2
                ? bond2
                : bond === 3
                  ? bond3
                  : bond === 4
                    ? bond4
                    : bond5
          }
        />
        <Group grow wrap="nowrap">
          <Image src={star} />
          {stars}
        </Group>
        <Group grow wrap="nowrap">
          <Image src={hp} />
          {hpPot}%
        </Group>
        <Group grow wrap="nowrap">
          <Image src={atk} />
          {atkPot}%
        </Group>
        <Group grow wrap="nowrap">
          寢{room}
        </Group>
      </Stack>
    );
  };

  const validateNumber = (value: string, start: number, end: number) => {
    return (
      (Number.parseInt(value) >= start && Number.parseInt(value) <= end) ||
      value === ""
    );
  };

  return (
    <Container>
      <Space h="xs" />
      <Title order={3}>選擇角色</Title>
      <Space h="xs" />
      <Group grow wrap="nowrap">
        {characterImage(0)}
        {characterImage(1)}
        {characterImage(2)}
        {characterImage(3)}
        {characterImage(4)}
      </Group>
      <Modal opened={opened} onClose={() => setOpened(false)} title="選擇角色">
        <Group grow wrap="nowrap">
          <SegmentedControl
            color="yellow"
            value={attributeOptions}
            onChange={setAttributeOptions}
            data={[
              {
                value: "0",
                label: (
                  <Center>
                    <Avatar src="/tkfm-battle/character/fire.jpg" />
                  </Center>
                ),
              },
              {
                value: "1",
                label: (
                  <Center>
                    <Avatar src="/tkfm-battle/character/water.jpg" />
                  </Center>
                ),
              },
              {
                value: "2",
                label: (
                  <Center>
                    <Avatar src="/tkfm-battle/character/wind.jpg" />
                  </Center>
                ),
              },
              {
                value: "3",
                label: (
                  <Center>
                    <Avatar src="/tkfm-battle/character/light.jpg" />
                  </Center>
                ),
              },
              {
                value: "4",
                label: (
                  <Center>
                    <Avatar src="/tkfm-battle/character/dark.jpg" />
                  </Center>
                ),
              },
            ]}
          />
        </Group>
        <Space h="xs" />

        <Group grow wrap="nowrap">
          <SegmentedControl
            color="yellow"
            value={classOptions}
            onChange={setClassOptions}
            data={[
              {
                value: "5",
                label: (
                  <Center>
                    <Avatar src="/tkfm-battle/character/ui_attacker.png" />
                  </Center>
                ),
              },
              {
                value: "6",
                label: (
                  <Center>
                    <Avatar src="/tkfm-battle/character/ui_defender.png" />
                  </Center>
                ),
              },
              {
                value: "7",
                label: (
                  <Center>
                    <Avatar src="/tkfm-battle/character/ui_healer.png" />
                  </Center>
                ),
              },
              {
                value: "8",
                label: (
                  <Center>
                    <Avatar src="/tkfm-battle/character/ui_obsructer.png" />
                  </Center>
                ),
              },
              {
                value: "9",
                label: (
                  <Center>
                    <Avatar src="/tkfm-battle/character/ui_supporter.png" />
                  </Center>
                ),
              },
            ]}
          />
        </Group>
        <Space h="xs" />
        <Select
          checkIconPosition="left"
          data={generateCharOptions()}
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
                const _value = Number.parseInt(value);
                updateCharacter(position, {
                  ...characterList[position],
                  level: _value,
                });
              } else {
                updateCharacter(position, {
                  ...characterList[position],
                  level: value,
                });
              }
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
                const _value = Number.parseInt(value);
                updateCharacter(position, {
                  ...characterList[position],
                  stars: _value,
                });
              } else {
                updateCharacter(position, {
                  ...characterList[position],
                  stars: value,
                });
              }
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
                const _value = Number.parseInt(value);
                updateCharacter(position, {
                  ...characterList[position],
                  bond: _value,
                });
              } else {
                updateCharacter(position, {
                  ...characterList[position],
                  bond: value,
                });
              }
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
            min={0}
            max={100}
            value={characterList[position].hpPot}
            onChange={(value) => {
              if (typeof value === "string") {
                const _value = Number.parseInt(value);
                updateCharacter(position, {
                  ...characterList[position],
                  hpPot: _value,
                });
              } else {
                updateCharacter(position, {
                  ...characterList[position],
                  hpPot: value,
                });
              }
            }}
            isAllowed={(numberFormatValue) =>
              validateNumber(numberFormatValue.value, 0, 100)
            }
          />
          <NumberInput
            label="ATK潛力%"
            allowNegative={false}
            min={0}
            max={100}
            value={characterList[position].atkPot}
            onChange={(value) => {
              if (typeof value === "string") {
                const _value = Number.parseInt(value);
                updateCharacter(position, {
                  ...characterList[position],
                  atkPot: _value,
                });
              }
              updateCharacter(position, {
                ...characterList[position],
                atkPot: +value,
              });
            }}
            isAllowed={(numberFormatValue) =>
              validateNumber(numberFormatValue.value, 0, 100)
            }
          />
          <NumberInput
            label="寢"
            allowNegative={false}
            min={0}
            max={3}
            value={characterList[position].disclipline}
            onChange={(value) => {
              if (typeof value === "string") {
                const _value = Number.parseInt(value);
                updateCharacter(position, {
                  ...characterList[position],
                  disclipline: _value,
                });
              }
              updateCharacter(position, {
                ...characterList[position],
                disclipline: +value,
              });
            }}
            isAllowed={(numberFormatValue) =>
              validateNumber(numberFormatValue.value, 0, 3)
            }
          />
        </Group>
        <Space h="lg" />
        <Checkbox
          checked={characterList[position].pot6}
          onChange={(event) =>
            updateCharacter(position, {
              ...characterList[position],
              pot6: event.currentTarget.checked,
            })
          }
          label="潛6被動"
        />
      </Modal>
      <Space h="lg" />
      <Button
        onClick={() => {
          setOpenTeam(true);
        }}
      >
        打開隊伍欄
      </Button>
      <Modal
        title="選擇儲存欄"
        opened={openTeam}
        onClose={() => {
          setOpenTeam(false);
        }}
      >
        <Group
          grow
          wrap="nowrap"
          gap="xs"
          style={{
            border: "1px solid",
            borderRadius: "5px",
          }}
          {...longPress1}
          onClick={() => {
            setSelectedSlot(0);
            setConfirm(true);
          }}
        >
          <Image
            src={`/tkfm-battle/character/char_small_${saved1 ? saved1[0].id : "scarecow"}.png`}
            fallbackSrc={"/tkfm-battle/character/x.png"}
          />
          <Image
            src={`/tkfm-battle/character/char_small_${saved1 ? saved1[1].id : "scarecow"}.png`}
            fallbackSrc={"/tkfm-battle/character/x.png"}
          />
          <Image
            src={`/tkfm-battle/character/char_small_${saved1 ? saved1[2].id : "scarecow"}.png`}
            fallbackSrc={"/tkfm-battle/character/x.png"}
          />
          <Image
            src={`/tkfm-battle/character/char_small_${saved1 ? saved1[3].id : "scarecow"}.png`}
            fallbackSrc={"/tkfm-battle/character/x.png"}
          />
          <Image
            src={`/tkfm-battle/character/char_small_${saved1 ? saved1[4].id : "scarecow"}.png`}
            fallbackSrc={"/tkfm-battle/character/x.png"}
          />
        </Group>
        <Space h="lg" />
        <Group
          grow
          wrap="nowrap"
          gap="xs"
          style={{
            border: "1px solid",
            borderRadius: "5px",
          }}
          {...longPress2}
          onClick={() => {
            setSelectedSlot(1);
            setConfirm(true);
          }}
        >
          <Image
            src={`/tkfm-battle/character/char_small_${saved2 ? saved2[0].id : "scarecow"}.png`}
            fallbackSrc={"/tkfm-battle/character/x.png"}
          />
          <Image
            src={`/tkfm-battle/character/char_small_${saved2 ? saved2[1].id : "scarecow"}.png`}
            fallbackSrc={"/tkfm-battle/character/x.png"}
          />
          <Image
            src={`/tkfm-battle/character/char_small_${saved2 ? saved2[2].id : "scarecow"}.png`}
            fallbackSrc={"/tkfm-battle/character/x.png"}
          />
          <Image
            src={`/tkfm-battle/character/char_small_${saved2 ? saved2[3].id : "scarecow"}.png`}
            fallbackSrc={"/tkfm-battle/character/x.png"}
          />
          <Image
            src={`/tkfm-battle/character/char_small_${saved2 ? saved2[4].id : "scarecow"}.png`}
            fallbackSrc={"/tkfm-battle/character/x.png"}
          />
        </Group>
        <Space h="lg" />
        <Group
          grow
          wrap="nowrap"
          gap="xs"
          style={{
            border: "1px solid",
            borderRadius: "5px",
          }}
          {...longPress3}
          onClick={() => {
            setSelectedSlot(2);
            setConfirm(true);
          }}
        >
          <Image
            src={`/tkfm-battle/character/char_small_${saved3 ? saved3[0].id : "scarecow"}.png`}
            fallbackSrc={"/tkfm-battle/character/x.png"}
          />
          <Image
            src={`/tkfm-battle/character/char_small_${saved3 ? saved3[1].id : "scarecow"}.png`}
            fallbackSrc={"/tkfm-battle/character/x.png"}
          />
          <Image
            src={`/tkfm-battle/character/char_small_${saved3 ? saved3[2].id : "scarecow"}.png`}
            fallbackSrc={"/tkfm-battle/character/x.png"}
          />
          <Image
            src={`/tkfm-battle/character/char_small_${saved3 ? saved3[3].id : "scarecow"}.png`}
            fallbackSrc={"/tkfm-battle/character/x.png"}
          />
          <Image
            src={`/tkfm-battle/character/char_small_${saved3 ? saved3[4].id : "scarecow"}.png`}
            fallbackSrc={"/tkfm-battle/character/x.png"}
          />
        </Group>
        <Space h="lg" />
        <Group
          grow
          wrap="nowrap"
          gap="xs"
          style={{
            border: "1px solid",
            borderRadius: "5px",
          }}
          {...longPress4}
          onClick={() => {
            setSelectedSlot(3);
            setConfirm(true);
          }}
        >
          <Image
            src={`/tkfm-battle/character/char_small_${saved4 ? saved4[0].id : "scarecow"}.png`}
            fallbackSrc={"/tkfm-battle/character/x.png"}
          />
          <Image
            src={`/tkfm-battle/character/char_small_${saved4 ? saved4[1].id : "scarecow"}.png`}
            fallbackSrc={"/tkfm-battle/character/x.png"}
          />
          <Image
            src={`/tkfm-battle/character/char_small_${saved4 ? saved4[2].id : "scarecow"}.png`}
            fallbackSrc={"/tkfm-battle/character/x.png"}
          />
          <Image
            src={`/tkfm-battle/character/char_small_${saved4 ? saved4[3].id : "scarecow"}.png`}
            fallbackSrc={"/tkfm-battle/character/x.png"}
          />
          <Image
            src={`/tkfm-battle/character/char_small_${saved4 ? saved4[4].id : "scarecow"}.png`}
            fallbackSrc={"/tkfm-battle/character/x.png"}
          />
        </Group>
        <Space h="lg" />
        <Group
          grow
          wrap="nowrap"
          gap="xs"
          style={{
            border: "1px solid",
            borderRadius: "5px",
          }}
          {...longPress5}
          onClick={() => {
            setSelectedSlot(4);
            setConfirm(true);
          }}
        >
          <Image
            src={`/tkfm-battle/character/char_small_${saved5 ? saved5[0].id : "scarecow"}.png`}
            fallbackSrc={"/tkfm-battle/character/x.png"}
          />
          <Image
            src={`/tkfm-battle/character/char_small_${saved5 ? saved5[1].id : "scarecow"}.png`}
            fallbackSrc={"/tkfm-battle/character/x.png"}
          />
          <Image
            src={`/tkfm-battle/character/char_small_${saved5 ? saved5[2].id : "scarecow"}.png`}
            fallbackSrc={"/tkfm-battle/character/x.png"}
          />
          <Image
            src={`/tkfm-battle/character/char_small_${saved5 ? saved5[3].id : "scarecow"}.png`}
            fallbackSrc={"/tkfm-battle/character/x.png"}
          />
          <Image
            src={`/tkfm-battle/character/char_small_${saved5 ? saved5[4].id : "scarecow"}.png`}
            fallbackSrc={"/tkfm-battle/character/x.png"}
          />
        </Group>
        <Space h="lg" />
        <Text>*點擊以儲存隊伍,長按以載入隊伍</Text>
        <Text>*更改數據也需要重新儲存</Text>
      </Modal>
      <Modal
        title={"確認要儲存這個隊伍嗎?"}
        centered
        opened={confirm}
        onClose={() => setConfirm(false)}
      >
        <Group
          grow
          wrap="nowrap"
          gap="xs"
          {...longPress5}
          onClick={() => {
            saveTeam5(characterList);
          }}
        >
          <Image
            src={`/tkfm-battle/character/char_small_${characterList[0].id}.png`}
            fallbackSrc={"/tkfm-battle/character/x.png"}
          />
          <Image
            src={`/tkfm-battle/character/char_small_${characterList[1].id}.png`}
            fallbackSrc={"/tkfm-battle/character/x.png"}
          />
          <Image
            src={`/tkfm-battle/character/char_small_${characterList[2].id}.png`}
            fallbackSrc={"/tkfm-battle/character/x.png"}
          />
          <Image
            src={`/tkfm-battle/character/char_small_${characterList[3].id}.png`}
            fallbackSrc={"/tkfm-battle/character/x.png"}
          />
          <Image
            src={`/tkfm-battle/character/char_small_${characterList[4].id}.png`}
            fallbackSrc={"/tkfm-battle/character/x.png"}
          />
        </Group>
        <Space h="xs" />
        <Group justify="end">
          <Button
            onClick={() => {
              switch (selectedSlot) {
                case 0:
                  saveTeam1(characterList);
                  setConfirm(false);
                  break;
                case 1:
                  saveTeam2(characterList);
                  setConfirm(false);
                  break;
                case 2:
                  saveTeam3(characterList);
                  setConfirm(false);
                  break;
                case 3:
                  saveTeam4(characterList);
                  setConfirm(false);
                  break;
                case 4:
                  saveTeam5(characterList);
                  setConfirm(false);
                  break;
              }
            }}
          >
            確認
          </Button>
          <Button color="red" onClick={() => setConfirm(false)}>
            取消
          </Button>
        </Group>
      </Modal>
    </Container>
  );
}
