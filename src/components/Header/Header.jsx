import { Link } from "react-router-dom";
import styled from "styled-components";
import homeImg from "../../assets/image/home.png";
import defaultUserImg from "../../assets/image/user.png";
import useLoginStore from "../../state/zustand/login.store";
import LogoutButton from "./LogoutButton";

const Wrapper = styled.header`
  position: fixed;
  width: 100%;
  padding: 1rem;
  box-sizing: border-box;
`;

const HeaderItems = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const RightItems = styled.ul`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const HeaderImage = styled.img`
  width: 1.7rem;
  height: 1.7rem;
`;

const ProfileImage = styled(HeaderImage)`
  border-radius: 50%;
  object-fit: cover;
`;

const MyPageLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.3rem;
`;

function Header() {
  const loginUser = useLoginStore((state) => state.loginUser);
  return (
    <Wrapper>
      <HeaderItems>
        <Link to="/">
          <HeaderImage src={homeImg} />
        </Link>
        <RightItems>
          <li>
            <MyPageLink to="/mypage">
              <ProfileImage
                src={loginUser?.avatar || defaultUserImg}
                alt="프로필 이미지"
              />
              <span>{loginUser?.nickname}</span>
            </MyPageLink>
          </li>
          <li>
            <LogoutButton />
          </li>
        </RightItems>
      </HeaderItems>
    </Wrapper>
  );
}

export default Header;
