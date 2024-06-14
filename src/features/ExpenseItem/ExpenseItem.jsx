import ListItem from "@/components/ListItem";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledListItem = styled(ListItem)`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`;
const Content = styled.span`
  font-weight: bold;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #42b4aa;
`;
const Item = styled.span`
  background-color: #c0e4e1;
  color: black;
  padding: 0 0.2rem;
`;
const Description = styled.span``;
const Info = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 0.3rem;
`;
const Amount = styled.span`
  font-size: 0.9rem;
`;
const Date = styled.span`
  font-size: 0.7rem;
  color: #545454;
`;
const User = styled.div`
  display: flex;
  align-items: center;
  font-size: 0.8rem;
  color: #939393;
  gap: 0.3rem;
`;
const UserImg = styled.img`
  width: 1.1rem;
  height: 1.1rem;
  border-radius: 50%;
  object-fit: cover;
`;
const CreatedBy = styled.span``;
const UserId = styled.span``;

function ExpenseItem({ expense }) {
  return (
    <Link to={`/detail/${expense.id}`}>
      <StyledListItem>
        <Content>
          <Item>#{expense.item}</Item>{" "}
          <Description>{expense.description}</Description>
        </Content>
        <Amount>{expense.amount.toLocaleString()}원</Amount>
        <Info>
          <User>
            <UserImg src={expense.avatar} />
            <CreatedBy>{expense.createdBy} </CreatedBy>
            <UserId>({expense.userId})</UserId>
          </User>
          <Date>{expense.date}</Date>
        </Info>
      </StyledListItem>
    </Link>
  );
}

ExpenseItem.propTypes = {
  expense: PropTypes.shape({
    id: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    item: PropTypes.string.isRequired,
    amount: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
};

export default ExpenseItem;
