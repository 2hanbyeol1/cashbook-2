import axios from "axios";
import { ACCESS_TOKEN } from "../constants/storageKey";
import AuthAPI from "./api.auth";
import ExpenseAPI from "./api.expense";

const BASE_URL = "https://hungry-spring-scourge.glitch.me";

class API {
  #baseURL = BASE_URL;
  #axios;
  #axiosJson;
  auth;
  expense;

  constructor() {
    this.#axios = axios.create({
      baseURL: "https://moneyfulpublicpolicy.co.kr",
      headers: {
        Authorization: localStorage.getItem(ACCESS_TOKEN)
          ? `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`
          : "",
      },
    });
    this.#axiosJson = axios.create({
      baseURL: this.#baseURL,
    });
    this.auth = new AuthAPI(this.#axios);
    this.expense = new ExpenseAPI(this.#axiosJson);
  }

  setAccessToken(accessToken) {
    this.#axios.defaults.headers.Authorization = accessToken
      ? `Bearer ${accessToken}`
      : "";
  }
}

const api = new API();

export default api;
