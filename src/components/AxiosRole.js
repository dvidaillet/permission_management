import axios from "axios";

const request = axios.create({
  baseURL: process.env.PUBLIC_URL, //url base de tu api.
  headers: { "Content-Type": "application/json" }, //Añadimos las cabeceras.
});

export default request;
