import { getMonthName } from "./getMonthName";

export function getDateString(date: Date, time: boolean = false) {
  const day = date.getDay();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes =
    date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
  return time
    ? `${year}. ${getMonthName(month)} ${day}. ${hours}:${minutes}`
    : `${year}. ${getMonthName(month)} ${day}.`;
}
