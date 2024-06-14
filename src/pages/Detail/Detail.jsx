import Button from "@/components/Button";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import api from "../../api/api";
import ExpenseForm from "../../features/ExpenseForm/ExpenseForm";

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 1rem;
`;

const NoData = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

function Detail() {
  const { expenseId } = useParams();
  const queryClient = useQueryClient();

  const {
    data: expense,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["expense"],
    queryFn: () => api.expense.getExpense(expenseId),
  });

  const { mutate: updateExpense } = useMutation({
    mutationFn: (newExpense) =>
      api.expense.updateExpense({ ...newExpense, id: expenseId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["expense"] });
      goHome();
    },
  });

  const handleSubmit = ({ newExpense }) => {
    updateExpense(newExpense);
  };
  const navigate = useNavigate();
  const goHome = () => navigate("/");

  if (isLoading) return <Wrapper>isLoading...</Wrapper>;
  if (isError) return <Wrapper>isError...</Wrapper>;

  return (
    <Wrapper>
      {expense ? (
        <ExpenseForm
          handleSubmit={handleSubmit}
          initialValue={expense[0]}
          text="수정"
          userId={expense[0].userId}
        />
      ) : (
        <NoData>
          <div>아이디에 해당하는 데이터가 존재하지 않습니다 🥺</div>
          <Button onClick={goHome}>홈 화면으로 이동</Button>
        </NoData>
      )}
    </Wrapper>
  );
}

export default Detail;
