import { getExam } from "../../services/examService";

export const EXAM_POINTS = {
  averagePoints: "Average",
  goodPoints: "Good",
  veryGoodPoints: "Very Good",
  excelentPoints: "Excelent",
};

export const getExamData = async (examId) => {
  return await getExam(examId)
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

export const validatePoints = (points, setErrors) => {
  const pointsValues = Object.values(points);
  const pointsKeys = Object.keys(points);

  pointsValues.forEach((p, i) => {
    if (p > 0 && p >= pointsValues[i + 1]) {
      setErrors((oldErrors) => ({
        ...oldErrors,
        [pointsKeys[i]]:
          "Points can not be greater than the next's score points.",
      }));
    } else if (p > 0) {
      setErrors((oldErrors) => ({
        ...oldErrors,
        [pointsKeys[i]]: "",
      }));
    }
  });
};
