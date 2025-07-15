import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../../components/header/HeaderSub';
import { FaCheck } from 'react-icons/fa';

const Container = styled.div`
  padding: 24px;
`;

const Box = styled.div`
  padding: 21px 0 0 0;
  border-radius: 8px;
  display: flex;
  alignItems: center;
  justify-content: space-between;
`;

const InBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 100%;
  margin: 5px 10px;
  span {
    font-size: 16px;
    font-family: NanumSquareRoundOTFB;
  }
  p {
    font-size: 14px;
    font-family: NanumSquareRoundOTFR;
  }
`;

const ImageBox = styled.img`
  background-color: var(--side-color-3);
  width: 130px;
  aspect-ratio: 1 / 1;
  border-radius: 15px;
  flex-shrink: 0;
`;

const ExpectedAmount = styled.div`
  font-family: NanumSquareRoundOTFB;
  font-size:20px;
  border-bottom: 1px solid var(--side-color-4);
  padding: 6px 0 25px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const PaymentOption = styled.button`
  margin: 0 -24px;
  height: 54px;
  border: none;
  background-color: ${({ selected }) => (selected ? 'var(--main-color)' : 'var(--side-color-1)')};
  font-family: 'NanumSquareRoundOTFB';
  font-size: 19px;
  cursor: pointer;
  transition: background-color 0.2s;
  padding: 0 40px;
  text-align: left;
`;

const PaymentOptionsWrapper = styled.div`
  margin: 22px 0;
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const CheckboxContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 30px;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 9px;
  font-size: 16px;
  font-family: 'NanumSquareRoundOTFR';
  cursor: pointer;
`;

const CheckboxBox = styled.span`
  width: 18px;
  height: 18px;
  border: 2.3px solid #555;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ checked }) => (checked ? '#85FF6A' : 'transparent')};
  color: ${({ checked }) => (checked ? '#000' : '#555')};
`;

const PayButton = styled.button`
  width: 100%;
  margin-top: 32px;
  padding: 16px;
  font-family: 'NanumSquareRoundOTFB';
  font-size: 19px;
  border-radius: 30px;
  border: none;
  background-color: ${({ disabled }) => (disabled ? 'var(--side-color-1)' : 'var(--main-color)')};
  color: ${({ disabled }) => (disabled ? '#999' : '#000')};
  cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
  transition: background-color 0.2s;
`;


function OrderConfirmPage() {
  const navigate = useNavigate();
  const [payment, setPayment] = useState('card');
  const [agreed, setAgreed] = useState([false, false]);

  const allAgreed = agreed.every(a => a);

  const mockItem = {
    id: 1,
    name: 'C타입 충전 케이블',
    stName: '건국대학교 제1학생회관',
    rentalTime: 3,
    rentalPrice: 3000,
  };

  const toggleAgreement = (index) => {
    const next = [...agreed];
    next[index] = !next[index];
    setAgreed(next);
  };

  return (
    <>
      <Header />
      <Container>
        <p style={{ fontFamily: 'NanumSquareRoundOTFB', fontSize: '19px' }}>대여 정보</p>
        <Box>
          <ImageBox />
          <InBox>
            <span>{mockItem.name}</span>
            <p>{mockItem.stName}</p>
          </InBox>
        </Box>
        <p style={{ textAlign: 'right', fontFamily: 'NanumSquareRoundOTFB', fontSize: '16px' }}>
          <span style={{ color: 'var(--main-color)' }}>{mockItem.rentalTime}</span>시간
        </p>
        <ExpectedAmount>
          <p>결제예정금액</p>
          <div style={{ fontFamily: 'NanumSquareRoundOTFB', fontSize: '24px' }}>
            <span style={{ color: 'var(--main-color)' }}>{mockItem.rentalPrice.toLocaleString()}</span>원
          </div>
        </ExpectedAmount>

        <p style={{ fontFamily: 'NanumSquareRoundOTFEB', fontSize: '24px', marginTop: '23px' }}>결제수단</p>
        <PaymentOptionsWrapper>
          <PaymentOption selected={payment === 'card'} onClick={() => setPayment('card')}>카드</PaymentOption>
          <PaymentOption selected={payment === 'account'} onClick={() => setPayment('account')}>실시간 계좌이체</PaymentOption>
          <PaymentOption selected={payment === 'simple'} onClick={() => setPayment('simple')}>간편결제</PaymentOption>
        </PaymentOptionsWrapper>

        <CheckboxContainer>
          {[
            '주문 내용 동의',
            '주문 내용 동의',
          ].map((text, i) => (
            <CheckboxLabel key={i}>
              <input
                type="checkbox"
                checked={agreed[i]}
                onChange={() => toggleAgreement(i)}
                style={{ display: 'none' }}
              />
              <CheckboxBox checked={agreed[i]}>
                <FaCheck size={10} />
              </CheckboxBox>
              {text}
            </CheckboxLabel>
          ))}
        </CheckboxContainer>

        <PayButton
          disabled={!allAgreed}
          onClick={() => { navigate('/rental-complete');
          }}
        >
          결제하기
        </PayButton>
      </Container>
    </>
  );
}

export default OrderConfirmPage;
