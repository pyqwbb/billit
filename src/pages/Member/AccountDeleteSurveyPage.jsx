import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import HeaderGradient from '../../components/header/HeaderGradient';
import CustomRadioGroup from '../../components/common/CustomRadioGroup';

const Container = styled.div`
  padding: 24px;
  h2 {
    font-size: 24px;
    font-family: 'NanumSquareRoundOTFEB';
  }
  p {
    font-size: 16px;
    font-family: 'NanumSquareRoundOTFR';
  }
`;

const InfoText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  margin-bottom: 31px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 0 60px; /* 버튼 위아래 여백 */
`;

const Button = styled.button`
  width: 100%;
  max-width: 360px;
  padding: 12px 0;
  margin-top: 240px;
  background-color: #F13E1F;
  color: white;
  border: none;
  border-radius: 30px;
  cursor: pointer;
  font-size: 19px;
  font-family: 'NanumSquareRoundOTFB';
  box-sizing: border-box;
`;

function AccountDeleteSurveyPage() {
  const navigate = useNavigate();
  const [selectedReason, setSelectedReason] = useState('');
  
  return (
    <>
    <HeaderGradient title="회원탈퇴"/>
    <Container>
      <InfoText>
        <h2>회원탈퇴</h2>
        <p>회원을 탈퇴하시는 이유가 무엇인가요?</p>
      </InfoText>
      <CustomRadioGroup
            selected={selectedReason}
            setSelected={setSelectedReason}
       />
      <ButtonWrapper>
        <Button onClick={() => navigate('/complete-delete-account')}>탈퇴하기</Button>  
      </ButtonWrapper>
    </Container>
    </>
  );
}

export default AccountDeleteSurveyPage;
