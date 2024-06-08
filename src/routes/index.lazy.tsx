import { Button, Center } from "@mantine/core";
import { Link, createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/")({
  component: () => (
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
    </div>
  ),
});
