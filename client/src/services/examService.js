const baseUrl = "https://localhost:7052/api";

export const addExam = async (body) => {
  return await fetch(`${baseUrl}/Exam`, {
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

export const getExam = async (id) => {
  return await fetch(`${baseUrl}/Exam/${id}`, {
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

export const editExam = async (id, body) => {
  return await fetch(`${baseUrl}/Exam/${id}`, {
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


export const deleteExam = async (id) => {
  return await fetch(`${baseUrl}/Exam/${id}`, {
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

