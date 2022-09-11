import { getElement } from "./getSetters.js";

export function addListen(id, method) {
  getElement(id).addEventListener("click", method);
}
