import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import logo from '../../assets/billit.svg';
import MenuDrawer from './MenuDrawer';
import { HiMenu, HiUser } from "react-icons/hi";
import Modal, {CancelButton, ConfirmButton} from '../../utils/Modal';

const StyledHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  padding: 0 16px;
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
  const [isModalOpen, setIsModalOpen] = useState(false);

  const hasAccessToken = () => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      localStorage.setItem("redirectPath", window.location.pathname);
      setIsModalOpen(true);
      return false;
    }
    return true;
  };

  const handleMyPageClick = () => {
    if (!hasAccessToken()) return;
    navigate('/mypage');
  };

  return (
    <>
      <StyledHeader>
        <IconButton onClick={() => setIsMenuOpen(true)}>
          <HiMenu />
        </IconButton>
        <Logo src={logo} alt="logo" onClick={() => navigate('/')} />
        <IconButton onClick={handleMyPageClick}>
          <HiUser />
        </IconButton>
      </StyledHeader>

      {isMenuOpen && <MenuDrawer onClose={() => setIsMenuOpen(false)} />}
      
      {isModalOpen && (
       <Modal
          title="로그인 페이지 이동"
          onClose={() => setIsModalOpen(false)}
          buttons={[
          <ConfirmButton key="confirm"
            onClick={() => navigate('/login')}>이동</ConfirmButton>,
            <CancelButton key="cancel" onClick={() => setIsModalOpen(false)}>
              취소
            </CancelButton>
          ]}
        >
          <p>로그인이 필요한 기능입니다.</p>
        </Modal>
      )}
    </>
  );
}

export default HeaderMain;
