import { useLocalStorage } from "react-use";
import characterDetails from "../assets/characterDetails.json";
import {
  Center,
  Container,
  Group,
  Space,
  Image,
  Progress,
  Button,
  Modal,
  Text,
} from "@mantine/core";
import { CharacterBattleButton } from "../components/CharacterBattleButton";
import type { CharacterSelect, CharacterState } from "../types/Character";
import { Attribute } from "../types/Character";
import favicon from "../assets/character/favicon.png";
import { useGameState } from "../battle/GameState";
import { IconEdit } from "@tabler/icons-react";
import { useState } from "react";
import char from "../assets/character/char_small_101.png";
import { calculateStats } from "../battle/Calculate";
import { formatNumber } from "../battle/utilies";
import { BuffList } from "../components/BuffList";

export default function Battle() {
  const [value] = useLocalStorage<CharacterSelect[]>("last-session");
  const [saved] = useLocalStorage<CharacterSelect[]>("saved-team");
  const [opened, setOpened] = useState(false);
  const [enemyStatus, setEnemyStatus] = useState(false);

  const turns = useGameState((state) => state.turns);
  const addTurn = useGameState((state) => state.addTurn);
  const initCharacters = useGameState((state) => state.init);
  const enemy = useGameState((state) => state.enemy);
  // const character = useGameState((state) => state.characters);
  const activeLeader = useGameState((state) => state.initLeaderSkill);

  function initTeam() {
    if (value) {
      const battleCharacters: CharacterState[] = value.map((character) => {
        if (character.id !== "") {
          const characterDetail = characterDetails.find(
            (detail) => detail.id === character.id,
          );
          const maxHp = calculateStats(
            characterDetail ? characterDetail.stats.initHP : 0,
            character.level,
            character.stars,
            character.disclipline,
            character.hpPot,
          );
          const maxAtk = calculateStats(
            characterDetail ? characterDetail.stats.initATK : 0,
            character.level,
            character.stars,
            character.disclipline,
            character.atkPot,
          );
          return {
            id: character.id,
            isExist: true,
            baseAtk: characterDetail ? characterDetail.stats.initATK : 0,
            baseHp: characterDetail ? characterDetail.stats.initHP : 0,
            maxAtk: maxAtk,
            maxHp: maxHp,
            atk: maxAtk,
            hp: maxHp,
            bond: character.bond,
            class: characterDetail ? characterDetail.tags.position : 5,
            attribute: characterDetail
              ? characterDetail.tags.attribute
              : Attribute.NONE,
            position: character.position,
            shield: 0,
            cd: characterDetail?.stats.cd ?? 0,
            maxCd: characterDetail?.stats.cd ?? 0,
            ultimateName: "",
            isMoved: false,
            isGuard: false,
            isBroken: false,
            isTaunt: false,
            isParalysis: false,
            isSleep: false,
            isSilence: false,
            isDead: false,
            buff: [],
          };
        }
        return {
          id: character.id,
          isExist: false,
          baseAtk: 0,
          baseHp: 0,
          maxHp: 0,
          maxAtk: 0,
          atk: 0,
          hp: 0,
          bond: 1,
          attribute: Attribute.NONE,
          position: character.position,
          class: 5,
          cd: 0,
          maxCd: 0,
          ultimateName: "",
          shield: 0,
          isMoved: false,
          isGuard: false,
          isBroken: false,
          isTaunt: false,
          isParalysis: false,
          isSleep: false,
          isSilence: false,
          isDead: false,
          buff: [],
        };
      });
      initCharacters(battleCharacters);
    }
  }

  function startGame() {
    activeLeader();
    addTurn();
  }

  return (
    <Container>
      <Modal
        padding={"xs"}
        opened={enemyStatus}
        onClose={() => {
          setEnemyStatus(false);
        }}
      >
        <BuffList character={enemy} />
      </Modal>
      <Space h="lg" />
      <Center>木樁</Center>
      <Text m="sm">第{turns}回合</Text>
      <Progress value={(enemy.hp / enemy.maxHp) * 100} m="sm" />
      <Text>
        {formatNumber(enemy.hp)}/ {formatNumber(enemy.maxHp)}
      </Text>
      <Center m="xl">
        <Image
          src={favicon}
          onClick={() => {
            setEnemyStatus(true);
          }}
        />
      </Center>
      <Group grow wrap="nowrap" gap="xs">
        <CharacterBattleButton position={0} />
        <CharacterBattleButton position={1} />
        <CharacterBattleButton position={2} />
        <CharacterBattleButton position={3} />
        <CharacterBattleButton position={4} />
      </Group>
      <Space h="sm" />
      <Group justify="end">
        <Button onClick={() => startGame()}>開始</Button>
        <Button onClick={() => setOpened(true)}>
          <IconEdit />
        </Button>
      </Group>
      <Modal
        title="讀取隊伍"
        opened={opened}
        onClose={() => {
          initTeam();
          setOpened(false);
        }}
      >
        <Group grow wrap="nowrap" gap="xs">
          <Image src={char} />
          <Image src={char} />
          <Image src={char} />
          <Image src={char} />
          <Image src={char} />
        </Group>
      </Modal>
    </Container>
  );
}
