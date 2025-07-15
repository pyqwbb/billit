import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import HeaderGradient from '../../components/header/HeaderGradient';
import CustomRadioGroup from '../../components/common/CustomRadioGroup';

const Container = styled.div`
  padding: 24px;
  max-width: 480px;
  margin: 0 auto;

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

const Button = styled.button`
  position: fixed;
  bottom: 36px;
  left: 0;
  right: 0;
  width: 360px;
  margin: 0 auto;
  padding: 12px;
  background-color: #F13E1F;
  color: white;
  border: none;
  border-radius: 30px;
  cursor: pointer;
  font-size: 19px;
  font-family: 'NanumSquareRoundOTFB';
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
      <Button onClick={() => navigate('/complete-delete-account')}>탈퇴하기</Button>
    </Container>
    </>
  );
}

export default AccountDeleteSurveyPage;
