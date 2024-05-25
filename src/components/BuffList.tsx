import { Card, Group, Stack } from "@mantine/core";
import { parseSkillName } from "../battle/utilies";
import type { CharacterState } from "../types/Character";

export function BuffList(props: { character: CharacterState }) {
  return (
    <Stack gap={5}>
      {props.character.buff.map((buff, index) => (
        <Group
          key={`buff.id-[${
            // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
            index
          }]`}
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
            <div style={{ alignSelf: "center" }}>
              {buff.duration === 100 ? "-" : buff.duration}
            </div>
          </Card>
        </Group>
      ))}
    </Stack>
  );
}
