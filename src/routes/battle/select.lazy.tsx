import { createLazyFileRoute } from "@tanstack/react-router";
import SelectCharacterPage from "../../page/SelectCharacterPage";

export const Route = createLazyFileRoute("/battle/select")({
  component: SelectCharacterPage,
});
