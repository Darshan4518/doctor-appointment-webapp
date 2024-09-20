import axios from "axios";

const API_URL =
  "https://doctor-appointment-webapp-bakend.onrender.com/api/doctors";

export const getDoctors = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const getDoctor = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const updateDoctor = async (id, data) => {
  const response = await axios.put(`${API_URL}/${id}`, data);
  return response.data;
};
