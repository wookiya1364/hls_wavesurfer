import WaveSurfer from "wavesurfer.js";

export class UtilityPlayerDTO {
  private static singletonWaveDTO: UtilityPlayerDTO;
  private wave: WaveSurfer | undefined;
  private waveCut: WaveSurfer | undefined;
  private video: HTMLVideoElement | undefined;

  constructor(
    wave: WaveSurfer | undefined = undefined,
    waveCut: WaveSurfer | undefined = undefined,
    video: HTMLVideoElement | undefined = undefined
  ) {
    if (wave !== undefined) {
      this.wave = wave;
    }
    if (waveCut !== undefined) {
      this.waveCut = waveCut;
    }
    if (video !== undefined) {
      this.video = video;
    }
  }

  static getSingleton(
    wave: WaveSurfer | undefined,
    waveCut: WaveSurfer | undefined,
    video: HTMLVideoElement | undefined
  ) {
    if (UtilityPlayerDTO.singletonWaveDTO === undefined) {
      UtilityPlayerDTO.singletonWaveDTO = new UtilityPlayerDTO(wave, waveCut, video);
    }
    return UtilityPlayerDTO.singletonWaveDTO;
  }

  getWave() {
    return this.wave!;
  }
  getWaveCut() {
    return this.waveCut!;
  }
  getVideo() {
    return this.video!;
  }
  setWave(wave: WaveSurfer) {
    this.wave = wave;
  }
  setWaveCut(wave: WaveSurfer) {
    this.waveCut = wave;
  }
  setVideo(video: HTMLVideoElement) {
    this.video = video;
  }
}
