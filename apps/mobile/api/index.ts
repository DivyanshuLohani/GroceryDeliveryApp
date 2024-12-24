import a from "axios";

// TODO: Set this to true when building
const PRODUCTION = false;

export const BASE_URL = "http://192.168.29.63:8000";

export const api = a.create({
  baseURL: BASE_URL,
});
