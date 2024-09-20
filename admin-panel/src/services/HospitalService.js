import axios from "axios";

const API_URL =
  "https://doctor-appointment-webapp-bakend.onrender.com/api/hospitals";

export const getHospitals = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const getHospital = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const updateHospital = async (id, data) => {
  const response = await axios.put(`${API_URL}/${id}`, data);
  return response.data;
};
