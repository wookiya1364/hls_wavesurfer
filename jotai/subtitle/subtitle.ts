import { atom } from "jotai";
import { subtitleAtom } from "../storage";

export const readOnly_SubtitleAtom = atom(get => get(subtitleAtom));

export const writeOnly_SubtitleAtom = atom(null, (get, set, subtitle: any) => {
  set(subtitleAtom, subtitle);
});

export const readWrite_SubtitleAtom = atom(
  get => get(subtitleAtom),
  (get, set, subtitle: any) => {
    set(subtitleAtom, subtitle);
  }
);
