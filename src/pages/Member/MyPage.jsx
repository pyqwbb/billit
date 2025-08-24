import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from '../../api/axiosInstance';
import HeaderGradient from '../../components/header/HeaderGradient';
import Modal, { ConfirmButton, CancelButton } from '../../utils/Modal';
import couponIcon from '../../assets/icon/coupon.svg';
import historyIcon from '../../assets/icon/history.svg';
import membershipIcon from '../../assets/icon/membership.svg';
import pointIcon from '../../assets/icon/point.svg';

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
  gap: 10px;
  p {
    width: 60px;
  }
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

const LogoutButton = styled.div`
  width: 30%;
  padding: 12px;
  color: var(--side-color-3);
  font-family: 'NanumSquareRoundOTFR';
  border: none;
  background: none;
  font-size: 14px;
  display: flex;
  justify-content: center;
  margin: 0 auto;
  text-decoration: underline;
  cursor: pointer;
`;

function MyPage() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: '',
    nickname: '',
    profileImage: '',
  });
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);  // for Modal

  const handleNotReady = () => {
    alert('서비스 준비 중입니다.');
  };

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      navigate('/login');
      return;
    }

    const fetchUserInfo = async () => {
      try {
        const response = await api.get('/api/v1/users/me');
        const { email, nickname, profileImage } = response.data.data;
        setUser({ email, nickname, profileImage });
      } catch (error) {
        console.error('사용자 정보 가져오기 실패:', error);
        navigate('/login');
      } finally {
        setLoading(false);
      }
    };
    fetchUserInfo();
  }, []);

  if (loading) {
    return null;
  }

  const onClickLogout = async () =>{
    await api.post('/api/v1/auth/logout')
    .then(()=>{
      localStorage.removeItem('provider');
      localStorage.removeItem('accessToken');
      navigate('/');
    })
  }

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
          <img src={historyIcon}/><p>이용내역</p>
        </GridButton>
        <GridButton onClick={handleNotReady}>
          <img src={membershipIcon}/><p>멤버십</p>
        </GridButton>
        <GridButton onClick={handleNotReady}>
          <img src={pointIcon}/><p>포인트</p>
        </GridButton>
        <GridButton onClick={handleNotReady}>
          <img src={couponIcon}/><p>쿠폰</p>
        </GridButton>
      </GridButtons>

      <ListMenu>
        <ListItem onClick={() => navigate('/account-settings')}>
          내 정보
        </ListItem>
        <ListItem onClick={() => navigate('/faq')}>
          자주 묻는 질문
        </ListItem>
        <ListItem onClick={handleNotReady}>
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

      <LogoutButton onClick={() => setIsOpen(true)}>로그아웃</LogoutButton>
      {isOpen && (
        <Modal
          title="로그아웃 확인"
          onClose={() => setIsOpen(false)}
          buttons={[
            <ConfirmButton key="confirm" onClick={onClickLogout}>확인</ConfirmButton>,
            <CancelButton key="cancel" onClick={() => setIsOpen(false)}>취소</CancelButton>
          ]}
        >
          <p>정말 로그아웃하시겠습니까?</p>
        </Modal>
      )}
    </Container>
    </>
  );
}

export default MyPage;
