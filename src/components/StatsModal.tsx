import { Card, Stack } from "@mantine/core";
import { useGameState } from "../battle/GameState";

export function BuffList(props: { position: number }) {
  const buff = useGameState((state) => state.characters[props.position].buff);
  return (
    <Stack>
      {buff.map((buff) => (
        <Card>{buff.name}</Card>
      ))}
    </Stack>
  );
}
