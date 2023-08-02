"use client";

import Hls from "hls.js";

import { useEffect, useRef } from "react";

import { useAtom } from "jotai";
import { readOnly_PlayerAtom, readWrite_PlayerButtonAtom } from "@/jotai/player/player";
import Controller from "../player/controller";
import { Column } from "./ui/column";

export default function VideoComponent({ m3u8Path }: { m3u8Path: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const trackRef = useRef<HTMLTrackElement>(null);
  const [Player] = useAtom(readOnly_PlayerAtom);
  const [playerButtonStatus, setPlayerButtonStatus] = useAtom(readWrite_PlayerButtonAtom);
  useEffect(() => {
    if (videoRef.current) {
      try {
        let hls = new Hls();
        hls.loadSource(m3u8Path);
        hls.attachMedia(videoRef.current);
      } catch (error) {
        console.error(error);
      }
    }
  }, [Player, m3u8Path]);

  return (
    <Column variant={"h_80"} size={"w_full"}>
      <video
        onPlay={e => {
          setPlayerButtonStatus(!playerButtonStatus);
          Player.handleClickPlayerToggle();
        }}
        onPause={e => {
          setPlayerButtonStatus(!playerButtonStatus);
          Player.handleClickPlayerToggle();
        }}
        onSeeking={e => Player.handleClickWaveSeek(videoRef.current?.currentTime!)}
        onCanPlay={e => Player.setVideo(videoRef.current!)}
        ref={videoRef}
        className='relative w-full h-4/5'
        preload={"auto"}
        crossOrigin={"anonymous"}
        controls={true}
        controlsList={"nodownload noplaybackrate nofullscreen"}
        disablePictureInPicture={true}
      >
        <source type={"video/mp4"}></source>
        <track ref={trackRef} label={"Korean"} kind={"captions"} srcLang={"ko"} default />
      </video>
      <Controller />
    </Column>
  );
}
