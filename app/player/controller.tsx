"use client";

import { readOnly_PlayerAtom, readOnly_PlayerButtonAtom, readWrite_PlayerButtonAtom } from "@/jotai/player/player";
import { useAtom } from "jotai";
import { useCallback } from "react";
import { Button } from "../@component/ui/button";

export default function Controller() {
  const [Player] = useAtom(readOnly_PlayerAtom);
  const [playerButtonStatus] = useAtom(readOnly_PlayerButtonAtom);
  const handleClickToggle = useCallback(() => {
    Player.handleClickPlayerButtonToggle();
  }, [Player]);

  return (
    <article className='h-1/5'>
      <Button
        onClick={() => {
          handleClickToggle();
        }}
        intent={"cyan"}
        size={"sm"}
        className='text-orange-300'
      >
        {playerButtonStatus ? "정지" : "재생"}
      </Button>
    </article>
  );
}
