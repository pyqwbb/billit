import { useEffect, useState } from 'react';
import api from '../../api/axiosInstance';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../../components/header/HeaderStation';
import PlusIcon from '../../assets/icon/plus.png';
import MinusIcon from '../../assets/icon/minus.png';

const Container = styled.div`
  padding: 24px;
`;

const ImageBox = styled.div`
  background-color: var(--side-color-3);
  width: 330px;
  aspect-ratio: 1 / 1;
  border-radius: 30px;
  margin-bottom: 9px;
`;

const InfoRow = styled.div`
  display: flex;
  flex-direction: column;
  margin: 16px;
  font-size: 16px;
  gap: 12px;
`;

const NameInfo = styled.p`
  font-family: 'NanumSquareRoundOTFEB';
  font-size: 24px;
`;

const PriceInfo = styled.p`
  font-family: 'NanumSquareRoundOTFR';
  font-size: 20px;
  display: flex;
  flex-direction: row;
  justify-content: right;
  p {
    font-family: 'NanumSquareRoundOTFB';
  }
  span {
    color: var(--main-color)
  }
`;

const TimeControl = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 32px;
  font-size: 32px;
  margin: 18px 0 42px 0;
  padding-top: 27px;
  border-radius: 0px;
  border-top: 1px solid var(--side-color-4);
  p {
    font-family: 'NanumSquareRoundOTFR';
    margin-left: -30px;
  }
  span {
    font-family: 'NanumSquareRoundOTFB';
    color: var(--main-color);
  }
`;

const Button = styled.button`
  font-size: 33px;
  width: 40px;
  height: 40px;
  border: none;
  cursor: pointer;
  background-color: white;
`;

const PayInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px;
  p {
    font-family: 'NanumSquareRoundOTFB';
    font-size: 20px;
  }
  span {
    font-family: 'NanumSquareRoundOTFB';
    font-size: 24px;
    display: flex;
    flex-direction: row;
    p {
      font-family: 'NanumSquareRoundOTFB';
      font-size: 24px;
      color: var(--main-color);
    }
  }
`;

const RentButton = styled.button`
  width: 100%;
  margin-top: 20px;
  padding: 16px;
  font-family: 'NanumSquareRoundOTFB';
  font-size: 16px;
  border-radius: 30px;
  background-color: var(--main-color);
  border: none;
`;

function RentalTimePage() {
  const [hours, setHours] = useState(1);
  const navigate = useNavigate();
  const [scannedData, setScannedData] = useState(null);
  const [estimatedPrice, setEstimatedPrice] = useState(1);

  const amountToBePaid = hours * estimatedPrice;
  
  useEffect(() => {
    const qrCode = localStorage.getItem('scannedQrCode'); 

    if (!qrCode) {
      console.error('QR 코드 데이터 없음');
      return;
    }

    const fetchItem = async () => {
      try {
        const response = await api.get(`/api/v1/rentals/products/${qrCode}`);
        setScannedData(response.data.data);
        setEstimatedPrice(response.data.data.pricePerHour);
      } catch (error) {
        console.error('Error fetching item:', error);
      }
    }
    fetchItem();
  }, []);

  return (
    <>
    <Header stname = '건국대학교 제1학생회관' />
    <Container>
      <div style={{display: 'flex', justifyContent: 'center'}}>
        <ImageBox src={scannedData?.image}/>
      </div>
      <InfoRow>
        <NameInfo>{scannedData?.name}</NameInfo>
        <PriceInfo><p><span>{scannedData?.pricePerHour.toLocaleString()}원</span></p>/시간</PriceInfo>
      </InfoRow>

      <TimeControl>
        <Button onClick={() => setHours(prev => Math.max(1, prev - 1))}><img src={MinusIcon}/></Button>
        <span>{hours}</span>
        <p>시간</p>
        <Button onClick={() => setHours(prev => prev + 1)}><img src={PlusIcon}/></Button>
      </TimeControl>

      <PayInfo>
        <p>결제 예정 금액</p>
        <span><p>{amountToBePaid.toLocaleString()}</p>원</span>
      </PayInfo>
      
      <RentButton onClick={() => navigate('/order-confirm')}>대여시작</RentButton>
    </Container>
    </>
  );
}

export default RentalTimePage;
