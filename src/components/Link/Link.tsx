import { Link as DefaultLink } from "react-router-dom";
import styled from "styled-components";

const Link = styled(DefaultLink)`
  color: #42b4aa;
  font-size: 0.8rem;
  &:hover {
    color: #2c938a;
  }
`;

export default Link;
