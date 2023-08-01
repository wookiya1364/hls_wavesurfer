import { UtilityPlayer } from "@/utility/player/player";
import { atom } from "jotai";

const subtitleAtom = atom([]);
const playerAtom = atom(new UtilityPlayer());
const playerButtonAtom = atom(false);

export { subtitleAtom, playerAtom, playerButtonAtom };
