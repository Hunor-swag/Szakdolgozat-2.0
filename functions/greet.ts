import { Committee } from "../types/typings";

export function greet(person: Committee) {
  let text = "Tisztelt ";

  switch (person.uni_role.toLowerCase()) {
    case "egyetemi tanár":
      text += "Professzor ";
      break;
    case "docens":
      text += "Docens ";
      break;
  }

  if (person.gender.toLowerCase() === "férfi") {
    text += "Úr!";
  }
  if (person.gender.toLowerCase() === "nő") {
    text += "Asszony!";
  }
  return text;
}
