import { Card, Group, Stack } from "@mantine/core";
import { useGameState } from "../battle/GameState";

export function BuffList(props: { position: number }) {
  const buff = useGameState((state) => state.characters[props.position].buff);
  return (
    <Stack gap={5}>
      {buff.map((buff, index) => (
        <Group
          key={index}
          grow
          wrap="nowrap"
          gap="xs"
          preventGrowOverflow={false}
        >
          <Card py={5} px={10}>
            {buff.name}
            {buff.stack ? `${buff.stack}層` : ""}
            {buff.maxStack ? `【最多${buff.maxStack}層】` : ""}
          </Card>
          <Card
            py={5}
            px={10}
            style={{
              minWidth: "2.5em",
              maxWidth: "2.5em",
              alignSelf: "stretch",
            }}
          >
            <div style={{ alignSelf: "center" }}>{buff.duration ?? "-"}</div>
          </Card>
        </Group>
      ))}
    </Stack>
  );
}
