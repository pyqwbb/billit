import styled from 'styled-components';
import { useEffect, useState } from 'react';
import api from '../../api/axiosInstance';
import { useNavigate } from 'react-router-dom';
import HeaderGradient from '../../components/header/HeaderGradient';

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
  input {
    font-size: 24px;
    border: none;
    border-bottom: 1px solid #ccc;
    outline: none;
    width: 120px;
    text-align: center;
    color: var(--main-color-ver2);
    font-family: 'NanumSquareRoundOTFEB';
    background-color: transparent;
  }
  button {
    border: none;
    background-color: var(--side-color-1);
    font-size: 12px;
    font-family: 'NanumSquareRoundOTFR';
    color: var(--side-color-3);
    padding: 8px;
    cursor: pointer;
    border: 1px solid var(--side-color-3);
    border-radius: 10px;
    width: 65px;
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
  button {
    font-family: 'NanumSquareRoundOTFEB';
    width: 290px;
    margin: 0 auto;
    background-color: var(--main-color);
    border-radius: 30px;
    border: none;
    height: 52px;
    font-size: 18px;
    text-align: center;
    line-height: 52px;
  }
`;

function EditAccountPage() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: '',
    nickname: '',
    profileImage: '',
  });
  const [isDuplicateChecked, setIsDuplicateChecked] = useState(false);

  const handleSave = async () => {
    if (!isDuplicateChecked) {
      alert('닉네임 중복확인을 해주세요.');
      return;
    }

    try {
      await api.patch('/api/v1/users/profile', {
        newProfileImage: null,
        newNickname: user.nickname,
      });
      alert('수정 완료!');
      navigate('/account-settings');
    } catch (error) {
      console.error('프로필 수정 실패:', error);
      alert('프로필 수정에 실패했습니다. 다시 시도해주세요.');
    }
  };

  const handleDuplicateCheck = async () => {
    try {
      const response = await api.get(`/api/v1/users/nicknames/${user.nickname}/availability`);
      if (response.status === 200) {
        alert('사용 가능한 닉네임입니다.');
        setIsDuplicateChecked(true);
      }
    } catch (error) {
      alert('이미 사용 중인 닉네임입니다.');
      setIsDuplicateChecked(false);
    }
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
      <HeaderGradient title="내 정보 수정" />
      <Container>
        <Header>
          <ProfileImage src={user.profileImage}/>
          <ProfileName>
            <div style={{width:'65px'}}/>
            <input 
              value={user.nickname} 
              onChange={(e) => {
                setUser((prev) => ({ ...prev, nickname: e.target.value }));
                setIsDuplicateChecked(false); 
              }} 
            />
            <button onClick={() => handleDuplicateCheck()}>중복확인</button>
          </ProfileName>
        </Header>

        <AccountInfo>
            <p>본인인증</p>
            <span style={{borderTop: '1px solid var(--side-color-3)', padding: '13px 0 12px 0'}}><p>계정연동</p></span>
            <button onClick={() => handleSave()}>수정 완료</button>
        </AccountInfo>
      </Container>
    </>
  );
}

export default EditAccountPage;
