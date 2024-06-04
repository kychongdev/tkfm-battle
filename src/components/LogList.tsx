import { Card, Group, Stack } from "@mantine/core";

export function LogList(props: { logs: string[] }) {
  return (
    <Stack gap={5}>
      {props.logs.map((log, index) => (
        <Group
          key={`log-[${
            // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
            index
          }]`}
          grow
          wrap="nowrap"
          gap="xs"
          preventGrowOverflow={false}
        >
          <Card py={5} px={10}>
            {log}
          </Card>
        </Group>
      ))}
    </Stack>
  );
}
