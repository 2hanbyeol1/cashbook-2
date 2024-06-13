class AuthAPI {
  #client;

  constructor(client) {
    this.#client = client;
  }

  async signUp({ id, password, nickname }) {
    try {
      const response = await this.#client.post("/register", {
        id,
        password,
        nickname,
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
      const response = await this.#client.post("/login?expiresIn=1h", {
        id,
        password,
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
      return null;
    }
  }

  async changeInfo({ avatar, nickname }) {
    try {
      const formData = new FormData();
      formData.append("avatar", avatar);
      formData.append("nickname", nickname);
      const response = await this.#client.patch("/profile", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      const data = response.data;
      return data;
    } catch (e) {
      throw new Error();
    }
  }
}

export default AuthAPI;
