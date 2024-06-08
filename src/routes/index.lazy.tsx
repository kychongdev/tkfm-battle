import { Blockquote, Button, Center, Space } from "@mantine/core";
import { IconInfoCircle } from "@tabler/icons-react";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/")({
  component: () => {
    const icon = <IconInfoCircle />;

    return (
      <div className="p-2">
        <Blockquote color="blue" icon={icon} m="sm">
          此網站目前還在Alpha階段，所有數據還在測試中，可能會有錯誤或不準確的地方。
          <br />
          <br /> 數值因小數點關係，會有二位數的偏差，請以遊戲內為準。
          <br />
          <br /> 目前不支援：治療和護盾數值上的功能，多敵人木樁
        </Blockquote>
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
            資料重置（更新後需要按這個，按完後請刷新網頁）
          </Button>
        </Center>
      </div>
    );
  },
});
