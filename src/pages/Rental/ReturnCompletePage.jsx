import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../../components/header/HeaderSub';
import CompleteIcon from '../../assets/icon/complete.png';
import api from '../../api/axiosInstance';

const Container = styled.div`
  padding: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MainText = styled.p`
  font-size: 24px;
  font-family: 'NanumSquareRoundOTFEB';
  margin-top: 21px;
  margin-bottom: 9px;
`;

const SubText = styled.p`
  font-size: 16px;
  font-family: 'NanumSquareRoundOTFR';
`;

const Icon = styled.img`
  margin-top: 100px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 80px 0 40px;
  width: 100%;
`;

const Button = styled.button`
  width: 100%;
  max-width: 360px;
  padding: 12px 0;
  margin-top: 80px;
  background-color: var(--main-color);
  border: none;
  border-radius: 30px;
  cursor: pointer;
  font-size: 19px;
  font-family: 'NanumSquareRoundOTFB';
  box-sizing: border-box;
`;

function ReturnCompletePage() {
  const navigate = useNavigate();
  const serialNumber = sessionStorage.getItem('scannedQrCode');
  const returnInfoKey = sessionStorage.getItem('returnInfoKey');

  useEffect(() => {
    const handleComplete = async () => {
      try {
        const searchParams = new URLSearchParams(window.location.search);
        const isOverdue = searchParams.get('overdue') === 'true';

        if (isOverdue) {
          await confirmPayment(searchParams);
        } else {
          await completeReturn();
        }
      } catch (err) {
        console.error('반납 실패:', err);
        navigate('/rental-fail');
      }
    };

    handleComplete();
  }, []);

  const confirmPayment = async (searchParams) => {
    try {
      const paymentKey = searchParams.get('paymentKey');
      const orderId = searchParams.get('orderId');
      const amount = Number(searchParams.get('amount'));

      const paymentType = sessionStorage.getItem('paymentType') || 'RENT';
      const sessionInfoKey = sessionStorage.getItem('sessionInfoKey');

      if (!paymentKey || !orderId || !amount || !sessionInfoKey) {
        console.error('필수 결제 데이터 없음');
        navigate('/rental-fail');
        return;
      }

      const res = await api.post('/api/v1/payments/confirm', {
        paymentKey,
        orderId,
        amount,
        paymentType,
        sessionInfoKey,
      });

      console.log('결제 승인 성공', res.data);
    } catch (error) {
      console.error('결제 승인 실패', error);
      navigate('/rental-fail');
    }
  };

  const completeReturn = async () => {
      try {
        await api.post(`/api/v1/returns/products/${serialNumber}`, {
          returnInfoKey,
        });
        console.log("반납 성공");
        sessionStorage.removeItem('scannedQrCode');
        sessionStorage.removeItem('scannedQrNumber');
      } catch (err) {
        console.error("반납 실패:", err);
      }
    };

  return (
    <>
      <Header/>
      <Container>
        <Icon src={CompleteIcon} />
        <MainText>반납 완료</MainText>
        <SubText>필요할 땐 언제든, 다시 찾아주세요!</SubText>
        <ButtonWrapper>
          <Button onClick={() => navigate('/')}>홈으로</Button>
        </ButtonWrapper>
      </Container>

    </>
  );
}

export default ReturnCompletePage;
