import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import api from '../../api/axiosInstance';
import styled from 'styled-components';
import Header from '../../components/header/HeaderSub';
import CompleteIcon from '../../assets/icon/complete.png';

const Container = styled.div`
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

const RentalBox = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    border-top: 1px solid var(--side-color-4);
    border-radius: 0px;
    margin-top: 60px;
    padding-top: 30px;
`;

const InBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
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

const Button = styled.button`
  left: 0;
  right: 0;
  width: 360px;
  margin: 38px auto;
  padding: 12px;
  background-color: var(--main-color);
  border: none;
  border-radius: 30px;
  cursor: pointer;
  font-size: 19px;
  font-family: 'NanumSquareRoundOTFB';
`;

const formatDate = (date) => {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  const h = String(date.getHours()).padStart(2, '0');
  const min = String(date.getMinutes()).padStart(2, '0');
  return `${y}.${m}.${d} ${h}:${min}`;
};

function RentalCompletePage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [rentalInfo, setRentalInfo] = useState(null);

  useEffect(() => {
    const confirmPayment = async () => {
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

        // 결제 승인 API 호출
        const res = await api.post('/api/v1/payments/confirm', {
          paymentKey,
          orderId,
          amount,
          paymentType,
          sessionInfoKey,
        });

        if (res.status === 200) {
          const data = res.data.data;

          // 반납시간 계산
          const rentalStart = new Date(data.rentalStartTime);
          const rentalEnd = new Date(rentalStart.getTime() + data.rentalTime * 60 * 60 * 1000);

          setRentalInfo({
            productName: data.productName,
            rentalStationName: data.rentalStationName,
            rentalTime: data.rentalTime,
            rentalStart: formatDate(rentalStart),
            rentalEnd: formatDate(rentalEnd),
            totalAmount: data.totalAmount,
          });
        }
      } catch (err) {
        console.error('결제 승인 실패:', err);
        navigate('/rental-fail');
      }
    };

    confirmPayment();
  }, [navigate, searchParams]);

  if (!rentalInfo) {
    return <p style={{ textAlign: 'center', marginTop: '100px' }}>결제 승인 중...</p>;
  }

  return (
    <>
      <Header/>
      <Container>
        <img src={CompleteIcon} style={{marginTop: '90px'}}/>
        <MainText>대여 완료!</MainText>
        <SubText>필요할 땐 언제든, 빌릿하세요!</SubText>
        <RentalBox>
          <ImageBox />
          <InBox>
            <span>{rentalInfo.productName}</span>
            <p>{rentalInfo.rentalStationName}</p>
            <p>
              <span style={{ color: 'var(--main-color)' }}>{rentalInfo.rentalTime}</span>시간
            </p>
            <p>대여시작 | {rentalInfo.rentalStart}</p>
            <p>반납시간 | {rentalInfo.rentalEnd}</p>
            <p>총 결제금액 | {rentalInfo.totalAmount.toLocaleString()}원</p>
          </InBox>
        </RentalBox>
        <Button onClick={() => navigate('/')}>홈으로</Button>
      </Container> 
    </>
  );
}

export default RentalCompletePage;
