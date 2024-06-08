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
  SegmentedControl,
  Accordion,
  AccordionItem,
  Title,
  Divider,
} from "@mantine/core";
import { CharacterBattleButton } from "../components/CharacterBattleButton";
import type { CharacterSelect, CharacterState } from "../types/Character";
import { Attribute } from "../types/Character";
import favicon from "/character/favicon.png";
import { useGameState } from "../battle/GameState";
import { IconEdit } from "@tabler/icons-react";
import { useState } from "react";
import { calculateStats } from "../battle/calculate";
import { formatNumber } from "../battle/utilities";
import { BuffList } from "../components/BuffList";
import characterJson from "../assets/character.json";
import { LogList } from "../components/LogList";
import { DonutChart } from "@mantine/charts";

export default function Battle() {
  const [saved1] = useLocalStorage<CharacterSelect[]>("saved-team");
  const [saved2] = useLocalStorage<CharacterSelect[]>("saved-team2");
  const [saved3] = useLocalStorage<CharacterSelect[]>("saved-team3");
  const [saved4] = useLocalStorage<CharacterSelect[]>("saved-team4");
  const [saved5] = useLocalStorage<CharacterSelect[]>("saved-team5");
  const [opened, setOpened] = useState(false);
  const [enemyStatus, setEnemyStatus] = useState(false);
  const [logStatus, openLog] = useState(false);
  const [logOption, setLogOption] = useState("damage");

  const turns = useGameState((state) => state.turns);
  const addTurn = useGameState((state) => state.addTurn);
  const initCharacters = useGameState((state) => state.init);
  const enemies = useGameState((state) => state.enemies);
  const targeting = useGameState((state) => state.targeting);
  const activeLeader = useGameState((state) => state.initLeaderSkill);
  const log = useGameState((state) => state.log);
  const resetBattle = useGameState((state) => state.resetBattle);
  const initPassive = useGameState((state) => state.initPassiveSkill);
  const applyHpBuff = useGameState((state) => state.applyHPBuff);
  const characters = useGameState((state) => state.characters);

  const totalDamage = useGameState((state) =>
    state.damageLog.reduce((acc, log) => acc + log.damage, 0),
  );
  const triggerDamage = useGameState((state) =>
    state.damageLog.reduce((acc, log) => {
      if (log.type === "trigger") {
        return acc + log.damage;
      }
      return acc;
    }, 0),
  );
  const ultimateDamage = useGameState((state) =>
    state.damageLog.reduce((acc, log) => {
      if (log.type === "ultimate") {
        return acc + log.damage;
      }
      return acc;
    }, 0),
  );
  const basicDamage = useGameState((state) =>
    state.damageLog.reduce((acc, log) => {
      if (log.type === "basic") {
        return acc + log.damage;
      }
      return acc;
    }, 0),
  );
  const sourceBasic = useGameState((state) =>
    state.damageLog.reduce((acc, log) => {
      if (log.source === "basic") {
        return acc + log.damage;
      }
      return acc;
    }, 0),
  );
  const sourceUltimate = useGameState((state) =>
    state.damageLog.reduce((acc, log) => {
      if (log.source === "ultimate") {
        return acc + log.damage;
      }
      return acc;
    }, 0),
  );
  const sourceNone = useGameState((state) =>
    state.damageLog.reduce((acc, log) => {
      if (log.source === "none") {
        return acc + log.damage;
      }
      return acc;
    }, 0),
  );

  const totalDamage1 = useGameState((state) =>
    state.damageLog1.reduce((acc, log) => acc + log.damage, 0),
  );

  const triggerDamage1 = useGameState((state) =>
    state.damageLog1.reduce((acc, log) => {
      if (log.type === "trigger") {
        return acc + log.damage;
      }
      return acc;
    }, 0),
  );
  const ultimateDamage1 = useGameState((state) =>
    state.damageLog1.reduce((acc, log) => {
      if (log.type === "ultimate") {
        return acc + log.damage;
      }
      return acc;
    }, 0),
  );
  const basicDamage1 = useGameState((state) =>
    state.damageLog1.reduce((acc, log) => {
      if (log.type === "basic") {
        return acc + log.damage;
      }
      return acc;
    }, 0),
  );

  const sourceBasic1 = useGameState((state) =>
    state.damageLog1.reduce((acc, log) => {
      if (log.source === "basic") {
        return acc + log.damage;
      }
      return acc;
    }, 0),
  );
  const sourceUltimate1 = useGameState((state) =>
    state.damageLog1.reduce((acc, log) => {
      if (log.source === "ultimate") {
        return acc + log.damage;
      }
      return acc;
    }, 0),
  );
  const sourceNone1 = useGameState((state) =>
    state.damageLog1.reduce((acc, log) => {
      if (log.source === "none") {
        return acc + log.damage;
      }
      return acc;
    }, 0),
  );

  const totalDamage2 = useGameState((state) =>
    state.damageLog2.reduce((acc, log) => acc + log.damage, 0),
  );

  const triggerDamage2 = useGameState((state) =>
    state.damageLog2.reduce((acc, log) => {
      if (log.type === "trigger") {
        return acc + log.damage;
      }
      return acc;
    }, 0),
  );

  const ultimateDamage2 = useGameState((state) =>
    state.damageLog2.reduce((acc, log) => {
      if (log.type === "ultimate") {
        return acc + log.damage;
      }
      return acc;
    }, 0),
  );

  const basicDamage2 = useGameState((state) =>
    state.damageLog2.reduce((acc, log) => {
      if (log.type === "basic") {
        return acc + log.damage;
      }
      return acc;
    }, 0),
  );

  const sourceBasic2 = useGameState((state) =>
    state.damageLog2.reduce((acc, log) => {
      if (log.source === "basic") {
        return acc + log.damage;
      }
      return acc;
    }, 0),
  );

  const sourceUltimate2 = useGameState((state) =>
    state.damageLog2.reduce((acc, log) => {
      if (log.source === "ultimate") {
        return acc + log.damage;
      }
      return acc;
    }, 0),
  );

  const sourceNone2 = useGameState((state) =>
    state.damageLog2.reduce((acc, log) => {
      if (log.source === "none") {
        return acc + log.damage;
      }
      return acc;
    }, 0),
  );

  const totalDamage3 = useGameState((state) =>
    state.damageLog3.reduce((acc, log) => acc + log.damage, 0),
  );

  const triggerDamage3 = useGameState((state) =>
    state.damageLog3.reduce((acc, log) => {
      if (log.type === "trigger") {
        return acc + log.damage;
      }
      return acc;
    }, 0),
  );

  const ultimateDamage3 = useGameState((state) =>
    state.damageLog3.reduce((acc, log) => {
      if (log.type === "ultimate") {
        return acc + log.damage;
      }
      return acc;
    }, 0),
  );

  const basicDamage3 = useGameState((state) =>
    state.damageLog3.reduce((acc, log) => {
      if (log.type === "basic") {
        return acc + log.damage;
      }
      return acc;
    }, 0),
  );

  const sourceBasic3 = useGameState((state) =>
    state.damageLog3.reduce((acc, log) => {
      if (log.source === "basic") {
        return acc + log.damage;
      }
      return acc;
    }, 0),
  );

  const sourceUltimate3 = useGameState((state) =>
    state.damageLog3.reduce((acc, log) => {
      if (log.source === "ultimate") {
        return acc + log.damage;
      }
      return acc;
    }, 0),
  );

  const sourceNone3 = useGameState((state) =>
    state.damageLog3.reduce((acc, log) => {
      if (log.source === "none") {
        return acc + log.damage;
      }
      return acc;
    }, 0),
  );

  const totalDamage4 = useGameState((state) =>
    state.damageLog4.reduce((acc, log) => acc + log.damage, 0),
  );

  const triggerDamage4 = useGameState((state) =>
    state.damageLog4.reduce((acc, log) => {
      if (log.type === "trigger") {
        return acc + log.damage;
      }
      return acc;
    }, 0),
  );

  const ultimateDamage4 = useGameState((state) =>
    state.damageLog4.reduce((acc, log) => {
      if (log.type === "ultimate") {
        return acc + log.damage;
      }
      return acc;
    }, 0),
  );

  const basicDamage4 = useGameState((state) =>
    state.damageLog4.reduce((acc, log) => {
      if (log.type === "basic") {
        return acc + log.damage;
      }
      return acc;
    }, 0),
  );

  const sourceBasic4 = useGameState((state) =>
    state.damageLog4.reduce((acc, log) => {
      if (log.source === "basic") {
        return acc + log.damage;
      }
      return acc;
    }, 0),
  );

  const sourceUltimate4 = useGameState((state) =>
    state.damageLog4.reduce((acc, log) => {
      if (log.source === "ultimate") {
        return acc + log.damage;
      }
      return acc;
    }, 0),
  );

  const sourceNone4 = useGameState((state) =>
    state.damageLog4.reduce((acc, log) => {
      if (log.source === "none") {
        return acc + log.damage;
      }
      return acc;
    }, 0),
  );

  const teamTotalDamage =
    totalDamage + totalDamage1 + totalDamage2 + totalDamage3 + totalDamage4;

  function initTeam(value: CharacterSelect[] | undefined) {
    if (value) {
      const battleCharacters: CharacterState[] = value.map((character) => {
        if (character.id !== "") {
          const characterDetail = characterDetails.find(
            (detail) => detail.id === character.id,
          );
          //@ts-ignore
          const characterInfo: string = characterJson.name[character.id];

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
            name: characterInfo,
            isExist: true,
            baseAtk: characterDetail ? characterDetail.stats.initATK : 0,
            baseHp: characterDetail ? characterDetail.stats.initHP : 0,
            maxAtk: maxAtk,
            maxHp: maxHp,
            stars: character.stars,
            passive4: character.pot6,
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
          name: "",
          isExist: false,
          baseAtk: 0,
          baseHp: 0,
          maxHp: 0,
          maxAtk: 0,
          atk: 0,
          hp: 0,
          bond: 1,
          stars: 3,
          passive4: false,
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
    resetBattle();
    activeLeader();
    initPassive();
    applyHpBuff();
    addTurn();
  }
  function restartGame() {
    resetBattle();
    activeLeader();
    initPassive();
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
        <BuffList character={enemies[targeting]} />
      </Modal>
      <Text>第{turns}回合</Text>
      <Space h="sm" />
      <Progress
        value={(enemies[targeting].hp / enemies[targeting].maxHp) * 100}
      />
      <Space h="sm" />
      <Text>
        {formatNumber(enemies[targeting].hp)}/
        {formatNumber(enemies[targeting].maxHp)}
      </Text>
      <Center m="xl">
        <Image
          height={150}
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
        <Button onClick={() => openLog(true)}>傷害紀錄</Button>
        <Button onClick={() => restartGame()}>重新開始</Button>
        <Button onClick={() => setOpened(true)}>
          <IconEdit />
          選擇隊伍
        </Button>
      </Group>
      <Modal
        title="選擇儲存欄"
        opened={opened}
        onClose={() => {
          setOpened(false);
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
          onClick={() => {
            initTeam(saved1);
            startGame();
            setOpened(false);
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
          onClick={() => {
            initTeam(saved2);
            startGame();
            setOpened(false);
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
          onClick={() => {
            initTeam(saved3);
            startGame();
            setOpened(false);
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
          onClick={() => {
            initTeam(saved4);
            startGame();
            setOpened(false);
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
          onClick={() => {
            initTeam(saved5);
            startGame();
            setOpened(false);
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
      </Modal>
      <Modal
        padding={"xs"}
        opened={logStatus}
        onClose={() => {
          openLog(false);
        }}
        withCloseButton={false}
      >
        <SegmentedControl
          value={logOption}
          onChange={setLogOption}
          data={[
            { label: "傷害比例", value: "damage" },
            { label: "輸出清單", value: "all" },
          ]}
        />
        <Space h="sm" />
        {logOption === "all" ? <LogList logs={log} /> : null}
        {logOption === "damage" ? (
          <>
            <Center>
              <DonutChart
                withLabelsLine
                withLabels
                valueFormatter={(value) => `${value}%`}
                data={[
                  {
                    name: characters[0].name,
                    value: +(totalDamage / teamTotalDamage).toFixed(4) * 100,
                    color: "indigo.6",
                  },
                  {
                    name: characters[1].name,
                    value: +(totalDamage1 / teamTotalDamage).toFixed(4) * 100,
                    color: "cyan.6",
                  },
                  {
                    name: characters[2].name,
                    value: +(totalDamage2 / teamTotalDamage).toFixed(4) * 100,
                    color: "red.6",
                  },
                  {
                    name: characters[3].name,
                    value: +(totalDamage3 / teamTotalDamage).toFixed(4) * 100,
                    color: "yellow.6",
                  },
                  {
                    name: characters[4].name,
                    value: +(totalDamage4 / teamTotalDamage).toFixed(4) * 100,
                    color: "green.6",
                  },
                ]}
              />
            </Center>
            <Space h="sm" />
            <Center>
              <Title order={5}>總傷害</Title>
            </Center>
            <Space h="sm" />
            <Accordion variant="contained">
              <AccordionItem value="1">
                <Accordion.Control>
                  {characters[0].name}: {formatNumber(totalDamage)}
                </Accordion.Control>
                <Accordion.Panel>
                  <Text>普攻型攻擊: {formatNumber(basicDamage)}</Text>
                  <Text>必殺型傷害: {formatNumber(ultimateDamage)}</Text>
                  <Text>觸發型傷害: {formatNumber(triggerDamage)}</Text>
                  <Divider my="sm" />
                  <Text>普攻傷害: {formatNumber(sourceBasic)}</Text>
                  <Text>必殺傷害: {formatNumber(sourceUltimate)}</Text>
                  <Text>觸發/追加傷害: {formatNumber(sourceNone)}</Text>
                </Accordion.Panel>
              </AccordionItem>
              <AccordionItem value="2">
                <Accordion.Control>
                  {characters[1].name}: {formatNumber(totalDamage1)}
                </Accordion.Control>
                <Accordion.Panel>
                  <Text>普攻型攻擊: {formatNumber(basicDamage1)}</Text>
                  <Text>必殺型傷害: {formatNumber(ultimateDamage1)}</Text>
                  <Text>觸發型傷害: {formatNumber(triggerDamage1)}</Text>
                  <Divider my="sm" />
                  <Text>普攻傷害: {formatNumber(sourceBasic1)}</Text>
                  <Text>必殺傷害: {formatNumber(sourceUltimate1)}</Text>
                  <Text>觸發/追加傷害: {formatNumber(sourceNone1)}</Text>
                </Accordion.Panel>
              </AccordionItem>
              <AccordionItem value="3">
                <Accordion.Control>
                  {characters[2].name}: {formatNumber(totalDamage2)}
                </Accordion.Control>
                <Accordion.Panel>
                  <Text>普攻型攻擊: {formatNumber(basicDamage2)}</Text>
                  <Text>必殺型傷害: {formatNumber(ultimateDamage2)}</Text>
                  <Text>觸發型傷害: {formatNumber(triggerDamage2)}</Text>
                  <Divider my="sm" />
                  <Text>普攻傷害: {formatNumber(sourceBasic2)}</Text>
                  <Text>必殺傷害: {formatNumber(sourceUltimate2)}</Text>
                  <Text>觸發/追加傷害: {formatNumber(sourceNone2)}</Text>
                </Accordion.Panel>
              </AccordionItem>
              <AccordionItem value="4">
                <Accordion.Control>
                  {characters[3].name}: {formatNumber(totalDamage3)}
                </Accordion.Control>
                <Accordion.Panel>
                  <Text>普攻型攻擊: {formatNumber(basicDamage3)}</Text>
                  <Text>必殺型傷害: {formatNumber(ultimateDamage3)}</Text>
                  <Text>觸發型傷害: {formatNumber(triggerDamage3)}</Text>
                  <Divider my="sm" />
                  <Text>普攻傷害: {formatNumber(sourceBasic3)}</Text>
                  <Text>必殺傷害: {formatNumber(sourceUltimate3)}</Text>
                  <Text>觸發/追加傷害: {formatNumber(sourceNone3)}</Text>
                </Accordion.Panel>
              </AccordionItem>
              <AccordionItem value="5">
                <Accordion.Control>
                  {characters[4].name}: {formatNumber(totalDamage4)}
                </Accordion.Control>
                <Accordion.Panel>
                  <Text>普攻型攻擊: {formatNumber(basicDamage4)}</Text>
                  <Text>必殺型傷害: {formatNumber(ultimateDamage4)}</Text>
                  <Text>觸發型傷害: {formatNumber(triggerDamage4)}</Text>
                  <Divider my="sm" />
                  <Text>普攻傷害: {formatNumber(sourceBasic4)}</Text>
                  <Text>必殺傷害: {formatNumber(sourceUltimate4)}</Text>
                  <Text>觸發/追加傷害: {formatNumber(sourceNone4)}</Text>
                </Accordion.Panel>
              </AccordionItem>
            </Accordion>
          </>
        ) : null}
      </Modal>
    </Container>
  );
}
