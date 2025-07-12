import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  padding: 24px;
`;

const Box = styled.div`
  background: #eee;
  padding: 16px;
  border-radius: 8px;
  margin-bottom: 36px;
  display: flex;
  alignItems: center;
  justify-content: space-between;
`;

const InBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 100%;
  div {
    font-size: 16px;
    color: #333;
  }
`;

const ImageBox = styled.div`
  background-color: #fff;
  width: 120px;
  aspect-ratio: 1 / 1;
  border-radius: 8px;
  flex-shrink: 0;
  margin-left: 24px;
`;

const RadioGroup = styled.div`
  margin: 16px 0;
  display: flex;
  flex-direction: column;
  margin-bottom: 36px;
  gap: 8px;
`;

const CheckboxGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 12px;
`;

const PayButton = styled.button`
  width: 100%;
  margin-top: 32px;
  padding: 16px;
  font-size: 16px;
  border-radius: 30px;
  background-color: #ddd;
  border: none;
`;

function OrderConfirmPage() {
  const navigate = useNavigate();
  const [payment, setPayment] = useState('card');
  const [agreed, setAgreed] = useState([false, false, false, false]);

  const allAgreed = agreed.every(a => a);

  const toggleAgreement = (index) => {
    const next = [...agreed];
    next[index] = !next[index];
    setAgreed(next);
  };

  return (
    <Container>
      <Box>
        <InBox>
            <div>상품 정보</div>
            <div>대여 물품 명</div>
            <div>대여 스테이션 명</div>
            <div>대여 시간</div>
            <div style={{ marginLeft: 'auto' }}>결제 예정 금액</div>
        </InBox>
        <ImageBox />
      </Box>

      <h3>결제 수단</h3>
      <RadioGroup>
        <label><input type="radio" name="payment" checked={payment === 'card'} onChange={() => setPayment('card')} /> 카드</label>
        <label><input type="radio" name="payment" checked={payment === 'simple'} onChange={() => setPayment('simple')} /> 간편 결제</label>
      </RadioGroup>

      <CheckboxGroup>
        {[0, 1, 2, 3].map(i => (
          <label key={i}>
            <input type="checkbox" checked={agreed[i]} onChange={() => toggleAgreement(i)} /> 주문 내용 동의
          </label>
        ))}
      </CheckboxGroup>

      <PayButton
        onClick={() => {
          if (!allAgreed) {
            alert('모든 약관에 동의해주세요.');
            return;
          }
          navigate('/rental-complete');
        }}
      >
        결제하기
      </PayButton>
    </Container>
  );
}

export default OrderConfirmPage;
