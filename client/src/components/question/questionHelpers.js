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
