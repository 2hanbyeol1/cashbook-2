import Button from "@/components/Button";
import Link from "@/components/Link";
import TextInput from "@/components/TextInput";
import Title from "@/components/Title";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import api from "../../api/api";
import {
  ID_MAX,
  ID_MIN,
  NAME_MAX,
  NAME_MIN,
  PW_MAX,
  PW_MIN,
} from "../../constants/inputLength";

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

function SignUp() {
  const navigate = useNavigate();
  const idRef = useRef(null);
  const pwRef = useRef(null);
  const nameRef = useRef(null);

  const handleSignUpFormSubmit = async (e) => {
    e.preventDefault();
    const id = idRef.current.value;
    const pw = pwRef.current.value;
    const name = nameRef.current.value;

    if (id.length < ID_MIN || id.length > ID_MAX)
      return alert(`아이디는 ${ID_MIN} - ${ID_MAX} 글자로 작성해주세요`);
    if (pw.length < PW_MIN || pw.length > PW_MAX)
      return alert(`비밀번호는 ${PW_MIN} - ${PW_MAX} 글자로 작성해주세요`);
    if (name.length < NAME_MIN || name.length > NAME_MAX)
      return alert(`닉네임은 ${NAME_MIN} - ${NAME_MAX} 글자로 작성해주세요`);

    const success = await api.auth.signUp({ id, password: pw, nickname: name });
    if (success) {
      alert("회원가입 성공");
      navigate("/login");
    }
  };

  return (
    <Wrapper>
      <StyledForm onSubmit={handleSignUpFormSubmit}>
        <Title>회원가입</Title>
        <TextInput ref={idRef} placeholder="아이디" />
        <TextInput type="password" ref={pwRef} placeholder="비밀번호" />
        <TextInput ref={nameRef} placeholder="닉네임" />
        <Button $width="100%">회원가입</Button>
        <StyledLink to="/login">로그인</StyledLink>
      </StyledForm>
    </Wrapper>
  );
}

export default SignUp;
