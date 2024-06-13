class AuthAPI {
  #client;

  constructor(client) {
    this.#client = client;
  }

  async signUp({ id, password, nickname }) {
    try {
      const response = await this.#client.post("/register", {
        id: id,
        password: password,
        nickname: nickname,
      });
      const data = response.data;
      return data.success;
    } catch (e) {
      alert(e.response.data.message);
    }
    return false;
  }

  async login({ id, password }) {
    try {
      const response = await this.#client.post("/login?expiresIn=10m", {
        id: id,
        password: password,
      });
      const data = response.data;
      return data;
    } catch (e) {
      alert(e.response.data.message);
    }
    return null;
  }

  async getUser() {
    try {
      const response = await this.#client.get("/user");
      const data = response.data;
      return data;
    } catch (e) {
      console.log(e.response.data.message);
      throw new Error();
    }
    return null;
  }
}

export default AuthAPI;
