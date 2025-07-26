import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import profileImg from '../../assets/billit-profile.png';
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
    background-color: #fff;
    font-size: 12px;
    font-family: 'NanumSquareRoundOTFR';
    color: var(--side-color-3);
    text-decoration: underline;
    padding-bottom: 2px;
    cursor: pointer;
  }
`;

const ProfileAddr = styled.p`
  margin: 2px 0 30px 0;
  font-size: 16px;
  font-family: 'NanumSquareRoundOTFEB';
  input {
    font-size: 16px;
    border: none;
    border-bottom: 1px solid #ccc;
    outline: none;
    width: 100px;
    text-align: center;
    font-family: 'NanumSquareRoundOTFEB';
    background-color: transparent;
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

  const [name, setName] = useState('우주');
  const [town, setTown] = useState('화양동');

  const handleSave = () => {
    // 저장 처리
    alert('수정 완료!');
    navigate('/account-settings');
  };

  return (
    <>
      <HeaderGradient title="내 정보 수정" />
      <Container>
        <Header>
          <ProfileImage src={profileImg}/>
          <ProfileName>
            <input value={name} onChange={(e) => setName(e.target.value)} />
          </ProfileName>
          <ProfileAddr>
            <input value={town} onChange={(e) => setTown(e.target.value)} />
          </ProfileAddr>
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
