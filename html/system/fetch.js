export function fetchData(url, setMethod) {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      if (setMethod != null) {
        setMethod(data);
      }
    });
}

export function fetchElement(url, id) {
  fetch(url)
    .then((response) => response.text())
    .then((data) => {
      document.getElementById(id).innerHTML = data;
    });
}
