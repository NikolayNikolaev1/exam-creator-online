const baseUrl = "https://localhost:7052/api";

export const addAnswear = async (body) => {
  return await fetch(`${baseUrl}/Answear`, {
    method: "POST",
    mode: "cors", // no-cors, *cors, same-origin
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  }).then((response) => {
    if (!response.ok) {
      throw { statusCode: response.status };
    }
    return response.json();
  });
};
