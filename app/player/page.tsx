import VideoComponent from "../@component/video";
import WaveComponent from "../@component/wave";
import Controller from "./controller";
const HOST = process.env.NEXT_PUBLIC_HOST;

async function getSubtitle(subtitlePath: string) {
  return await fetch(subtitlePath).then(res => res.json());
}
async function getPCM(pcmPath: string) {
  return await fetch(pcmPath).then(res => res.json());
}

export default async function PlayerHome() {
  const subtitlePath = `${HOST}/api/component/wave_subtitle`;
  const pcmPath = `${HOST}/api/component/wave_pcm?pcmPath=/pcm/test.json`;

  const subtitle: typeSubtitle[] = await getSubtitle(subtitlePath);
  const pcm = await getPCM(pcmPath);
  const m3u8Path = "/video/test.m3u8";
  const mp3Path = "/mp3/test.mp3";

  return (
    <section className='flex flex-col h-screen'>
      <VideoComponent m3u8Path={m3u8Path}></VideoComponent>
      <Controller></Controller>
      <WaveComponent mp3Path={mp3Path} pcm={pcm} subtitle={subtitle}></WaveComponent>
    </section>
  );
}
