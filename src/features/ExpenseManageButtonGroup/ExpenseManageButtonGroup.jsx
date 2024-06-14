import Button from "@/components/Button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import PropTypes from "prop-types";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import api from "../../api/api";

const ButtonGroup = styled.div`
  display: flex;
  gap: 0.3rem;
  justify-content: flex-end;
`;

function ExpenseManageButtonGroup({ text, isMine }) {
  const { expenseId } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: deleteExpense } = useMutation({
    mutationFn: () => api.expense.deleteExpense(expenseId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["expense"] });
      goHome();
    },
  });

  const goHome = () => navigate("/");

  const handleDeleteButtonClicked = () => {
    if (!confirm("정말 삭제하시겠습니까?")) return;
    deleteExpense(expenseId);
  };

  return (
    <ButtonGroup>
      {(text === "등록" || isMine) && <Button type="submit">{text}</Button>}
      {text === "수정" && isMine && (
        <Button type="button" onClick={handleDeleteButtonClicked}>
          삭제
        </Button>
      )}
      <Button type="button" onClick={goHome}>
        홈 화면으로 이동
      </Button>
    </ButtonGroup>
  );
}

ExpenseManageButtonGroup.propTypes = {
  text: PropTypes.string.isRequired,
  isMine: PropTypes.bool,
};

export default ExpenseManageButtonGroup;
