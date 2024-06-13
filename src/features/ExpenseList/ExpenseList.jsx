import { useQuery } from "@tanstack/react-query";
import PropTypes from "prop-types";
import styled from "styled-components";
import api from "../../api/api";
import ExpenseItem from "../ExpenseItem";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  background-color: white;
  border-radius: 0.3rem;
  max-height: 10rem;
  overflow-y: scroll;
`;

const NullData = styled.div`
  text-align: center;
`;

function ExpenseList({ selectedMonth }) {
  const {
    data: expenses,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["expense", { list: true }], // 쿼리키는 배열로 만든다. 첫 요소는 데이터의 모델명 string, 두번째 요소는 데이터를 설명하는 정보를 object로 넣는다.
    queryFn: () => api.expense.getExpenses(),
  });

  const filteredExpenses = expenses?.filter(
    (expense) => parseInt(expense.date.split("-")[1]) === selectedMonth
  );

  if (isLoading) return <section>isLoading...</section>;
  if (isError) return <section>isError...</section>;

  return (
    <section>
      <Wrapper>
        {filteredExpenses.length === 0 ? (
          <NullData>{selectedMonth}월 지출 내역이 없습니다 🤷</NullData>
        ) : (
          filteredExpenses
            .sort((a, b) => (a.date < b.date ? 1 : -1))
            .map((expense) => (
              <ExpenseItem key={expense.id} expense={expense} />
            ))
        )}
      </Wrapper>
    </section>
  );
}

ExpenseList.propTypes = {
  selectedMonth: PropTypes.number.isRequired,
};

export default ExpenseList;
