// import { AffectType, BuffType, Condition, Target } from "../types/Skill";
import { AffectType, BuffType, Condition, Target } from "../types/Skill";
import { calculateUltimateDamage, parseCondition } from "./Calculate";
import { GameState } from "./GameState";

export function initUltimateSkill(position: number, gameState: GameState) {
  let bond = 1;
  switch (gameState.characters[position].id) {
    case "531":
      bond = gameState.characters[position].bond;
      // 使目標受到時御者伊娜絲傷害增加50/62.5/75/87.5/100%(3回合)，並以自身攻擊力265/298/331/364/397%對目標造成傷害，CD:3
      gameState.characters[position].ultimateName =
        bond == 1
          ? "使目標受到時御者伊娜絲傷害增加50%(3回合)，並以自身攻擊力265%對目標造成傷害，CD:3"
          : bond == 2
            ? "使目標受到時御者伊娜絲傷害增加62.5%(3回合)，並以自身攻擊力298%對目標造成傷害，CD:3"
            : bond == 3
              ? "使目標受到時御者伊娜絲傷害增加75%(3回合)，並以自身攻擊力331%對目標造成傷害，CD:3"
              : bond == 4
                ? "使目標受到時御者伊娜絲傷害增加87.5%(3回合)，並以自身攻擊力364%對目標造成傷害，CD:3"
                : bond == 5
                  ? "使目標受到時御者伊娜絲傷害增加100%(3回合)，並以自身攻擊力397%對目標造成傷害，CD:3"
                  : "讀取失敗";
      gameState.characters[position].cd = 3;
      gameState.characters[position].maxCd = 3;
      break;
    case "532":
      bond = gameState.characters[position].bond;
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
    default:
      break;
  }
}

export function activateUltimate(position: number, gameState: GameState) {
  let bond = 1;
  switch (gameState.characters[position].id) {
    case "531":
      break;
    // CD3
    // 532 : 幽夜女爵 卡蒂雅
    // 使我方全體造成必殺技傷害增加20/30/40/50/60%(3回合)、
    // 使自身護盾效果增加10/15/20/25/30%(3回合)、
    // 再以自身攻擊力265/298/331/364/397%對目標造成傷害，CD:3
    case "532":
      bond = gameState.characters[position].bond;
      gameState.characters.forEach((character) => {
        character.buff = [
          ...character.buff,
          {
            name: "必殺技傷害增加20%",
            type: BuffType.BUFF,
            value:
              bond == 1
                ? 0.2
                : bond == 2
                  ? 0.3
                  : bond == 3
                    ? 0.4
                    : bond == 4
                      ? 0.5
                      : bond == 5
                        ? 0.6
                        : 0,
            affect: AffectType.ULTIMATE_DAMAGE,
            target: Target.SELF,
            duration: 3,
            condition: Condition.NONE,
          },
        ];
      });
      gameState.characters[position].buff = [
        ...gameState.characters[position].buff,
        {
          name: "自身護盾效果增加10%",
          type: BuffType.BUFF,
          value:
            bond == 1
              ? 0.1
              : bond == 2
                ? 0.15
                : bond == 3
                  ? 0.2
                  : bond == 4
                    ? 0.25
                    : bond == 5
                      ? 0.3
                      : 0,
          affect: AffectType.SHIELD,
          target: Target.SELF,
          duration: 3,
          condition: Condition.NONE,
        },
      ];

      const percentage =
        bond == 1
          ? 2.65
          : bond == 2
            ? 2.98
            : bond == 3
              ? 3.31
              : bond == 4
                ? 3.64
                : bond == 5
                  ? 3.97
                  : 0;

      const damage = calculateUltimateDamage(position, percentage, gameState);
      console.log("damage", damage);
      gameState.enemy.hp -= damage;

      break;
    default:
      break;
  }
}
