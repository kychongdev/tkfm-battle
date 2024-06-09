import {
  AspectRatio,
  Button,
  Image,
  Modal,
  Overlay,
  Progress,
  SegmentedControl,
  Space,
  Stack,
} from "@mantine/core";
import { useGameState } from "../battle/GameState";
import { formatNumber } from "../battle/utilities";
import { useState } from "react";
import { BuffList } from "./BuffList";
import { StatsList } from "./StatsList";
import { AffectType } from "../types/Skill";

export function CharacterBattleButton(props: { position: number }) {
  const basicMove = useGameState((state) => state.basicMove);
  const ultimateMove = useGameState((state) => state.ultimateMove);
  const character = useGameState((state) => state.characters[props.position]);
  const [opened, setOpened] = useState(false);
  const [stats, setStats] = useState("attribute");

  return (
    <Stack gap={0}>
      <Modal
        padding={"xs"}
        opened={opened}
        withCloseButton={false}
        onClose={() => {
          setOpened(false);
        }}
      >
        <SegmentedControl
          value={stats}
          onChange={setStats}
          data={[
            {
              label: "屬性",
              value: "attribute",
            },
            {
              label: "狀態欄",
              value: "buff",
            },
          ]}
        />
        <Space h="xs" />
        {stats === "attribute" ? <StatsList character={character} /> : null}
        {stats === "buff" ? <BuffList character={character} /> : null}
      </Modal>
      <AspectRatio ratio={167 / 512} pos={"relative"}>
        <Image
          onClick={() => basicMove(props.position)}
          src={`/tkfm-battle/character/char_${character.id}.png`}
          fallbackSrc="/tkfm-battle/character/char_nr.png"
        />
        {character.isMoved || !character.isExist || character.isDead ? (
          <Overlay color="#000" backgroundOpacity={0.85} />
        ) : null}
      </AspectRatio>
      <Progress value={(character.hp / character.maxHp) * 100} radius={0} />
      <div>{formatNumber(character.hp)}</div>
      <Space h="xs" />
      <Button
        onClick={() => ultimateMove(props.position)}
        disabled={character.isMoved || character.cd !== 0}
      >
        必殺
      </Button>
      <Space h="xs" />
      {
        //<Button onClick={() => console.log("guard")}>防御</Button>}
      }
      {
        // <Space h="xs" />}
      }
      <Button
        onClick={() => {
          setOpened(true);
        }}
      >
        狀態
      </Button>
    </Stack>
  );
}
