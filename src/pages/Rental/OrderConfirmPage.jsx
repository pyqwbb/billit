import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../../components/header/HeaderSub';
import { FaCheck } from 'react-icons/fa';
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

const ExpectedAmount = styled.div`
  font-family: NanumSquareRoundOTFB;
  font-size:20px;
  padding: 6px 0 40px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
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
  const [agreed, setAgreed] = useState([false, false]);

  const location = useLocation();
  const [scannedData, setScannedData] = useState(null);
  const [calculatedPrice, setCalculatedPrice] = useState(null);

  const hours = location.state?.hours || 1;
  const allAgreed = agreed.every(a => a);

  const serialNumber = sessionStorage.getItem('scannedQrCode'); 

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await api.get(`/api/v1/rentals/products/${serialNumber}`);
        setScannedData(response.data.data);

        try {
          const calcRes = await api.get(`/api/v1/payments/calculate`, {
            params: {
              serialNumber: serialNumber,
              rentalTime: hours
            }
          });
          setCalculatedPrice(calcRes.data.data.amount);
        } catch (err) {
          console.error('Error calculating payment:', err);
        }

      } catch (error) {
        console.error('Error fetching item:', error);
      }
    }

    fetchItem();
  }, [hours]);

  const toggleAgreement = (index) => {
    const next = [...agreed];
    next[index] = !next[index];
    setAgreed(next);
  };

  const handlePayment = async () => {
    try {
      const res = await api.post('/api/v1/payments/prepare/rental', {
        serialNumber,
        rentalTime: hours,
        amount: calculatedPrice,
        method: 'CARD'
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
          successUrl: `${window.location.origin}/rental-complete`,
          failUrl: `${window.location.origin}/payment-failed`,
        });
      }
    } catch (error) {
      console.error("결제 실패:", error);
    }
  };

  return (
    <>
      <Header />
      <Container>
        <p style={{ fontFamily: 'NanumSquareRoundOTFB', fontSize: '19px' }}>대여 정보</p>
        <Box>
          <ImageBox src={scannedData?.image} alt={scannedData?.image}/>
          <InBox>
            <span>{scannedData?.name}</span>
            <p>{scannedData?.currentStationName}</p>
          </InBox>
        </Box>
        <p style={{ textAlign: 'right', fontFamily: 'NanumSquareRoundOTFB', fontSize: '16px' }}>
          <span style={{ color: 'var(--main-color)' }}>{hours}</span>시간
        </p>
        <ExpectedAmount>
          <p>결제예정금액</p>
          <div style={{ fontFamily: 'NanumSquareRoundOTFB', fontSize: '24px' }}>
            <span style={{ color: 'var(--main-color)' }}>
              {calculatedPrice?.toLocaleString() || 0}
            </span>원
          </div>
        </ExpectedAmount>

        <CheckboxContainer>
          {['주문 내용 동의', '주문 내용 동의'].map((text, i) => (
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
          onClick={handlePayment}
        >
          결제하기
        </PayButton>
      </Container>
    </>
  );
}

export default OrderConfirmPage;
