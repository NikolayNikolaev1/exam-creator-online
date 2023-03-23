const baseUrl = "https://localhost:7052/api";

export const createFacilityOwner = async (body) => {
  return await fetch(`${baseUrl}/User`, {
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

export const login = async (body) => {
  return await fetch(`${baseUrl}/Login`, {
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

export const register = async (body) => {
  return await fetch(`${baseUrl}/Register`, {
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
