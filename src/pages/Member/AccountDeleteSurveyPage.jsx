import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import HeaderGradient from '../../components/header/HeaderGradient';
import CustomReasonGroup from '../../components/common/CustomReasonGroup';
import api from '../../api/axiosInstance';

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
  padding: 20px 0;
`;

const Button = styled.button`
  width: 100%;
  max-width: 360px;
  padding: 12px 0;
  margin-top: 180px;
  background-color: #F13E1F;
  color: white;
  border: none;
  border-radius: 30px;
  cursor: pointer;
  font-size: 19px;
  font-family: 'NanumSquareRoundOTFB';
  box-sizing: border-box;
  transition: background-color 0.3s ease;

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const OtherReasonInput = styled.textarea`
  margin-top: 15px;
  width: 100%;
  max-width: 360px;
  height: 80px;
  padding: 10px;
  font-family: 'NanumSquareRoundOTFR';
  font-size: 14px;
  resize: none;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: ${props => (props.disabled ? '#f5f5f5' : 'white')};
`;

function AccountDeleteSurveyPage() {
  const navigate = useNavigate();
  const [selectedReasons, setSelectedReasons] = useState([]);
  const [otherReason, setOtherReason] = useState('');
  const isOtherSelected = selectedReasons.includes('OTHER');

  const isButtonDisabled =
    selectedReasons.length === 0 || (isOtherSelected && otherReason.trim() === '');
  
  const handleDeleteAccount = async () => {
    try {
        const reasonsToSend = selectedReasons.filter(r => r !== 'OTHER');
        if (isOtherSelected) {
          reasonsToSend.push(otherReason); // 기타 사유를 문자열로 추가
        }

        const response = await api.post(`/api/v1/users/me/withdraw`, {
          reasons: reasonsToSend,
        });

        if (response.data.status === 200) {
          navigate('/complete-delete-account');
        }
      } catch (error) {
        console.error('회원탈퇴 중 오류 발생', error);
      }
  }

  return (
    <>
      <HeaderGradient title="회원탈퇴"/>
      <Container>
        <InfoText>
          <h2>회원탈퇴</h2>
          <p>회원을 탈퇴하시는 이유가 무엇인가요?</p>
        </InfoText>
        <CustomReasonGroup
          selected={selectedReasons}
          setSelected={setSelectedReasons}
        />
        <OtherReasonInput
          placeholder="기타 사유를 입력해주세요."
          value={otherReason}
          onChange={(e) => setOtherReason(e.target.value)}
          disabled={!isOtherSelected}
        />
        <ButtonWrapper>
          <Button disabled={isButtonDisabled} onClick={handleDeleteAccount}>
            탈퇴하기
          </Button>
        </ButtonWrapper>
      </Container>
    </>
  );
}

export default AccountDeleteSurveyPage;
