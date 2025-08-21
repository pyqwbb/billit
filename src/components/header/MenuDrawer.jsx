import { useState } from 'react';
import ReactDOM from 'react-dom';
import { useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import logo from "../../assets/billit.png";

const slideIn = keyframes`
  from { transform: translateX(-100%); }
  to { transform: translateX(0); }
`;

const slideOut = keyframes`
  from { transform: translateX(0); }
  to { transform: translateX(-100%); }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0,0,0,0.3);
  z-index: 1000;
`;

const Drawer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 45vw;
  max-width: 300px;
  height: 100%;
  background: white;
  display: flex;
  flex-direction: column;
  z-index: 1001;
  animation: ${({ $closing }) => ($closing ? slideOut : slideIn)} 0.3s ease-out forwards;
`;

const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 0 16px;
  height: 60px;
`;

const Logo = styled.img`
  height: 30px;
  cursor: pointer;
  margin: 15px 0 0 0;
`;

const ListMenu = styled.ul`
  list-style: none;
  padding: 30px 0 0 16px;
  font-size: 16px;
  font-family: 'NanumSquareRoundOTFR';
`;

const BottomMenu = styled(ListMenu)`
  margin-top: auto;
`;

const ListItem = styled.li`
  padding: 9px 0;
  cursor: pointer;

  &:hover {
    opacity: 0.6;
  }
`;

const StyledFooter = styled.footer`
  display: flex;
  flex-direction: column;
  padding: 20px;
  width: 100%;
  margin-top: 10px;

  p {
    font-size: 10px;
    font-family: 'NanumSquareRoundOTFR';
    color: #918E8E;
    line-height: 13px;
  }
`;

function MenuDrawer({ onClose }) {
  const navigate = useNavigate();
  const [closing, setClosing] = useState(false);

  const handleNavigate = (path) => {
    setClosing(true);
    setTimeout(() => {
      navigate(path);
      onClose();
    }, 300);
  };

  const handleNotReady = () => {
    alert('서비스 준비 중입니다.');
  };

  const handleOverlayClick = () => {
    setClosing(true);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  const drawerContent = (
    <Overlay onClick={handleOverlayClick}>
      <Drawer onClick={(e) => e.stopPropagation()} $closing={closing}>
        <LogoWrapper>
          <Logo src={logo} alt="logo" onClick={() => handleNavigate('/')} />
        </LogoWrapper>

        <ListMenu>
          <ListItem onClick={() => handleNavigate('/mypage')}>마이페이지</ListItem>
          <ListItem onClick={() => handleNavigate('/station-map')}>주변 스테이션</ListItem>
          <ListItem onClick={() => handleNavigate('/rental-items')}>대여 물품</ListItem>
          <ListItem onClick={() => handleNavigate('/qr-scan/station')}>QR 스캔</ListItem>
        </ListMenu>

        <BottomMenu>
          <ListItem onClick={() => handleNavigate('/notices')}>공지사항</ListItem>
          <ListItem onClick={() => handleNavigate('/faq')}>자주 묻는 질문</ListItem>
          <ListItem onClick={handleNotReady}>1:1 문의</ListItem>
        </BottomMenu>

        <StyledFooter>
          <p>© 2025 billit. All rights reserved.</p>
          <p>Powered by Prienz.</p>
        </StyledFooter>
      </Drawer>
    </Overlay>
  );

  return ReactDOM.createPortal(drawerContent, document.body);
}

export default MenuDrawer;
