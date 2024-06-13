import Button from "@/components/Button";
import TextInput from "@/components/TextInput";
import Title from "@/components/Title";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import api from "../../api/api";
import ImageInput from "../../components/ImageInput/ImageInput";
import { NAME_MAX, NAME_MIN } from "../../constants/inputLength";
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

function MyPage() {
  const [image, setImage] = useState("");
  const nameRef = useRef(null);
  const imageRef = useRef(null);

  const loginUser = useLoginStore((state) => state.loginUser);
  const login = useLoginStore((state) => state.login);

  useEffect(() => {
    nameRef.current.value = loginUser?.nickname;
    setImage(loginUser?.avatar);
  }, [loginUser]);

  const handleChangeFormSubmit = async (e) => {
    e.preventDefault();
    const imageFile = imageRef.current.files[0];
    const name = nameRef.current.value;
    if (name.length < NAME_MIN || name.length > NAME_MAX)
      return alert(`닉네임은 ${NAME_MIN} - ${NAME_MAX} 글자로 작성해주세요`);

    const changedUser = await api.auth.changeInfo({
      nickname: name,
      avatar: imageFile,
    });
    if (changedUser) {
      alert(`수정 완료`);
      login({
        ...loginUser,
        nickname: changedUser.nickname,
        avatar: changedUser.avatar,
      });
    }
  };

  return (
    <Wrapper>
      <StyledForm onSubmit={handleChangeFormSubmit}>
        <Title>마이페이지</Title>
        <ImageInput imageRef={imageRef} src={image} setImage={setImage} />
        <TextInput ref={nameRef} placeholder="닉네임" />
        <Button type="submit" $width="100%">
          회원정보 수정
        </Button>
      </StyledForm>
    </Wrapper>
  );
}

export default MyPage;
