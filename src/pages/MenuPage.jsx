import styled from "styled-components";
import logo from "../assets/billit.png";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 0 16px;
  height: 60px;
`;

const Logo = styled.img`
  height: 30px;
`;

const ListMenu = styled.ul`
  list-style: none;
  padding: 30px 0 0 16px;
`;

const BottomMenu = styled(ListMenu)`
  margin-top: auto;
  padding-bottom: 50px;
`;

const ListItem = styled.li`
  display: flex;
  align-items: center;
  padding: 9px 0;
  font-size: 17px;
`;

function MenuPage() {
  const navigate = useNavigate();
  
  return (
    <Container>
      <LogoWrapper>
        <Logo src={logo} alt="logo" onClick={() => navigate('/')} />
      </LogoWrapper>

      <ListMenu>
        <ListItem onClick={() => navigate('/mypage')}>마이페이지</ListItem>
        <ListItem onClick={() => navigate('/station-map')}>주변 스테이션</ListItem>
        <ListItem onClick={() => navigate('/rental-items')}>대여 물품</ListItem>
        <ListItem onClick={() => navigate('/qr-scan')}>QR 스캔</ListItem>
        <ListItem onClick={() => navigate('/rental-or-return')}>(디버깅) 대여/반납 선택</ListItem>
      </ListMenu>

      <BottomMenu>
        <ListItem onClick={() => navigate('/notices')}>공지사항</ListItem>
        <ListItem onClick={() => navigate('/inquiry')}>1:1 문의</ListItem>
      </BottomMenu>
    </Container>
  );
}

export default MenuPage;
