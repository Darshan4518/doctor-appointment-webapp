import axios from "axios";

const API_URL =
  "https://doctor-appointment-webapp-bakend.onrender.com/api/categories";

export const getCategories = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const getCategory = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const updateCategory = async (id, data) => {
  const response = await axios.put(`${API_URL}/${id}`, data);
  return response.data;
};
