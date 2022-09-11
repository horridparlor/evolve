export function sterilize(string) {
  const special = "#&+=-<>?";
  for (var i = 0; i < special.length; i++) {
    string = string.replace(new RegExp("\\" + special[i], "gi"), "");
  }
  return string;
}
