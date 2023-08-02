"use client";

import MinimapPlugin from "wavesurfer.js/dist/plugins/Minimap.js";
import TimelinePlugin from "wavesurfer.js/dist/plugins/timeline.js";

export const waveSurferCutWrapper = (ref: HTMLDivElement, mp3Path: string, PCM: any) => {
  return {
    container: ref,
    url: mp3Path,
    peaks: PCM,
    autoCenterRate: 10,
    waveColor: "#00acff",
    progressColor: "#f1288e",
    cursorColor: "rgb(255,87,87)",
    hideScrollbar: true,
    cursorWidth: 6,
    barWidth: 5, //파형 막대모양
    barHeight: 1,
    barRadius: 5,
    removeMediaElementOnDestroy: false,
    // height: 160,
    height: 30,
    fillParent: false,
    minPxPerSec: 120,
    plugins: [
      TimelinePlugin.create({
        height: 30,
        insertPosition: "beforebegin",
        // timeInterval: 0.2,
        primaryLabelInterval: 5,
        secondaryLabelInterval: 5,
        style: {
          // top: "0px",
          fontSize: "20px",
        },
      }),
    ],
  };
};

export const waveSurferWrapper = (ref: HTMLDivElement, mp3Path: string, PCM: any) => {
  return {
    container: ref,
    url: mp3Path,
    peaks: PCM,
    // autoCenter: true,
    // autoCenterRate: 0.5,
    autoCenterRate: 10,
    // waveColor: "#D9DCFF",
    // progressColor: "#4353FF",
    waveColor: "#00acff",
    progressColor: "#f1288e",
    cursorColor: "rgb(255,87,87)",
    hideScrollbar: true,
    cursorWidth: 6,
    barWidth: 5, //파형 막대모양
    barHeight: 1,
    // "barRadius": 3,
    barRadius: 5,
    removeMediaElementOnDestroy: false,
    // height: 160,
    height: 82,
    fillParent: false,
    minPxPerSec: 120,
    plugins: [
      MinimapPlugin.create({
        height: 20,
        waveColor: "#00acff",
        progressColor: "#f1288e",
        container: "",
        cursorColor: "rgb(255,87,87)",
        cursorWidth: 3,
      }),
      TimelinePlugin.create({
        height: 30,
        insertPosition: "beforebegin",
        // timeInterval: 0.2,
        timeInterval: 0.5,
        primaryLabelInterval: 5,
        secondaryLabelInterval: 1,
        style: {
          // top: "130px",
          top: "50px",
          fontSize: "20px",
        },
      }),
    ],
  };
};
