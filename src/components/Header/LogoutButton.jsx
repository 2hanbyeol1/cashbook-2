import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import api from "../../api/api";
import { ACCESS_TOKEN } from "../../constants/storageKey";
import useLoginStore from "../../state/zustand/login.store";

const Button = styled.button`
  padding: 0.3rem 0.5rem;
  border-radius: 0.3rem;
`;

function LogoutButton() {
  const navigate = useNavigate();
  const logout = useLoginStore((state) => state.logout);

  const handleButtonClicked = () => {
    alert("로그아웃 완료");
    logout();
    api.setAccessToken("");
    localStorage.removeItem(ACCESS_TOKEN);
    navigate("/login");
  };

  return <Button onClick={handleButtonClicked}>Logout</Button>;
}

export default LogoutButton;
