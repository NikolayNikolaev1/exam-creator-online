import { getQuestion } from "../../services/questionService";

export const getQuestionData = async (questionId) => {
  return await getQuestion(questionId)
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.log("Error: ");
      if (error.statusCode === 404) {
        console.log("404");
      }

      return {};
    });
};

export const isOnSubmitValid = (text, answears, setErrors) => {
  if (text.length < 5 || text.length > 30) {
    setErrors((oldErrors) => ({
      ...oldErrors,
      text: "Question text must be between 5 and 30 characters long.",
    }));

    return false;
  }

  if (
    typeof answears.find((a) => a.text.length < 5 || a.text.length > 30) !==
    "undefined"
  ) {
    setErrors((oldErrors) => ({
      ...oldErrors,
      answears: " texts must be between 5 and 30 characters long.",
    }));

    return false;
  }

  if (typeof answears.find((a) => a.isCorrect) === "undefined") {
    setErrors((oldErrors) => ({
      ...oldErrors,
      answears: " must have atleast one correct one in a question.",
    }));

    return false;
  }

  if (answears.length < 2) {
    setErrors((oldErrors) => ({
      ...oldErrors,
      answears: " count must be atleast 2 in a question.",
    }));

    return false;
  }

  const asnwearTexts = answears.map((a) => a.text);

  if (asnwearTexts.some((t, i) => asnwearTexts.indexOf(t) != i)) {
    setErrors((oldErrors) => ({
      ...oldErrors,
      answears: " texts must be unique in a question.",
    }));

    return false;
  }

  return true;
};
