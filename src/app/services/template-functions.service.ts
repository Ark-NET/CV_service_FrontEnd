export function sortArry(arr: Array<any>) {
  arr = arr.sort((a, b) => a.from_year < b.from_year ? 1 : -1);
}
