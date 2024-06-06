import { Button } from "@mantine/core";
import { Link, createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/")({
  component: () => (
    <div className="p-2">
      <Link to="/battle/select" className="btn btn-primary">
        <Button>隊伍設定</Button>
      </Link>
      <Link to="/battle/start" className="btn btn-primary">
        <Button>開始戰鬥</Button>
      </Link>
    </div>
  ),
});
