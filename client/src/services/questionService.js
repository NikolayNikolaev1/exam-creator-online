const baseUrl = "https://localhost:7052/api";

export const addQuestion = async (body) => {
  return await fetch(`${baseUrl}/Question`, {
    method: "POST",
    mode: "cors", // no-cors, *cors, same-origin
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  }).then((response) => {
    console.log({ response });
    if (!response.ok) {
      throw { statusCode: response.status };
    }

    return response.json();
  });
};

export const getQuestion = async (id) => {
  return await fetch(`${baseUrl}/Question/${id}`, {
    method: "GET",
    mode: "cors", // no-cors, *cors, same-origin
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => {
    if (!response.ok) {
      throw { statusCode: response.status };
    }
    return response.json();
  });
};

export const editQuestion = async (id, body) => {
  return await fetch(`${baseUrl}/Question/${id}`, {
    method: "PUT",
    mode: "cors", // no-cors, *cors, same-origin
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  }).then((response) => {
    console.log({ response });
    if (!response.ok) {
      throw { statusCode: response.status };
    }
  });
};

export const deleteQuestion = async (id) => {
  return await fetch(`${baseUrl}/Question/${id}`, {
    method: "DELETE",
    mode: "cors", // no-cors, *cors, same-origin
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => {
    if (!response.ok) {
      throw { statusCode: response.status };
    }
  });
};
