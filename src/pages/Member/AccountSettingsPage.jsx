import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from '../../api/axiosInstance';
import HeaderGradient from '../../components/header/HeaderGradient';
import kakao from '../../assets/with-kakao.svg';
import google from '../../assets/with-google.svg'
import defaultImg from '/images/default-profile.svg';

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
  margin: 23px 0 13px 0;
  border-radius: 50%;
`;

const ProfileName = styled.div`
  margin-left: 25px;
  font-size: 24px;
  font-family: 'NanumSquareRoundOTFEB';
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-end;
  gap: 4px;
  span {
    color: var(--main-color-ver2);
  }
  button {
    border: none;
    background-color: #fff;
    font-size: 12px;
    font-family: 'NanumSquareRoundOTFR';
    color: var(--side-color-3);
    text-decoration: underline;
    padding-bottom: 2px;
    cursor: pointer;
  }
`;

const AccountInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 100px;
  gap: 13px;
  font-size: 16px;
  font-family: 'NanumSquareRoundOTFEB';
  p {
    padding-left: 15px;
  }
  img {
    width: 290px;
    margin: 0 auto;
  }
`;

const DeleteButton = styled.button`
  color: #F13E1F;
  text-decoration: underline;
  background-color: #fff;
  border: none;
  display: block;
  width: 100%;
  margin-top: 28px;
  font-size: 14px;
  font-family: 'NanumSquareRoundOTFER';  
  cursor: pointer;
`;

function AccountSettingsPage() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: '',
    nickname: '',
    profileImage: '',
    provider: '',
  });
  const [providerImg, setProviderImg] = useState('');

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await api.get('/api/v1/users/me');
        const { email, nickname, profileImage, provider } = response.data?.data || {};
        
        if (email) {
          setUser({ email, nickname, profileImage, provider });
          if (provider === 'KAKAO') {
            setProviderImg(kakao);
          } else if (provider === 'GOOGLE') {
            setProviderImg(google);
          }
        }
      } catch (error) {
        console.error('사용자 정보 가져오기 실패:', error);
      }
    };

    fetchUserInfo();
  }, []);
  
  const handleDeleteAccount = async () => {
    try {
        const response = await api.get(`/api/v1/users/me/withdraw`);
        if (response.data.data.available) {
          navigate('/account-delete-survey');
        } else {
          alert('미반납 대여내역이 존재합니다.');
          navigate('/history');
        }
      } catch (error) {
        console.error('탈퇴 가능 여부 조회 중 오류 발생', error);
      }
  }

  return (
    <>
    <HeaderGradient title="내 정보" backPath='/mypage'/>
    <Container>
      <Header>
        <ProfileImage src={user.profileImage || defaultImg}/>
        <ProfileName>
          <span>{user.nickname}</span>
          <button onClick={() => navigate('/account-settings/edit')}>수정</button>
        </ProfileName>
      </Header>

      <AccountInfo>
        <p>본인인증</p>
        <span style={{borderTop: '1px solid var(--side-color-3)', padding: '13px 0 12px 0'}}><p>계정연동</p></span>
        <img src={providerImg}/>
      </AccountInfo>

       <DeleteButton onClick={handleDeleteAccount}>회원탈퇴하기</DeleteButton>
    </Container>
    </>
  );
}

export default AccountSettingsPage;
