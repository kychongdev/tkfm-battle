import { Card, Group, Stack } from "@mantine/core";
import { parseSkillName } from "../battle/utilies";
import type { CharacterState } from "../types/Character";

export function BuffList(props: { character: CharacterState }) {
  return (
    <Stack gap={5}>
      {props.character.buff.map((buff) => (
        <Group
          key={buff.id}
          grow
          wrap="nowrap"
          gap="xs"
          preventGrowOverflow={false}
        >
          <Card py={5} px={10}>
            {parseSkillName(buff)}
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
