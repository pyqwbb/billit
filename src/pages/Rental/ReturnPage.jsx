import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import HeaderGradient from '../../components/header/HeaderGradient';

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

const ReturnInfo = styled.div`
  font-size: 14px;
  display: flex;
  flex-direction: column;
  margin: 20px 0;
`;

const ReturnInfoDetail = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 22px;
  span {
    font-family: NanumSquareRoundOTFB;
  }
  p {
    font-family: NanumSquareRoundOTFR;
  }
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

const PayButton = styled.button`
  width: 100%;
  margin-top: 20px;
  padding: 16px;
  font-family: 'NanumSquareRoundOTFB';
  font-size: 19px;
  border-radius: 30px;
  border: none;
  background-color: var(--main-color);
  color: #000;
  cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
  transition: background-color 0.2s;
`;

function ReturnPage() {
  const navigate = useNavigate();
  const [payment, setPayment] = useState('card');

  const mockItem = {
    id: 1,
    status: '대여',
    name: 'C타입 충전 케이블',
    stName: '건국대학교 제1학생회관',
    rentalTime: 3,
    rentalPrice: 3000,
  };

  return (
    <>
      <HeaderGradient title="반납"/>
      <Container>
        <p style={{ fontFamily: 'NanumSquareRoundOTFB', fontSize: '19px' }}>대여 정보</p>
        <Box>
          <ImageBox />
          <InBox>
            <span>{mockItem.name}</span>
          </InBox>
        </Box>
        <ReturnInfo>
          <ReturnInfoDetail>
            <span>대여 스테이션</span>
            <p>{mockItem.stName}</p>
          </ReturnInfoDetail>
          <ReturnInfoDetail>
            <span>반납 스테이션</span>
            <p>{mockItem.stName}</p>
          </ReturnInfoDetail>
          <ReturnInfoDetail>
            <span>총 이용시간</span>
            <p>{mockItem.rentalTime}시간</p>
          </ReturnInfoDetail>
          <ReturnInfoDetail>
            <span style={{color: '#F13E1F'}}>연체시간</span>
            <p style={{color: '#F13E1F'}}>{mockItem.rentalTime}시간</p>
          </ReturnInfoDetail>
        </ReturnInfo>

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

        <PayButton onClick={() => { navigate('/return-complete');}}>
          {mockItem.status === '연체' ? '연체 금액 결제' : '반납하기'}
        </PayButton>
      </Container>
    </>
  );
}

export default ReturnPage;
