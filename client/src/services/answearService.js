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

export const editAnswear = async (id, body) => {
  return await fetch(`${baseUrl}/Answear/${id}`, {
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
  });
};

export const deleteAnswear = async (id) => {
  return await fetch(`${baseUrl}/Answear/${id}`, {
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
