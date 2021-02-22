import { IUser } from "../models/Interface"

export function sortArry(arr: Array<any>):void {
  arr = arr.sort((a, b) => a.from_year < b.from_year ? 1 : -1);
}

export function deleteItemArray(arr: Array<any>, id: number):void {

  arr.slice(arr.indexOf(id), 1);
}


