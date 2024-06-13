import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import styled from "styled-components";
import api from "../api/api";
import Header from "../components/Header";
import useLoginStore from "../state/zustand/login.store";

const Container = styled.div`
  height: 100%;
`;

function DefaultLayout() {
  const navigate = useNavigate();
  const login = useLoginStore((state) => state.login);

  useEffect(() => {
    const getUserByAccessToken = async () => {
      const loginUser = await api.auth.getUser();
      if (loginUser) login(loginUser);
      else navigate("/login");
    };
    getUserByAccessToken();
  }, []);

  return (
    <Container>
      <Header />
      <Outlet />
    </Container>
  );
}

export default DefaultLayout;
