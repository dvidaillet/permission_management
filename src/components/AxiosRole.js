import axios from "axios";

const baseURL = process.env.REACT_APP_API_URL;

const axiosRequest = axios.create({
  baseURL, //url base de tu api.
  headers: { "Content-Type": "application/json" }, //Añadimos las cabeceras.
});

export default axiosRequest;
