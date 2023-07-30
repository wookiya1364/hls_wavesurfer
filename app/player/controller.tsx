"use client";

import { readOnly_PlayerAtom } from "@/jotai/player/player";
import { useAtom } from "jotai";
import { useCallback, useState } from "react";
import { Button } from "../@component/ui/button";

export default function Controller() {
  const [Player] = useAtom(readOnly_PlayerAtom);
  const [toggle, setToggle] = useState(false);
  const handleClickPlayerToggle = useCallback(() => {
    Player.handleClickPlayerToggle();
  }, [Player]);

  return (
    <article>
      <Button
        onClick={() => {
          setToggle(!toggle);
          handleClickPlayerToggle();
        }}
        size={"sm"}
        variant={"outline"}
        className=''
      >
        {toggle ? "정지" : "재생"}
      </Button>
    </article>
  );
}
