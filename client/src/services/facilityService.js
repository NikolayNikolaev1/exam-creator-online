const baseUrl = "https://localhost:7052/api";

export const createFacilityOwner = async (body) => {
  return await fetch(`${baseUrl}/Facility/Create`, {
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

export const getFacility = async (id) => {
  return await fetch(`${baseUrl}/Facility/${id}`, {
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

export const editFacility = async (id, body) => {
  return await fetch(`${baseUrl}/Facility/${id}`, {
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
