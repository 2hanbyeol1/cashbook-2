import Button from "@/components/Button";
import Link from "@/components/Link";
import TextInput from "@/components/TextInput";
import Title from "@/components/Title";
import { useRef } from "react";
import styled from "styled-components";
import { ID_MAX, ID_MIN, PW_MAX, PW_MIN } from "../../constants/inputLength";

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
  const idRef = useRef(null);
  const pwRef = useRef(null);

  const handleLoginFormSubmit = (e) => {
    e.preventDefault();
    const idLength = idRef.current.value.length;
    const pwLength = pwRef.current.value.length;
    if (idLength < ID_MIN || idLength > ID_MAX)
      return alert(`아이디는 ${ID_MIN} - ${ID_MAX} 글자로 작성해주세요`);
    if (pwLength < PW_MIN || pwLength > PW_MAX)
      return alert(`비밀번호는 ${PW_MIN} - ${PW_MAX} 글자로 작성해주세요`);
  };

  return (
    <Wrapper>
      <StyledForm onSubmit={handleLoginFormSubmit}>
        <Title>로그인</Title>
        <TextInput ref={idRef} placeholder="아이디" />
        <TextInput ref={pwRef} placeholder="비밀번호" />
        <Button $width="100%">로그인</Button>
        <StyledLink to="/signup">회원가입</StyledLink>
      </StyledForm>
    </Wrapper>
  );
}

export default Login;
