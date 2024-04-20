import { useEffectOnce, useLocalStorage } from "react-use";
import characterDetails from "../assets/characterDetails.json";
import {
  Center,
  Container,
  Group,
  Space,
  Image,
  Progress,
} from "@mantine/core";
import { CharacterBattleButton } from "../components/CharacterBattleButton";
import { Attribute, CharacterSelect, CharacterState } from "../types/Character";
import favicon from "../assets/character/favicon.png";
import { useGameState } from "../battle/GameState";

export default function Battle() {
  const [value, setValue, remove] =
    useLocalStorage<CharacterSelect[]>("last-session");

  const initCharacters = useGameState((state) => state.init);

  // useEffectOnce(() => {
  //   if (value) {
  //     const battleCharacters: CharacterState[] = value.map((character) => {
  //       if (character.id !== "") {
  //         const characterDetail = characterDetails.find(
  //           (detail) => detail.id === character.id,
  //         );
  //         return {
  //           id: character.id,
  //           isExist: true,
  //           baseAtk: characterDetail ? characterDetail.stats.initATK : 0,
  //           baseHp: characterDetail ? characterDetail.stats.initHP : 0,
  //           atk: 0,
  //           hp: 0,
  //           attribute: characterDetail
  //             ? characterDetail.tags.attribute
  //             : Attribute.None,
  //           position: character.position,
  //           shield: 0,
  //           isMoved: false,
  //           isGuard: false,
  //           isBroken: false,
  //           isTaunt: false,
  //           isParalysis: false,
  //           isSleep: false,
  //           isSilence: false,
  //           isDead: false,
  //         };
  //       } else {
  //         return {
  //           id: character.id,
  //           isExist: false,
  //           baseAtk: 0,
  //           baseHp: 0,
  //           atk: 0,
  //           hp: 0,
  //           attribute: Attribute.None,
  //           position: character.position,
  //           shield: 0,
  //           isMoved: false,
  //           isGuard: false,
  //           isBroken: false,
  //           isTaunt: false,
  //           isParalysis: false,
  //           isSleep: false,
  //           isSilence: false,
  //           isDead: false,
  //         };
  //       }
  //     });
  //     initCharacters(battleCharacters);
  //   }
  // });

  return (
    <Container>
      <Space h="lg" />
      <Center>木樁</Center>
      <Progress value={50} m="sm" />
      <Center m="xl">
        <Image src={favicon} />
      </Center>
      <Group grow wrap="nowrap" gap="xs">
        <CharacterBattleButton position={0} />
        <CharacterBattleButton position={1} />
        <CharacterBattleButton position={2} />
        <CharacterBattleButton position={3} />
        <CharacterBattleButton position={4} />
      </Group>
    </Container>
  );
}
