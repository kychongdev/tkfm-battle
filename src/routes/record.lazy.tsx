import { Center, Table } from "@mantine/core";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/record")({
  component: () => {
    const data = [
      {
        name: "魔法少女 朱諾安",
        leader: true,
        teammate: true,
        leadtest: true,
        teammatetest: true,
      },
      {
        name: "夏日 菲歐菈",
        leader: true,
        teammate: true,
        leadtest: false,
        teammatetest: true,
      },
      {
        name: "鮮血魔王 洛緹亞",
        leader: false,
        teammate: true,
        leadtest: false,
        teammatetest: true,
      },
      {
        name: "惡魔貓娘 杏仁咪嚕",
        leader: true,
        teammate: true,
        leadtest: false,
        teammatetest: true,
      },
      {
        name: "性誕戀歌 伊布力斯",
        leader: true,
        teammate: true,
        leadtest: false,
        teammatetest: true,
      },
      {
        name: "夏日 巴爾",
        leader: true,
        teammate: true,
        leadtest: true,
        teammatetest: true,
      },
      {
        name: "聖誕雪狐 靜",
        leader: false,
        teammate: true,
        leadtest: false,
        teammatetest: true,
      },
      {
        name: "調皮搗蛋 白",
        leader: true,
        teammate: true,
        leadtest: false,
        teammatetest: false,
      },
      {
        name: "新春 凜月",
        leader: false,
        teammate: true,
        leadtest: false,
        teammatetest: true,
      },
      {
        name: "甜心可可 巴爾",
        leader: false,
        teammate: true,
        leadtest: false,
        teammatetest: true,
      },
      {
        name: "傳說女僕 艾蜜莉",
        leader: false,
        teammate: true,
        leadtest: false,
        teammatetest: true,
      },
      {
        name: "慵懶貓貓 露露",
        leader: false,
        teammate: true,
        leadtest: false,
        teammatetest: false,
      },
      {
        name: "黑鷹 貝里絲",
        leader: true,
        teammate: true,
        leadtest: true,
        teammatetest: true,
      },
      {
        name: "副手 貝蕾朵",
        leader: false,
        teammate: false,
        leadtest: false,
        teammatetest: false,
      },
      {
        name: "甜心偶像 星空奈奈美",
        leader: false,
        teammate: true,
        leadtest: false,
        teammatetest: false,
      },
      {
        name: "閃耀歌姬 黑白諾艾莉",
        leader: false,
        teammate: true,
        leadtest: false,
        teammatetest: false,
      },
      {
        name: "不健全遐想 托特拉",
        leader: false,
        teammate: false,
        leadtest: false,
        teammatetest: false,
      },
      {
        name: "春情白兔 鈴蘭",
        leader: false,
        teammate: false,
        leadtest: false,
        teammatetest: false,
      },
      {
        name: "賞金獵人 安潔娜爾",
        leader: false,
        teammate: true,
        leadtest: false,
        teammatetest: false,
      },
      {
        name: "夏日 千鶴",
        leader: false,
        teammate: true,
        leadtest: false,
        teammatetest: true,
      },
      {
        name: "夏日 賽露西亞",
        leader: false,
        teammate: false,
        leadtest: false,
        teammatetest: false,
      },
      {
        name: "夏日 撒旦",
        leader: false,
        teammate: false,
        leadtest: false,
        teammatetest: false,
      },
      {
        name: "夏日 凱薩",
        leader: false,
        teammate: false,
        leadtest: false,
        teammatetest: false,
      },
    ];
    return (
      <Center>
        <Table withTableBorder withColumnBorders>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>角色</Table.Th>
              <Table.Th>隊長實裝</Table.Th>
              <Table.Th>隊員實裝</Table.Th>
              <Table.Th>隊長測試</Table.Th>
              <Table.Th>隊員測試</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {data.map((item) => (
              <Table.Tr key={item.name}>
                <Table.Td>{item.name}</Table.Td>
                <Table.Td>{item.leader ? "✔" : "✘"}</Table.Td>
                <Table.Td>{item.teammate ? "✔" : "✘"}</Table.Td>
                <Table.Td>{item.leadtest ? "✔" : "✘"}</Table.Td>
                <Table.Td>{item.teammatetest ? "✔" : "✘"}</Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </Center>
    );
  },
});

