import { createLazyFileRoute } from "@tanstack/react-router";
import SelectCharacterPage from "../../page/SelectCharacter";

export const Route = createLazyFileRoute("/battle/select")({
  component: SelectCharacterPage,
});
