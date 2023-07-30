import { UtilityPlayer } from "@/utility/player/player";
import { atom } from "jotai";

const subtitleAtom = atom([]);
const playerAtom = atom(new UtilityPlayer());

export { subtitleAtom, playerAtom };
