import { calculateBasicDamage } from "./Calculate";
import { GameState } from "./GameState";

export function basicAttack(id: string, position: number, state: GameState) {
  let damage = 0;
  switch (id) {
    case "531":
      damage = calculateBasicDamage(position, 1, state);
      state.enemy.hp -= damage;
      break;
    case "532":
      // 532 : 幽夜女爵 卡蒂雅
      // 以自身攻擊力265/298/331/364/397%對目標造成傷害
      damage = calculateBasicDamage(position, 1, state);
      state.enemy.hp -= damage;
      break;
  }
}
