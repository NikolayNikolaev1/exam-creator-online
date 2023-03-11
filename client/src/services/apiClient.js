const baseUrl = "https://localhost:7052/api";

export const getExamList = async () => {
  await fetch(`${baseUrl}/Exam`).then((response) => {
    console.log({ response: response });
  });
};
