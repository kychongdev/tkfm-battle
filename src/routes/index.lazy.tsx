import { Link, createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/")({
  component: () => (
    <div className="p-2">
      <Link to="/battle/select" className="btn btn-primary">
        隊伍設定
      </Link>
      <Link to="/battle/start" className="btn btn-primary">
        開始戰鬥
      </Link>
    </div>
  ),
});
