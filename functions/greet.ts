import { Committee } from "../types/typings";

export function greet(person: Committee) {
  let text = "Tisztelt ";

  text += person.uni_role + " ";

  if (person.gender.toLowerCase() === "férfi") {
    text += "Úr!";
  }
  if (person.gender.toLowerCase() === "nő") {
    text += "Asszony!";
  }
  return text;
}
