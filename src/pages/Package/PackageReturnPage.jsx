import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import HeaderGradient from '../../components/header/HeaderGradient';
import api from '../../api/axiosInstance';
import { loadTossPayments } from "@tosspayments/payment-sdk";
import ClipLoader from "react-spinners/ClipLoader";

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

const FailContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;
  font-family: 'NanumSquareRoundOTFB';
`;

const Message = styled.p`
  font-size: 18px;
  margin-bottom: 24px;
`;

const HomeButton = styled.button`
  width: 50%;
  padding: 12px 24px;
  font-size: 16px;
  font-family: 'NanumSquareRoundOTFB';
  border-radius: 8px;
  border: none;
  background-color: var(--side-color-2);
  color: #000;
  cursor: pointer;
  &:hover {
    background-color: var(--side-color-3);
  }
`;

function PackageReturnPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { returnSerialNum } = location.state || {};

  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  const selectedPackage = sessionStorage.getItem('selectedPackage'); 

  useEffect(() => {
    const fetchReturnInfo = async () => {
      try {
        const res = await api.get(`/api/v1/returns/products/${selectedPackage}`,
          { params: { returnStationId : 1 } }
        );
        const data = res.data.data;
        setItem(data);
        console.log('Return info response:', data);
        sessionStorage.setItem('returnInfoKey', data.returnInfoKey);
      } catch (error) {
        console.error('반납 정보 불러오기 실패:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchReturnInfo();
  }, []);

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '230px 0' }}>
        <ClipLoader size={50} color='var(--main-color)' />
        <p style={{ marginTop: '5px' }}>
          불러오는 중...
        </p>
      </div>
    );
  }
  
  if (!item) {
    return (
      <FailContainer>
        <Message>대여 정보를 불러올 수 없습니다.</Message>
        <HomeButton onClick={() => navigate('/')}>
          홈으로
        </HomeButton>
      </FailContainer>
    );
  }

  const handleOverduePayment = async () => {
    try {
      const res = await api.post('/api/v1/payments/prepare/overdue', {
        method: 'OVERDUE',
        returnInfoKey: item.returnInfoKey,
      });

      if (res.status === 200) {
        const paymentData = res.data.data;
        
        sessionStorage.setItem('sessionInfoKey', paymentData.sessionInfoKey);
        sessionStorage.setItem('paymentType', paymentData.type);

        const tossPayments = await loadTossPayments(paymentData.clientApiKey);
        await tossPayments.requestPayment(paymentData.method, {
          amount: paymentData.amount,
          orderId: paymentData.orderId,
          orderName: paymentData.orderName,
          customerEmail: paymentData.customerEmail,
          customerKey: paymentData.customerKey,
          successUrl: `${window.location.origin}/package-return-complete?overdue=true`,
          failUrl: `${window.location.origin}/payment-failed`,
        });
      }
    } catch (error) {
      console.error("결제 실패:", error);
    }
  };

  const handleReturn = async () => {
    try {
      navigate('/package-return-complete');
    } catch (error) {
      console.error("반납 실패:", error);
    }
  };

  return (
    <>
      <HeaderGradient title="반납" backPath='/history'/>
      <Container>
        <p style={{ fontFamily: 'NanumSquareRoundOTFB', fontSize: '19px' }}>대여 정보</p>
        <Box>
          <ImageBox src={item.image} alt={item.image}/>
          <InBox>
            <span>{item.name}</span>
            <p>{returnSerialNum}</p>
          </InBox>
        </Box>
        <ReturnInfo>
          <ReturnInfoDetail>
            <span>대여 스테이션</span>
            <p>건국대학교 상허기념도서관</p>
          </ReturnInfoDetail>
          <ReturnInfoDetail>
            <span>반납 스테이션</span>
            <p>건국대학교 상허기념도서관</p>
          </ReturnInfoDetail>
          <ReturnInfoDetail>
            <span>총 이용시간</span>
            <p>{item.minutesOfUse}분</p>
          </ReturnInfoDetail>

          {item.overdueMinutes || item.overdueAmount ? (
          <>
          <ReturnInfoDetail>
            <span style={{color: '#F13E1F'}}>연체시간</span>
            <p style={{ color: '#F13E1F' }}>
              {item.overdueMinutes ? `${item.overdueMinutes}분` : ''}
            </p>
          </ReturnInfoDetail>
          </>
          ) : null}
        </ReturnInfo>

        {item.overdueAmount ? (
        <>
        <ExpectedAmount>
          <p>결제예정금액</p>
          <div style={{ fontFamily: 'NanumSquareRoundOTFB', fontSize: '24px' }}>
            <span style={{ color: 'var(--main-color)' }}>
                {item.overdueAmount ? item.overdueAmount.toLocaleString() : 0}
              </span>원
          </div>
        </ExpectedAmount>
        </>
        ) : null}

        <PayButton
          onClick={item.status === '연체' ? handleOverduePayment : handleReturn}
        >
          {item.status === '연체' ? '연체 금액 결제' : '반납하기'}
        </PayButton>
      </Container>
    </>
  );
}

export default PackageReturnPage;