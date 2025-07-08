import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { HiOutlineCog, HiOutlineUserCircle, HiOutlineQuestionMarkCircle, HiOutlineChatAlt, HiOutlineBell, HiOutlineSparkles } from "react-icons/hi";

const Container = styled.div`
  padding: 16px;
`;

const Header = styled.div`
  text-align: center;
  position: relative;
`;

const CogButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  font-size: 24px;
  background: none;
  border: none;
  cursor: pointer;
`;

const ProfileImage = styled.div`
  width: 80px;
  height: 80px;
  background: #ddd;
  border-radius: 50%;
  margin: 0 auto;
`;

const WelcomeText = styled.p`
  margin: 30px 0;
  font-size: 16px;
`;

const GridButtons = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  margin: 25px 0;
`;

const GridButton = styled.button`
  padding: 12px;
  margin: auto;
  width: 100%;
  border-radius: 12px;
  background-color: #f5f5f5;
  font-size: 15px;
  cursor: pointer;
  border: solid 1px #ccc;
`;

const ListMenu = styled.ul`
  list-style: none;
  padding: 0;
  margin-bottom: 20px;
  margin-left: 10px;
`;

const ListItem = styled.li`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 0;
  font-size: 15px;
`;

const LogoutButton = styled.button`
  width: 30%;
  padding: 12px;
  background-color: #ff5b5b;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  display: block;
  margin: 0 auto;
  bottom: 16px;
  left: 16px;
  right: 16px;
`;

function MyPage() {
  const navigate = useNavigate();

  const handleNotReady = () => {
    alert('서비스 준비 중입니다.');
  };

  return (
    <Container>
      <Header>
        <CogButton onClick={() => navigate('/service-info')}>
          <HiOutlineCog />
        </CogButton>
        <ProfileImage />
        <WelcomeText>환영합니다, 홍길동님!</WelcomeText>
      </Header>

      <GridButtons>
        <GridButton onClick={() => navigate('/history')}>이용내역</GridButton>
        <GridButton onClick={handleNotReady}>멤버십</GridButton>
        <GridButton onClick={handleNotReady}>포인트</GridButton>
        <GridButton onClick={handleNotReady}>쿠폰</GridButton>
      </GridButtons>

      <ListMenu>
        <ListItem onClick={() => navigate('/account-settings')}>
          <HiOutlineUserCircle /> 계정 설정
        </ListItem>
        <ListItem onClick={() => navigate('/faq')}>
          <HiOutlineQuestionMarkCircle /> 자주 묻는 질문
        </ListItem>
        <ListItem onClick={() => navigate('/inquiry')}>
          <HiOutlineChatAlt /> 1:1 문의
        </ListItem>
        <ListItem onClick={() => navigate('/notices')}>
          <HiOutlineBell /> 공지사항
        </ListItem>
        <ListItem onClick={() => navigate('/events')}>
          <HiOutlineSparkles /> 이벤트
        </ListItem>
      </ListMenu>

      <LogoutButton>로그아웃</LogoutButton>
    </Container>
  );
}

export default MyPage;
