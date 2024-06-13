import Button from "@/components/Button";
import Link from "@/components/Link";
import TextInput from "@/components/TextInput";
import Title from "@/components/Title";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import api from "../../api/api";
import { ID_MAX, ID_MIN, PW_MAX, PW_MIN } from "../../constants/inputLength";
import { ACCESS_TOKEN } from "../../constants/storageKey";
import useLoginStore from "../../state/zustand/login.store";

const Wrapper = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  background-color: white;
  width: 270px;
  padding: 1rem;
  border-radius: 0.3rem;
`;

const StyledLink = styled(Link)`
  margin-top: 0.3rem;
`;

function Login() {
  const navigate = useNavigate();
  const idRef = useRef(null);
  const pwRef = useRef(null);

  const login = useLoginStore((state) => state.login);

  const handleLoginFormSubmit = async (e) => {
    e.preventDefault();
    const id = idRef.current.value;
    const pw = pwRef.current.value;
    if (id.length < ID_MIN || id.length > ID_MAX)
      return alert(`아이디는 ${ID_MIN} - ${ID_MAX} 글자로 작성해주세요`);
    if (pw.length < PW_MIN || pw.length > PW_MAX)
      return alert(`비밀번호는 ${PW_MIN} - ${PW_MAX} 글자로 작성해주세요`);

    const loginUser = await api.auth.login({ id, password: pw });
    if (loginUser) {
      alert(`${loginUser.nickname}님 환영합니다`);
      api.setAccessToken(loginUser.accessToken);
      localStorage.setItem(ACCESS_TOKEN, loginUser.accessToken);
      login(loginUser);
      navigate("/");
    }
  };

  return (
    <Wrapper>
      <StyledForm onSubmit={handleLoginFormSubmit}>
        <Title>로그인</Title>
        <TextInput ref={idRef} placeholder="아이디" />
        <TextInput type="password" ref={pwRef} placeholder="비밀번호" />
        <Button $width="100%">로그인</Button>
        <StyledLink to="/signup">회원가입</StyledLink>
      </StyledForm>
    </Wrapper>
  );
}

export default Login;
