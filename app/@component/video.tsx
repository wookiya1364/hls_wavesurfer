"use client";

import Hls from "hls.js";

import { useEffect, useRef } from "react";

import { useAtom } from "jotai";
import { readOnly_PlayerAtom } from "@/jotai/player/player";

export default function VideoComponent({ m3u8Path }: { m3u8Path: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const trackRef = useRef<HTMLTrackElement>(null);
  const [Player] = useAtom(readOnly_PlayerAtom);
  useEffect(() => {
    if (videoRef.current) {
      try {
        let hls = new Hls();
        hls.loadSource(m3u8Path);
        hls.attachMedia(videoRef.current);
      } catch (error) {
        console.error(error);
      }

      videoRef.current.addEventListener("play", e => Player.handleClickPlayerToggle());
      videoRef.current.addEventListener("pause", e => Player.handleClickPlayerToggle());
      videoRef.current.addEventListener("seeking", e => Player.handleClickWaveSeek(videoRef.current?.currentTime!));
      videoRef.current.addEventListener("canplay", e => Player.setVideo(videoRef.current!));
      // videoRef.current.addEventListener("timeupdate", () => SE.setVideoTimeUpdated(videoRef.current!));
    }
  }, [Player, m3u8Path]);

  return (
    <article className='h-screen w-1/2'>
      <video
        ref={videoRef}
        className='relative w-full h-4/5 object-fill'
        preload={"auto"}
        crossOrigin={"anonymous"}
        controls={true}
        controlsList={"nodownload noplaybackrate nofullscreen"}
        disablePictureInPicture={true}
      >
        <source type={"video/mp4"}></source>
        <track ref={trackRef} label={"Korean"} kind={"captions"} srcLang={"ko"} default />
      </video>
    </article>
  );
}
