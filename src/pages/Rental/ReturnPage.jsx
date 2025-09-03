import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import HeaderGradient from '../../components/header/HeaderGradient';
import api from '../../api/axiosInstance';
import { loadTossPayments } from "@tosspayments/payment-sdk";

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

function ReturnPage() {
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  const serialNumber = sessionStorage.getItem('scannedQrCode'); 
  const stationId = sessionStorage.getItem('scannedQrNumber');

  useEffect(() => {
    const fetchReturnInfo = async () => {
      try {
        const res = await api.get(`/api/v1/returns/products/${serialNumber}`,
          { params: { returnStationId: stationId } }
        );
        const data = res.data.data;
        setItem(data);
        sessionStorage.setItem('returnInfoKey', data.returnInfoKey);
      } catch (error) {
        console.error('반납 정보 불러오기 실패:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchReturnInfo();
  }, []);

  if (loading) return <div>불러오는 중...</div>;
  if (!item) return <div>데이터를 불러올 수 없습니다.</div>;

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
          successUrl: `${window.location.origin}/return-complete?overdue=true`,
          failUrl: `${window.location.origin}/payment-failed`,
        });
      }
    } catch (error) {
      console.error("결제 실패:", error);
    }
  };

  const handleReturn = async () => {
    try {
      navigate('/return-complete');
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
          </InBox>
        </Box>
        <ReturnInfo>
          <ReturnInfoDetail>
            <span>대여 스테이션</span>
            <p>{item.rentalStationName}</p>
          </ReturnInfoDetail>
          <ReturnInfoDetail>
            <span>반납 스테이션</span>
            <p>{item.returnStationName}</p>
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

export default ReturnPage;
