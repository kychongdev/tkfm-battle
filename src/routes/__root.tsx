import { FloatingIndicator, Space, UnstyledButton } from "@mantine/core";
import {
  createRootRoute,
  Link,
  Outlet,
  useRouterState,
} from "@tanstack/react-router";
import { useState } from "react";
import classes from "../navbutton.module.css";

const data = ["首頁", "更新紀錄", "隊伍設定", "戰鬥模式", "開發日記"];
const route = ["/", "/changelog", "/battle/select", "/battle/start", "/record"];

export const Route = createRootRoute({
  component: () => {
    const router = useRouterState();

    const [rootRef, setRootRef] = useState<HTMLDivElement | null>(null);
    const [controlsRefs, setControlsRefs] = useState<
      Record<string, HTMLButtonElement | null>
    >({});
    const [active, setActive] = useState(0);

    const setControlRef = (index: number) => (node: HTMLButtonElement) => {
      controlsRefs[index] = node;
      setControlsRefs(controlsRefs);
    };

    const controls = data.map((item, index) => (
      <UnstyledButton
        key={item}
        className={classes.control}
        ref={setControlRef(index)}
        onClick={() => setActive(index)}
        mod={{ active: active === index }}
      >
        <Link to={route[index]}>
          <span className={classes.controlLabel}>{item}</span>
        </Link>
      </UnstyledButton>
    ));

    return (
      <>
        <div className={classes.root} ref={setRootRef}>
          {controls}

          <FloatingIndicator
            target={controlsRefs[active]}
            parent={rootRef}
            className={classes.indicator}
          />
        </div>
        <Space h="xs" />
        <Outlet />
      </>
    );
  },
});
