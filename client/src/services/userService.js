const baseUrl = "https://localhost:7052/api";

export const editUser = async (body) => {
  return await fetch(`${baseUrl}/User`, {
    method: "PUT",
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
