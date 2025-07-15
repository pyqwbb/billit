import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../../components/header/HeaderSub';
import CompleteIcon from '../../assets/icon/complete.png';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const MainText = styled.p`
  font-size: 24px;
  font-family: 'NanumSquareRoundOTFEB';
  margin-top: 21px;
  margin-bottom: 9px;
`;

const SubText = styled.p`
  font-size: 16px;
  font-family: 'NanumSquareRoundOTFR';
`;

const Button = styled.button`
  position: fixed;
  bottom: 36px;
  left: 0;
  right: 0;
  width: 360px;
  margin: 0 auto;
  padding: 12px;
  background-color: var(--main-color);
  border: none;
  border-radius: 30px;
  cursor: pointer;
  font-size: 19px;
  font-family: 'NanumSquareRoundOTFB';
`;

function CompleteDeleteAccountPage() {
  const navigate = useNavigate();

  return (
    <>
      <Header/>
      <Container>
        <img src={CompleteIcon} style={{marginTop: '140px'}}/>
        <MainText>탈퇴 완료</MainText>
        <SubText>필요할 땐 언제든, 다시 찾아주세요!</SubText>
        <Button onClick={() => navigate('/')}>홈으로</Button>
      </Container> 
    </>
  );
}

export default CompleteDeleteAccountPage;
