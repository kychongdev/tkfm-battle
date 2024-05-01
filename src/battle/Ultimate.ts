// import { AffectType, BuffType, Condition, Target } from "../types/Skill";
import { GameState } from "./GameState";

export function initUltimateSkill(position: number, gameState: GameState) {
  switch (gameState.characters[position].id) {
    case "532":
      const bond = gameState.characters[position].bond;
      gameState.characters[position].ultimateName =
        bond == 1
          ? "使我方全體造成必殺技傷害增加20%(3回合)、使自身護盾效果增加10%(3回合)、再以自身攻擊力265%對目標造成傷害，CD:3"
          : bond == 2
            ? "使我方全體造成必殺技傷害增加30%(3回合)、使自身護盾效果增加15%(3回合)、再以自身攻擊力298%對目標造成傷害，CD:3"
            : bond == 3
              ? "使我方全體造成必殺技傷害增加40%(3回合)、使自身護盾效果增加20%(3回合)、再以自身攻擊力331%對目標造成傷害，CD:3"
              : bond == 4
                ? "使我方全體造成必殺技傷害增加50%(3回合)、使自身護盾效果增加25%(3回合)、再以自身攻擊力364%對目標造成傷害，CD:3"
                : bond == 5
                  ? "使我方全體造成必殺技傷害增加60%(3回合)、使自身護盾效果增加30%(3回合)、再以自身攻擊力397%對目標造成傷害，CD:3"
                  : "讀取失敗";
      gameState.characters[position].cd = 3;
      gameState.characters[position].maxCd = 3;
      break;
  }
}

export function activateUltimate(
  skill: number,
  position: number,
  gameState: GameState,
) {
  switch (skill) {
    // CD3
    case 532:
      // 532 : 幽夜女爵 卡蒂雅
      // 使我方全體造成必殺技傷害增加20/30/40/50/60%(3回合)、
      // 使自身護盾效果增加10/15/20/25/30%(3回合)、
      // 再以自身攻擊力265/298/331/364/397%對目標造成傷害，CD:3
      const bond = gameState.characters[position].bond;
      // const skillLevel =
      //   bond == 1
      //     ? { value: 0.2, name: "必殺技傷害增加20%" }
      //     : bond == 2
      //       ? { value: 0.3, name: "必殺技傷害增加30%" }
      //       : bond == 3
      //         ? { value: 0.4, name: "必殺技傷害增加40%" }
      //         : bond == 4
      //           ? { value: 0.5, name: "必殺技傷害增加50%" }
      //           : bond == 5
      //             ? { value: 0.6, name: "必殺技傷害增加60%" }
      //             : { value: 0, name: "" };
      // const skillLevel2 =
      //   bond == 1
      //     ? { value: 0.1, name: "護盾效果增加10%" }
      //     : bond == 2
      //       ? { value: 0.15, name: "護盾效果增加15%" }
      //       : bond == 3
      //         ? { value: 0.2, name: "護盾效果增加20%" }
      //         : bond == 4
      //           ? { value: 0.25, name: "護盾效果增加25%" }
      //           : bond == 5
      //             ? { value: 0.3, name: "護盾效果增加30%" }
      //             : { value: 0, name: "" };
      if (gameState.characters[position].bond == 1) {
        // gameState.characters[position].buff = [
        //   ...gameState.characters[position].buff,
        //   {
        //     name: skillLevel.name,
        //     type: BuffType.BUFF,
        //     value: skillLevel.value,
        //     affect: AffectType.ULTIMATE_DAMAGE,
        //     target: Target.SELF,
        //     duration: 3,
        //     condition: Condition.NONE,
        //   },
        //   {
        //     name: skillLevel2.name,
        //     value: skillLevel2.value,
        //     affect: AffectType.SHIELD,
        //     target: Target.SELF,
        //     duration: 3,
        //     condition: Condition.NONE,
        //   },
        // ];
        // gameState.characters[position].attack = [
        //   ...gameState.characters[position].attack,
        //   {
        //     name: "以自身攻擊力397%對目標造成傷害",
        //     value: 3.97,
        //     affect: "damage",
        //     target: "enemy",
        //     condition: "none",
        //   },
        // ];
      }
      break;
    default:
      break;
  }
}
