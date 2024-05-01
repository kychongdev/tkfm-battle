import { Card, Stack } from "@mantine/core";
import { useGameState } from "../battle/GameState";

export function BuffList(props: { position: number }) {
  const buff = useGameState((state) => state.characters[props.position].buff);
  return (
    <Stack gap={5}>
      {buff.map((buff, index) => (
        <Card key={index} py={5} px={10}>
          {buff.name}
        </Card>
      ))}
    </Stack>
  );
}
