import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/billit.png';
import { HiMenu, HiUser } from "react-icons/hi";

const StyledHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  padding: 0 16px;
  background-color: #fff;
`;

const IconButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  display: flex;
  align-items: center;

  &:hover {
    opacity: 0.7;
  }
`;

const Logo = styled.img`
  height: 30px;
`;

function Header() {
  const navigate = useNavigate();

  return (
    <StyledHeader>
      <IconButton onClick={() => navigate('/menu')}>
        <HiMenu />
      </IconButton>
      <Logo src={logo} alt="logo" onClick={() => navigate('/')}/>
      <IconButton onClick={() => navigate('/mypage')}>
        <HiUser />
      </IconButton>
    </StyledHeader>
  );
}

export default Header;