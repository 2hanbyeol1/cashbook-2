import MonthSelector from "@/components/MonthSelector";
import ExpenseForm from "@/features/ExpenseForm";
import ExpenseList from "@/features/ExpenseList";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { addExpense } from "../../redux/slices/expenses.slice";

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
  const dispatch = useDispatch();
  const expenses = useSelector((state) => state.expenses);

  const [selectedMonth, setSelectedMonth] = useState(
    parseInt(localStorage.getItem("month")) || 1
  );

  useEffect(() => {
    localStorage.setItem("month", selectedMonth);
  }, [selectedMonth]);

  const handleSubmit = ({ newExpense }) => {
    dispatch(addExpense(newExpense));
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
      <ExpenseList selectedMonth={selectedMonth} expenses={expenses} />
    </Wrapper>
  );
}

export default Home;
