import MonthSelector from "@/components/MonthSelector";
import ExpenseForm from "@/features/ExpenseForm";
import ExpenseList from "@/features/ExpenseList";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import styled from "styled-components";
import api from "../../api/api";
import useLoginStore from "../../state/zustand/login.store";

const Wrapper = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.7rem;
  height: 100%;
  margin: 0 1rem;
  > section {
    width: 100%;
  }
`;

function Home() {
  const loginUser = useLoginStore((state) => state.loginUser);
  const queryClient = useQueryClient();

  const { isPending, mutate: addExpense } = useMutation({
    mutationFn: (newExpense) => api.expense.addExpense(newExpense),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["expense"] });
    },
  });

  const [selectedMonth, setSelectedMonth] = useState(
    parseInt(localStorage.getItem("month")) || 1
  );

  useEffect(() => {
    localStorage.setItem("month", selectedMonth);
  }, [selectedMonth]);

  const handleSubmit = ({ newExpense }) => {
    addExpense({
      ...newExpense,
      createdBy: loginUser.nickname,
      userId: loginUser.id,
      avatar: loginUser.avatar,
    });
    const month = parseInt(newExpense.date.split("-")[1]);
    setSelectedMonth(month);
  };

  const handleMonthClicked = (newMonth) => {
    setSelectedMonth(newMonth);
  };

  return (
    <Wrapper>
      <MonthSelector
        selectedMonth={selectedMonth}
        handleMonthClicked={handleMonthClicked}
      />
      <ExpenseForm handleSubmit={handleSubmit} text="등록" />
      <ExpenseList selectedMonth={selectedMonth} isPending={isPending} />
    </Wrapper>
  );
}

export default Home;
