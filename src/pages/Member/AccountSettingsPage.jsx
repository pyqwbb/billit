import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import profileImg from '../../assets/billit-profile.png';
import HeaderGradient from '../../components/header/HeaderGradient';
import kakao from '../../assets/with-kakao.png';

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

const ProfileAddr = styled.p`
  margin: 2px 0 30px 0;
  font-size: 16px;
  font-family: 'NanumSquareRoundOTFEB';
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
`;

function AccountSettingsPage() {
  const navigate = useNavigate();

  const name = '우주';
  const town = '화양동';

  return (
    <>
    <HeaderGradient title="내 정보"/>
    <Container>
      <Header>
        <ProfileImage src={profileImg}/>
        <ProfileName>
          <span>{name}</span>
          <button onClick={() => navigate('/account-settings/edit')}>수정</button>
        </ProfileName>
        <ProfileAddr>{town}</ProfileAddr>
      </Header>

      <AccountInfo>
        <p>본인인증</p>
        <span style={{borderTop: '1px solid var(--side-color-3)', padding: '13px 0 12px 0'}}><p>계정연동</p></span>
        <img src={kakao}/>
      </AccountInfo>

       <DeleteButton onClick={() => navigate('/account-delete-survey')}>회원탈퇴하기</DeleteButton>
    </Container>
    </>
  );
}

export default AccountSettingsPage;
