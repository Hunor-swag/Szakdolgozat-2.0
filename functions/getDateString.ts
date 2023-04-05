import { getMonthName } from "./getMonthName";

export function getDateString(date: Date) {
  const day = date.getDay();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes =
    date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
  return `${year}. ${getMonthName(month)} ${day}. ${hours}:${minutes}`;
}
