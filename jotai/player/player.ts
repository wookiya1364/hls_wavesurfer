import { atom } from "jotai";
import { playerAtom, playerButtonAtom } from "../storage";

const readOnly_PlayerAtom = atom(get => get(playerAtom));

const writeOnly_PlayerAtom = atom(null, (get, set, player: any) => {
  set(playerAtom, player);
});

const readWrite_PlayerAtom = atom(
  get => get(playerAtom),
  (get, set, player: any) => {
    set(playerAtom, player);
  }
);

const readOnly_PlayerButtonAtom = atom(get => get(playerButtonAtom));

const readWrite_PlayerButtonAtom = atom(
  get => get(playerButtonAtom),
  (get, set, buttonStatus: boolean) => {
    set(playerButtonAtom, buttonStatus);
  }
);

export {
  readOnly_PlayerAtom,
  writeOnly_PlayerAtom,
  readWrite_PlayerAtom,
  readOnly_PlayerButtonAtom,
  readWrite_PlayerButtonAtom,
};