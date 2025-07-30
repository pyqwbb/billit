import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from '../../api/axiosInstance';
import HeaderGradient from '../../components/header/HeaderGradient';
import couponIcon from '../../assets/icon/coupon.png';
import historyIcon from '../../assets/icon/history.png';
import membershipIcon from '../../assets/icon/membership.png';
import pointIcon from '../../assets/icon/point.png';

const Container = styled.div`
  padding: 16px;
`;

const Header = styled.div`
  text-align: center;
  position: relative;
`;

const ProfileImage = styled.img`
  width: 146px;
  height: 146px;
  margin: 30px 0 13px 0;
  border-radius: 50%;
`;

const ProfileName = styled.div`
  font-size: 24px;
  font-family: 'NanumSquareRoundOTFEB';
  span {
    color: var(--main-color);
  }
`;

const WelcomeText = styled.p`
  margin: 2px 0 30px 0;
  font-size: 14px;
  font-family: 'NanumSquareRoundOTFR';
`;

const GridButtons = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  margin: 25px 0;
  justify-content: center;
`;

const GridButton = styled.button`
  margin: auto;
  width: 170px;
  height: 72px;
  border-radius: 15px;
  border: none;
  background-color: #EEF2FA;
  font-size: 14px;
  font-family: 'NanumSquareRoundOTFB';
  cursor: pointer;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 23px;
  padding-right: 20px;
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
  padding: 13px 0;
  font-size: 16px;
  font-family: 'NanumSquareRoundOTFR';
`;

const LogoutButton = styled.button`
  width: 30%;
  padding: 12px;
  color: var(--side-color-3);
  font-family: 'NanumSquareRoundOTFR';
  border: none;
  background: none;
  font-size: 14px;
  display: block;
  margin: 0 auto;
  text-decoration: underline;
`;

function MyPage() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: '',
    nickname: '',
    profileImage: '',
  });

  const handleNotReady = () => {
    alert('서비스 준비 중입니다.');
  };

  useEffect(() => {
  const fetchUserInfo = async () => {
    try {
      const response = await api.get('/api/v1/users/me');
      const { email, nickname, profileImage } = response.data.data;
      setUser({ email, nickname, profileImage });
    } catch (error) {
      console.error('사용자 정보 가져오기 실패:', error);
    }
  };

  fetchUserInfo();
}, []);

  return (
    <>
    <HeaderGradient title="마이페이지"/>
    <Container>
      <Header>
        <ProfileImage src={user.profileImage}/>
        <ProfileName><span>{user.nickname}</span>님</ProfileName>
        <WelcomeText>오늘도 빌릿과 함께 스마트하게!</WelcomeText>
      </Header>

      <GridButtons>
        <GridButton onClick={() => navigate('/history')}>
          <img src={historyIcon}/>이용내역
        </GridButton>
        <GridButton onClick={handleNotReady}>
          <img src={membershipIcon}/>멤버십
        </GridButton>
        <GridButton onClick={handleNotReady}>
          <img src={pointIcon}/>포인트
        </GridButton>
        <GridButton onClick={handleNotReady}>
          <img src={couponIcon}/>쿠폰
        </GridButton>
      </GridButtons>

      <ListMenu>
        <ListItem onClick={() => navigate('/account-settings')}>
          내 정보
        </ListItem>
        <ListItem onClick={() => navigate('/faq')}>
          자주 묻는 질문
        </ListItem>
        <ListItem onClick={() => navigate('/inquiry')}>
          1:1 문의
        </ListItem>
        <ListItem onClick={() => navigate('/notices')}>
          공지사항
        </ListItem>
        <ListItem onClick={() => navigate('/events')}>
          이벤트
        </ListItem>
        <ListItem onClick={() => navigate('/service-info')}>
          서비스 정보
        </ListItem>
      </ListMenu>

      <LogoutButton>로그아웃</LogoutButton>
    </Container>
    </>
  );
}

export default MyPage;
