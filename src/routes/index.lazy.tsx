import {
  Button,
  Text,
  Center,
  ThemeIcon,
  Timeline,
  Space,
} from "@mantine/core";
import { IconEdit } from "@tabler/icons-react";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/")({
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
      <div className="p-2">
        <Center>
          <Button
            onClick={() => {
              localStorage.removeItem("game-state");
              localStorage.removeItem("saved-team");
              localStorage.removeItem("saved-team1");
              localStorage.removeItem("saved-team2");
              localStorage.removeItem("saved-team3");
              localStorage.removeItem("saved-team4");
            }}
          >
            資料重置（更新後需要按這個，按完後刷新網頁）
          </Button>
        </Center>
        <Space h="lg" />
        <Center>
          <Timeline bulletSize={30}>
            <Timeline.Item title="8/6/2024 - Alpha版0.2" bullet={icon}>
              <Text c="dimmed" size="sm">
                添加以下角色：
                <br /> 魔法少女 朱諾安
                <br /> 夏日 菲歐菈
                <br /> 鮮血魔王 洛緹亞
                <br /> 惡魔貓娘 杏仁咪嚕
                <br /> 性誕戀歌 伊布力斯
              </Text>
            </Timeline.Item>
            <Timeline.Item title="3/6/2024 - Alpha版0.1" bullet={icon}>
              <Text c="dimmed" size="sm">
                植入基本功能
              </Text>
            </Timeline.Item>
          </Timeline>
        </Center>
      </div>
    );
  },
});
