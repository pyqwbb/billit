import {useEffect, useState} from 'react';
import {useLocation} from 'react-router-dom';
import styled from 'styled-components';
import Header from '../../components/header/HeaderSub';
import {FaCheck} from 'react-icons/fa';
import api from '../../api/axiosInstance';
import {loadTossPayments} from "@tosspayments/payment-sdk";

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
  font-size: 20px;
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
  align-items: flex-start;
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
  background-color: ${({checked}) => (checked ? '#85FF6A' : 'transparent')};
  color: ${({checked}) => (checked ? '#000' : '#555')};
`;

const PayButton = styled.button`
  width: 100%;
  margin-top: 32px;
  padding: 16px;
  font-family: 'NanumSquareRoundOTFB';
  font-size: 19px;
  border-radius: 30px;
  border: none;
  background-color: ${({disabled}) => (disabled ? 'var(--side-color-1)'
      : 'var(--main-color)')};
  color: ${({disabled}) => (disabled ? '#999' : '#000')};
  cursor: ${({disabled}) => (disabled ? 'default' : 'pointer')};
  transition: background-color 0.2s;
`;

function OrderPackagePage() {
  const [agreed, setAgreed] = useState(false);
  const [itemData, setItemData] = useState(null);
  const location = useLocation();
  const [serialNumber, setSerialNumber] = useState('');
  const allAgreed = agreed;

  useEffect(() => {
    const packageSerial = sessionStorage.getItem('selectedPackage');
    setSerialNumber(packageSerial);

    const fetchItem = async () => {
      try {
        const response = await api.get(`/api/v1/rentals/products/packages`);
        setItemData(response.data.data);
      } catch (error) {
        console.error('Error fetching item:', error);
      }
    }

    fetchItem();
  }, []);

  const toggleAgreement = () => {
    setAgreed(!agreed);
  };

  const handlePayment = async () => {
    try {
      console.log("accessToken:", localStorage.getItem('accessToken'));
      console.log("serialNumber:", serialNumber);
      const res = await api.post('/api/v1/payments/prepare/rental', {
        serialNumber,
        rentalTime: 4,
        amount: 2000,
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
          currency: paymentData.currency,
          successUrl: `${window.location.origin}/rental-complete`,
          failUrl: `${window.location.origin}/payment-failed`,
        });
      }
    } catch (error) {
      console.error("결제 실패:", error.response?.status, error.response?.data);
    }
  };

  return (
      <>
        <Header/>
        <Container>
          <p style={{fontFamily: 'NanumSquareRoundOTFB', fontSize: '19px'}}>
            대여 정보
          </p>
          <Box>
            <ImageBox src={itemData?.image} alt={itemData?.image}/>
            <InBox>
              <span>{itemData?.name}</span>
              <p>{serialNumber}</p>
            </InBox>
          </Box>

          <p style={{
            textAlign: 'right',
            fontFamily: 'NanumSquareRoundOTFB',
            fontSize: '16px'
          }}>
            <span style={{color: 'var(--main-color)'}}>
              4
            </span>
            시간
          </p>

          <ExpectedAmount>
            <p>결제예정금액</p>
            <div style={{fontFamily: 'NanumSquareRoundOTFB', fontSize: '24px'}}>
            <span style={{color: 'var(--main-color)'}}>
              {((itemData?.pricePerHour)*4).toLocaleString() || 0}
            </span>원
            </div>
          </ExpectedAmount>

          <CheckboxContainer>
            <CheckboxLabel>
              <input
                  type="checkbox"
                  checked={agreed}
                  onChange={toggleAgreement}
                  style={{display: 'none'}}
              />
              <CheckboxBox checked={agreed}>
                <FaCheck size={12}/>
              </CheckboxBox>
              <span style={{fontSize: '14px', lineHeight: '20px'}}>
                결제 내용을 확인하였으며, <br/>
                <a
                    href="/docs/terms.html"
                    style={{
                      color: 'var(--main-color-ver2)',
                      textDecoration: 'underline'
                    }}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                  이용약관
                </a>
                ,
                <a
                    href="/docs/privacy.html"
                    style={{
                      color: 'var(--main-color-ver2)',
                      textDecoration: 'underline'
                    }}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                  개인정보처리방침
                </a>
                {' '}및 결제에 동의합니다.
              </span>
            </CheckboxLabel>
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

export default OrderPackagePage;