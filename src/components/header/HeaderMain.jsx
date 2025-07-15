import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import logo from '../../assets/billit.png';
import MenuDrawer from './MenuDrawer';
import { HiMenu, HiUser } from "react-icons/hi";

const StyledHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  padding: 0 16px;
  background-color: #fff;
  position: relative;
  z-index: 10;
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

function HeaderMain() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <StyledHeader>
        <IconButton onClick={() => setIsMenuOpen(true)}>
          <HiMenu />
        </IconButton>
        <Logo src={logo} alt="logo" onClick={() => navigate('/')} />
        <IconButton onClick={() => navigate('/mypage')}>
          <HiUser />
        </IconButton>
      </StyledHeader>

      {isMenuOpen && <MenuDrawer onClose={() => setIsMenuOpen(false)} />}
    </>
  );
}

export default HeaderMain;
