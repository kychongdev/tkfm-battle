import { createLazyFileRoute } from "@tanstack/react-router";
import Battle from "../../page/Battle";

export const Route = createLazyFileRoute("/battle/start")({
  component: Battle,
});
