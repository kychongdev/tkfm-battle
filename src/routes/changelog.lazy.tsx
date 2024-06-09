import { Center, Timeline, Text, ThemeIcon } from "@mantine/core";
import { IconEdit } from "@tabler/icons-react";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/changelog")({
  component: () => {
    const icon = (
      <ThemeIcon
        size={22}
        variant="gradient"
        gradient={{ from: "lime", to: "cyan" }}
        radius="xl"
      >
        <IconEdit size="0.8rem" />
      </ThemeIcon>
    );
    return (
      <Center>
        <Timeline bulletSize={30}>
          <Timeline.Item title="9/6/2024 - Alpha v0.3" bullet={icon}>
            <Text c="dimmed" size="sm">
              增加以下功能:
              <br />
              - 傷害比例
              <br />- 傷害折線圖
            </Text>
          </Timeline.Item>
          <Timeline.Item title="8/6/2024 - Alpha v0.2" bullet={icon}>
            <Text c="dimmed" size="sm">
              添加以下角色：
              <br /> - 魔法少女 朱諾安
              <br /> - 夏日 菲歐菈
              <br /> - 鮮血魔王 洛緹亞
              <br /> - 惡魔貓娘 杏仁咪嚕
              <br /> - 性誕戀歌 伊布力斯
              <br /> - 夏日 巴爾
              <br /> - 聖誕雪狐 靜
              <br /> - 調皮搗蛋 白
              <br /> - 新春 凜月
              <br /> - 夏日 千鶴
              <br /> - 甜心可可 巴爾
              <br /> - 傳說女僕 艾蜜莉
            </Text>
          </Timeline.Item>
          <Timeline.Item title="3/6/2024 - Alpha v0.1" bullet={icon}>
            <Text c="dimmed" size="sm">
              增加了以下功能：
              <br />
              基礎戰鬥模式
              <br />
              儲存/讀取隊伍
            </Text>
          </Timeline.Item>
        </Timeline>
      </Center>
    );
  },
});
