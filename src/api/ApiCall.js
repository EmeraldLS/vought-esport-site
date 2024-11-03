import axios from "axios";

export const getRequest = async (url) => {
  const response = axios.get(url);
  return (await response).data;
};

export const postRequest = async (url, data, token) => {
  if (!token) {
    throw new Error("Token is required");
  }
  const response = await axios.post(url, data, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const putRequest = async (url, data, token) => {
  const response = await axios.put(url, data, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
