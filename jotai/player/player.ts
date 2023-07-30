import { atom } from "jotai";
import { playerAtom } from "../storage";

export const readOnly_PlayerAtom = atom(get => get(playerAtom));

export const writeOnly_PlayerAtom = atom(null, (get, set, subtitle: any) => {
  set(playerAtom, subtitle);
});

export const readWrite_PlayerAtom = atom(
  get => get(playerAtom),
  (get, set, subtitle: any) => {
    set(playerAtom, subtitle);
  }
);
