import Button from "@/components/Button";
import Link from "@/components/Link";
import TextInput from "@/components/TextInput";
import Title from "@/components/Title";
import styled from "styled-components";

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
  width: 300px;
  padding: 1rem;
  border-radius: 0.3rem;
`;

const StyledLink = styled(Link)`
  margin-top: 0.3rem;
`;

function Login() {
  return (
    <Wrapper>
      <StyledForm>
        <Title>로그인</Title>
        <TextInput placeholder="아이디" />
        <TextInput placeholder="비밀번호" />
        <Button $width="100%">로그인</Button>
        <StyledLink to="/signup">회원가입</StyledLink>
      </StyledForm>
    </Wrapper>
  );
}

export default Login;