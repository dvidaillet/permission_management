import axios from "axios";

export const getRol = async () => {
  return await axios.get(process.env.PUBLIC_URL);
};
export const posttRol = async () => {
  return await axios.post(process.env.PUBLIC_URL);
};
export const putRol = async () => {
  return await axios.put(process.env.PUBLIC_URL);
};
