import WaveSurfer from "wavesurfer.js";
import { UtilityPlayerDTO } from "./dto";

export class UtilityPlayer extends UtilityPlayerDTO {
  private currentWaveTime: number = 0;
  constructor(
    wave: WaveSurfer | undefined = undefined,
    waveCut: WaveSurfer | undefined = undefined,
    video: HTMLVideoElement | undefined = undefined
  ) {
    super(wave, waveCut, video);
  }

  /**
   * wave 또는 waveCut의 재생 시간을 반환한다.
   * @param null
   * @returns (number) wave 재생 시간
   */
  getCurrentPlayerTime() {
    return this.currentWaveTime;
  }
  /**
   * wave 또는 waveCut의 재생 시간을 설정한다.
   * @param (number) 설정하고 싶은 wave 재생 시간
   * @returns (null)
   */
  setCurrentPlayerTime(time: number) {
    this.currentWaveTime = time;
  }

  /**
   * 플레이어 시작, 정지 토글
   * @param null
   * @returns null
   */
  handleClickPlayerToggle() {
    if (this.getWave().isPlaying()) {
      this.getWave().pause();
      this.getWaveCut().pause();
      this.getVideo().pause();
    } else {
      this.getWave().play();
      this.getWaveCut().play();
      this.getVideo().play();
    }
  }

  /**
   * wave 또는 waveCut에서 클릭한 영역으로 wave, waveCut, video 시간이 이동한다.
   * @param time (number) 시간
   * @returns null
   */
  handleClickWaveSeek(time: number) {
    if (this.getCurrentPlayerTime() !== time) {
      this.setCurrentPlayerTime(time);
      this.getVideo().currentTime = time;
      this.getWave().setTime(time);
      this.getWaveCut().setTime(time);
    }
  }
}
