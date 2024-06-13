import { useId } from "react";
import styled from "styled-components";
import defaultUserImg from "../../assets/image/user.png";

const Wrapper = styled.div`
  width: 7rem;
  height: 7rem;
  position: relative;
  border-radius: 50%;
  overflow: hidden;

  &:hover > label > img {
    filter: brightness(80%);
  }
  &:hover > button {
    opacity: ${({ $image }) => $image && 1};
  }
`;

const Styledlabel = styled.label``;

const PreviewImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  transition: 0.5s;
  cursor: pointer;
`;

const HiddenInput = styled.input`
  display: none;
`;

const DeleteButton = styled.button`
  opacity: 0;
  position: absolute;
  background-color: black;
  color: white;
  width: 100%;
  padding: 5px;
  left: 0;
  bottom: 0;
  z-index: 1;
  transition: 0.5s;
`;

const ImageInput = ({ imageRef, src: image, setImage }) => {
  const id = useId();

  const handleImageChanged = () => {
    const file = imageRef.current.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImage(() => reader.result);
    };
  };

  const handleDeleteClicked = () => {
    setImage("");
  };

  return (
    <Wrapper $image={image}>
      <Styledlabel htmlFor={id}>
        <PreviewImage src={image || defaultUserImg} alt="이미지 입력" />
      </Styledlabel>
      <DeleteButton type="button" onClick={handleDeleteClicked}>
        삭제
      </DeleteButton>
      <HiddenInput
        id={id}
        ref={imageRef}
        type="file"
        accept="image/*"
        onChange={handleImageChanged}
      />
    </Wrapper>
  );
};

export default ImageInput;
