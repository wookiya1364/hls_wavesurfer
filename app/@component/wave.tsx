"use client";

import { useEffect, useRef } from "react";
import WaveSurfer from "wavesurfer.js";
import RegionsPlugin from "wavesurfer.js/dist/plugins/regions.js";
import { waveSurferCutWrapper, waveSurferWrapper } from "../../utility/player/wave_option";
import { useAtom } from "jotai";
import { readWrite_SubtitleAtom } from "@/jotai/subtitle/subtitle";
import { readOnly_PlayerAtom } from "@/jotai/player/player";

const composeRegionData = (subtitle: typeSubtitle[]) => {
  let region_data: typeRegionData[] = [];
  subtitle?.map((item: any, idx: number) => {
    const start_time = item.start / 1000;
    const end_time = item.end / 1000;
    region_data.push({
      id: `${idx}`,
      content: item.content,
      start: start_time,
      end: end_time,
    });
  });

  return region_data;
};

export default function WaveComponent({
  subtitle,
  mp3Path,
  pcm,
}: {
  subtitle: typeSubtitle[];
  mp3Path: string;
  pcm: [];
}) {
  const [Player] = useAtom(readOnly_PlayerAtom);
  const [getSubtitle, setSubtitle] = useAtom(readWrite_SubtitleAtom);
  const waveLayoutRef = useRef<HTMLDivElement>(null);
  const waveRef = useRef<HTMLDivElement>(null);
  const waveCutRef = useRef<HTMLDivElement>(null);
  const regionData: typeRegionData[] = composeRegionData(getSubtitle);

  if (getSubtitle.length === 0) {
    setSubtitle(subtitle);
  }

  useEffect(() => {
    const options = waveSurferWrapper(waveRef.current!, mp3Path, pcm);
    const cutOptions = waveSurferCutWrapper(waveCutRef.current!, mp3Path, pcm);
    const wave = WaveSurfer.create(options);
    const waveCut = WaveSurfer.create(cutOptions);

    Player.setWave(wave);
    Player.setWaveCut(waveCut);

    const waveRegion = wave.registerPlugin(RegionsPlugin.create());
    const waveCutRegion = waveCut.registerPlugin(RegionsPlugin.create());

    waveCutRegion.enableDragSelection({
      color: "rgb(180 16 16 / 63%)",
    });

    wave.on("ready", () => {
      wave.setMuted(true);
      waveCut.setMuted(true);
    });

    wave.on("decode", () => {
      regionData.forEach((element: typeRegionData, idx: number) => {
        waveRegion.addRegion(element);
      });

      const waveWrapper = document.querySelector("#waveform > div")?.shadowRoot?.querySelector("div");
      const waveCutWrapper = document.querySelector("#waveCutform > div")?.shadowRoot?.querySelector("div");
      const waveCutstyle = document.createElement("style");
      waveCutstyle.textContent = `.wrapper div > canvas { display: none; }`;
      document.querySelector("#waveCutform > div")?.shadowRoot?.appendChild(waveCutstyle);

      const waveScrollEvent = (e: any) => {
        waveCutWrapper!.scrollLeft = e.target.scrollLeft!;
      };
      const waveCutScrollEvent = (e: any) => {
        waveWrapper!.scrollLeft = e.target.scrollLeft!;
      };

      waveWrapper?.addEventListener("scroll", e => waveScrollEvent(e));
      waveCutWrapper?.addEventListener("scroll", e => waveCutScrollEvent(e));
    });

    // wave.on("timeupdate", async seconds => {
    //   if (seconds > 0) {
    // const renderSubtitle = await SE.renderSubtitle(seconds);
    // SE.setWaveTimeUpdated(seconds, renderSubtitle);
    // SE.skipRegionsInWave(seconds);
    //   }
    // });

    wave.on("seeking", time => Player.handleClickWaveSeek(time));
    waveCut.on("seeking", time => Player.handleClickWaveSeek(time));

    waveCutRegion.on("region-double-clicked", (region: any) => {
      region.remove();
    });

    // waveRegion.on("region-clicked", (region: any) => {
    // SE.setWaveRegionClick(region);
    // });

    // waveRegion.on("region-updated", (region: any) => {
    // SE.setWaveRegionUpdated(region.element, region.id);
    // });

    if (waveRef.current) {
      waveRef.current.addEventListener("click", async e => {
        // const multipleCopyButton = DTO.getMultipleCopyButton() as HTMLButtonElement;
        // let firstSubtitle: typeSubtitle;
        // let lastSubtitle: typeSubtitle;
        // const copySubtitleInfo = SE.getCopySubtitleInfo();
        // if (multipleCopyButton.classList.contains("activate-infinite-color")) {
        //   await SE.preprocessPasteMultipleSubtitle();
        //   const subtitleList = await SE.preprocessPasteMultipleSubtitle();
        //   if (subtitleList.length > 0) {
        //     firstSubtitle = subtitleList[0] as typeSubtitle;
        //     lastSubtitle = subtitleList[subtitleList.length - 1] as typeSubtitle;
        //     SE.renderWaveMarker(firstSubtitle, lastSubtitle);
        //     SE.removeWaveMarker();
        //   }
        // } else if (copySubtitleInfo !== undefined) {
        //   await SE.preprocessPasteSubtitle();
        //   const subtitle = await SE.preprocessPasteSubtitle();
        //   firstSubtitle = subtitle["add_subtitle"] as typeSubtitle;
        //   lastSubtitle = subtitle["add_subtitle"] as typeSubtitle;
        //   SE.renderWaveMarker(firstSubtitle, lastSubtitle);
        //   SE.removeWaveMarker();
        // }
        // const rectInfo = SE.getRectInfo();
        // // console.log(rectInfo);
        // if (rectInfo) {
        //   if (e.altKey) {
        //     if (multipleCopyButton.classList.contains("activate-infinite-color")) {
        //       setTimeout(async () => await SE.pasteMultipleSubtitleInfo(), 300);
        //     } else {
        //       setTimeout(async () => await SE.pasteSubtitleInfo(), 300);
        //     }
        //   } else {
        //     SE.removeMarkerbasedRect();
        //     SE.renderMarkerbasedRect(rectInfo);
        //   }
        // }
      });

      // const handlerKeyDown = (event: KeyboardEvent) => {
      //   const downKey = EditKeyDown(event, event.target);
      //   if (downKey == "rateIncrease") {
      //     SE.handleClickWaveSpeedUp();
      //   } else if (downKey == "rateDecrease") {
      //     SE.handleClickWaveSpeedDown();
      //   } else if (downKey === "regionStartUpdate") {
      //     console.log("START");
      //     SE.handleRegionStartUpdate();
      //   } else if (downKey === "regionEndUpdate") {
      //     console.log("DOWN");
      //     SE.handleRegionEndUpdate();
      //   }
      // };

      // document.addEventListener("keydown", handlerKeyDown);
      // waveRef.current.addEventListener("contextmenu", e => e.preventDefault());
      // waveCutRef.current?.addEventListener("contextmenu", e => e.preventDefault());
    }
    return () => {
      wave.destroy();
      waveCut.destroy();
    };
  }, [Player, mp3Path, pcm, regionData]);

  return (
    <article>
      <div ref={waveLayoutRef} className='flex flex-col relative w-full justify-center bg-dc-edit'>
        <div
          id={"waveCutform"}
          ref={waveCutRef}
          className='w-full overflow-visible'
          style={{
            minHeight: "80px",
          }}
        ></div>
        <div id={"waveform"} ref={waveRef} className='w-full overflow-visible' style={{ minHeight: "102px" }}></div>
      </div>
    </article>
  );
}
