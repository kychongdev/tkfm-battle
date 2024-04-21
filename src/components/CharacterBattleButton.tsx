import { AspectRatio, Image, Overlay, Progress, Stack } from "@mantine/core";
import { useGameState } from "../battle/GameState";

export function CharacterBattleButton(props: { position: number }) {
  const basicAttack = useGameState((state) => state.basicAttack);
  const character = useGameState((state) => state.characters[props.position]);

  return (
    <Stack>
      <AspectRatio ratio={167 / 512}>
        <Image
          onClick={() => basicAttack(props.position)}
          src={`/src/assets/character/char_${character.id}.png`}
          fallbackSrc="/src/assets/character/char_nr.png"
        />
        {character.isMoved || !character.isExist || character.isDead ? (
          <Overlay color="#000" backgroundOpacity={0.85} />
        ) : null}
      </AspectRatio>
      <Progress value={(character.hp / character.initHp) * 100} />
      <div>{character.initHp}</div>
    </Stack>
  );
}
