import { useGameState } from "../battle/GameState";
import { groupBy } from "lodash";
import { AreaChart } from "@mantine/charts";
import { formatNumber } from "../battle/utilities";

export const Analysis = () => {
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
      [`[1] ${characters[0].name}`]: damageArr[i] ? damageArr[i].damage : 0,
      [`[2] ${characters[1].name}`]: damageArr1[i] ? damageArr1[i].damage : 0,
      [`[3] ${characters[2].name}`]: damageArr2[i] ? damageArr2[i].damage : 0,
      [`[4] ${characters[3].name}`]: damageArr3[i] ? damageArr3[i].damage : 0,
      [`[5] ${characters[4].name}`]: damageArr4[i] ? damageArr4[i].damage : 0,
    });
  }

  return (
    <AreaChart
      h={300}
      dataKey="turn"
      data={data}
      withYAxis={false}
      valueFormatter={(value) => `${formatNumber(value)}`}
      series={[
        { name: `[1] ${characters[0].name}`, color: "#8884d8" },
        { name: `[2] ${characters[1].name}`, color: "#82ca9d" },
        { name: `[3] ${characters[2].name}`, color: "#ffc658" },
        { name: `[4] ${characters[3].name}`, color: "#ff7300" },
        { name: `[5] ${characters[4].name}`, color: "#ff0000" },
      ]}
      curveType="linear"
    />
  );
};
