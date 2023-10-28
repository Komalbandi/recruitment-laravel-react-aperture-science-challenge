import { Subject } from "../../interfaces";

export const validateForm = (subjectData: Subject): string[] | [] => {
  let tmpErrorMessages = [];

  if (!subjectData.name) {
    tmpErrorMessages.push("Name is required");
  } else if (
    !(subjectData["date_of_birth"] && new Date(subjectData["date_of_birth"]))
  ) {
    tmpErrorMessages.push("Dob must be in YYYY-MM-DD format");
  } else if (!subjectData["alive"]) {
    tmpErrorMessages.push("Alive is required");
  } else if (!subjectData["score"] || subjectData["score"] === 0) {
    tmpErrorMessages.push("score is required");
  } else if (
    !subjectData["test_chamber" || subjectData["test_chamber"] === 0]
  ) {
    tmpErrorMessages.push("test chamber is required");
  }

  return tmpErrorMessages;
};
