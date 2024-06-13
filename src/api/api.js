import axios from "axios";
import { ACCESS_TOKEN } from "../constants/storageKey";
import AuthAPI from "./api.auth";

const BASE_URL = "https://moneyfulpublicpolicy.co.kr";

class API {
  #baseURL = BASE_URL;
  #axios;
  auth;

  constructor() {
    this.#axios = axios.create({
      baseURL: this.#baseURL,
      headers: {
        Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}` || "",
      },
    });
    this.auth = new AuthAPI(this.#axios);
  }

  setAccessToken(accessToken) {
    this.#axios.defaults.headers.common.Authorization = accessToken
      ? `Bearer ${accessToken}`
      : "";
  }
}

const api = new API();

export default api;
