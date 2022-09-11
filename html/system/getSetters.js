const sign = "--";

export function getValue(id, element, parseMethod) {
  return parseMethod(getComputedStyle(element).getPropertyValue(sign + id));
}

export function getRect(element) {
  return element.getBoundingClientRect();
}

export function setValue(id, value, element) {
  element.style.setProperty(sign + id, value);
}

function getV(value, v, isReversed) {
  return isReversed ? (value / 100) * v : (value / v) * 100;
}

export function getVh(value, isReversed = false) {
  return getV(value, window.innerHeight, isReversed);
}

export function getVw(value, isReversed = false) {
  return getV(value, window.innerWidth, isReversed);
}

export function getElement(id) {
  return document.getElementById(id);
}

export function gettHtml(id) {
  return getElement(id).innerHTML;
}

export function setHtml(id, html) {
  getElement(id).innerHTML = html;
}

export function getInput(id) {
  return getElement(id).value;
}

export function setInput(id, value) {
  getElement(id).value = value;
}

export function getKey(key, defaultTo) {
  const value = localStorage.getItem(key);
  if (value === null) {
    setKey(key, defaultTo);
    return defaultTo;
  }
  return value;
}

export function setKey(key, value) {
  localStorage.setItem(key, value);
}

export function callInput(id, key, defaultTo) {
  let value = localStorage.getItem(key);
  if (value === null) {
    value = defaultTo;
  }
  setInput(id, value);
}

export function getParameter(id, defaultTo) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  let value = urlParams.get(id);
  if (value === null || value === "NaN") {
    value = localStorage.getItem(id);
    if (value === null) {
      value = defaultTo;
    }
  }
  return value;
}
