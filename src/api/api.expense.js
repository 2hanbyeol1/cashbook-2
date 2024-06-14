import { v4 as uuid } from "uuid";
class ExpenseAPI {
  #client;

  constructor(client) {
    this.#client = client;
  }

  async getExpenses() {
    try {
      const response = await this.#client.get("/expenses");
      const data = response.data;
      return data;
    } catch (e) {
      alert("지출 내역을 가져오는데 실패했습니다");
    }
    return null;
  }

  async getExpensesByUserId(userId) {
    try {
      const response = await this.#client.get(`/expenses?userId=${userId}`);
      const data = response.data;
      return data;
    } catch (e) {
      alert("해당 유저의 지출 정보를 가져오는데 실패했습니다");
    }
    return null;
  }

  async getExpense(expenseId) {
    try {
      const response = await this.#client.get(`/expenses?id=${expenseId}`);
      const data = response.data;
      return data;
    } catch (e) {
      alert("해당 지출의 상세 정보를 가져오는데 실패했습니다");
    }
    return null;
  }

  async addExpense(newExpense) {
    try {
      const response = await this.#client.post("/expenses", {
        id: uuid(),
        ...newExpense,
      });
      const data = response.data;
      return data;
    } catch (e) {
      alert("지출 추가에 실패했습니다");
    }
    return null;
  }

  async updateExpense(expenseId, newExpense) {
    try {
      const response = await this.#client.patch(
        `/expenses/${expenseId}`,
        newExpense
      );
      const data = response.data;
      return data;
    } catch (e) {
      alert("지출 수정에 실패했습니다");
    }
    return null;
  }

  async deleteExpense(expenseId) {
    try {
      const response = await this.#client.delete(`/expenses/${expenseId}`);
      const data = response.data;
      return data;
    } catch (e) {
      alert("지출 삭제에 실패했습니다");
    }
    return null;
  }
}

export default ExpenseAPI;
