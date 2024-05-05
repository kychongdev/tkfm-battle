import { Card, Group, Stack } from "@mantine/core";
import { CharacterState } from "../types/Character";

export function BuffList(props: { character: CharacterState }) {
  return (
    <Stack gap={5}>
      {props.character.buff.map((buff, index) => (
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
