import { atom } from "recoil";

export const inputValueAtom = atom({
  key: "inputValue",
  default: JSON.parse(sessionStorage.getItem("inputValue") || "{}"),
});
