import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../../components/header/HeaderSub';
import CompleteIcon from '../../assets/icon/complete.svg';

const Container = styled.div`
  padding: 24px;
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

const Icon = styled.img`
  margin-top: 100px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 80px 0 40px;
  width: 100%;
`;

const Button = styled.button`
  width: 100%;
  max-width: 360px;
  padding: 12px 0;
  margin-top: 80px;
  background-color: var(--main-color);
  border: none;
  border-radius: 30px;
  cursor: pointer;
  font-size: 19px;
  font-family: 'NanumSquareRoundOTFB';
  box-sizing: border-box;
`;

function CompleteDeleteAccountPage() {
  const navigate = useNavigate();

  return (
    <>
      <Header/>
      <Container>
        <Icon src={CompleteIcon} />
        <MainText>탈퇴 완료</MainText>
        <SubText>필요할 땐 언제든, 다시 찾아주세요!</SubText>
        <ButtonWrapper>
          <Button onClick={() => navigate('/')}>홈으로</Button>
        </ButtonWrapper>
      </Container>

    </>
  );
}

export default CompleteDeleteAccountPage;
