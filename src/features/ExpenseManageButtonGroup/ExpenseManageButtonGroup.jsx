import Button from "@/components/Button";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { deleteExpense } from "../../redux/slices/expenses.slice";

const ButtonGroup = styled.div`
  display: flex;
  gap: 0.3rem;
`;

function ExpenseManageButtonGroup() {
  const { expenseId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const goHome = () => navigate("/");

  const handleDeleteButtonClicked = () => {
    if (!confirm("정말 삭제하시겠습니까?")) return;
    dispatch(deleteExpense(expenseId));
    goHome();
  };

  return (
    <ButtonGroup>
      <Button type="submit">수정</Button>
      <Button type="button" onClick={handleDeleteButtonClicked}>
        삭제
      </Button>
      <Button type="button" onClick={goHome}>
        홈 화면으로 이동
      </Button>
    </ButtonGroup>
  );
}

ExpenseManageButtonGroup.propTypes = {};

export default ExpenseManageButtonGroup;
