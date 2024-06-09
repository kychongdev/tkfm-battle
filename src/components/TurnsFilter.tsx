import { Text, RangeSlider, Center, Title, Space } from "@mantine/core";
import { useGameState } from "../battle/GameState";
import { groupBy } from "lodash";
import { formatNumber } from "../battle/utilities";
import { useState } from "react";

export const TurnsFilter = () => {
  const damageLog = useGameState((state) => state.damageLog);
  const damageLog1 = useGameState((state) => state.damageLog1);
  const damageLog2 = useGameState((state) => state.damageLog2);
  const damageLog3 = useGameState((state) => state.damageLog3);
  const damageLog4 = useGameState((state) => state.damageLog4);
  const turns = useGameState((state) => state.turns);
  const characters = useGameState((state) => state.characters);

  const groupByTurn = groupBy(damageLog, "turn");
  const groupByTurn1 = groupBy(damageLog1, "turn");
  const groupByTurn2 = groupBy(damageLog2, "turn");
  const groupByTurn3 = groupBy(damageLog3, "turn");
  const groupByTurn4 = groupBy(damageLog4, "turn");

  const damageArr = [];
  for (const key in groupByTurn) {
    const sum = groupByTurn[key].reduce((acc, curr) => acc + curr.damage, 0);
    damageArr.push({ turn: key, damage: sum });
  }
  const damageArr1 = [];
  for (const key in groupByTurn1) {
    const sum = groupByTurn1[key].reduce((acc, curr) => acc + curr.damage, 0);
    damageArr1.push({ turn: key, damage: sum });
  }

  const damageArr2 = [];
  for (const key in groupByTurn2) {
    const sum = groupByTurn2[key].reduce((acc, curr) => acc + curr.damage, 0);
    damageArr2.push({ turn: key, damage: sum });
  }

  const damageArr3 = [];
  for (const key in groupByTurn3) {
    const sum = groupByTurn3[key].reduce((acc, curr) => acc + curr.damage, 0);
    damageArr3.push({ turn: key, damage: sum });
  }

  const damageArr4 = [];
  for (const key in groupByTurn4) {
    const sum = groupByTurn4[key].reduce((acc, curr) => acc + curr.damage, 0);
    damageArr4.push({ turn: key, damage: sum });
  }

  const data = [];
  for (let i = 0; i < turns; i++) {
    data.push({
      turn: i + 1,
      [characters[0].name]: damageArr[i] ? damageArr[i].damage : 0,
      [characters[1].name]: damageArr1[i] ? damageArr1[i].damage : 0,
      [characters[2].name]: damageArr2[i] ? damageArr2[i].damage : 0,
      [characters[3].name]: damageArr3[i] ? damageArr3[i].damage : 0,
      [characters[4].name]: damageArr4[i] ? damageArr4[i].damage : 0,
    });
  }

  const [value, setValue] = useState<[number, number]>([0, turns]);

  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  function render(pos: number, data: any) {
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    const total = data.reduce((acc: number, curr: any) => {
      if (curr.turn >= value[0] && curr.turn <= value[1]) {
        if (curr[characters[pos].name]) {
          console.log(curr[characters[pos].name]);
          return acc + Number.parseFloat(curr[characters[pos].name]);
        }
      }
      return acc;
    }, 0);

    return total;
  }

  return (
    <>
      <Title m={5} order={4}>
        回合篩選:
      </Title>
      <RangeSlider
        m={5}
        min={0}
        max={turns}
        value={value}
        onChange={setValue}
        minRange={0}
      />
      <Space h={"xs"} />
      <Center>
        <Title order={5}>總傷害統計</Title>
      </Center>
      <Text m={5}>
        {characters[0].name}: {formatNumber(render(0, data))}
      </Text>
      <Text m={5}>
        {characters[1].name}: {formatNumber(render(1, data))}
      </Text>
      <Text m={5}>
        {characters[2].name}: {formatNumber(render(2, data))}
      </Text>
      <Text m={5}>
        {characters[3].name}: {formatNumber(render(3, data))}
      </Text>
      <Text m={5}>
        {characters[4].name}: {formatNumber(render(4, data))}
      </Text>
    </>
  );
};
