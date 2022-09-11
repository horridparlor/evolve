export function reverseArray(start, source) {
  const reversed = new Array();
  const count = source.length;
  let index = start - 1;
  for (let i = 0; i < count; i++) {
    reversed[i] = source[index];
    index--;
    if (index === -1) {
      index += count;
    }
  }
  return reversed;
}
