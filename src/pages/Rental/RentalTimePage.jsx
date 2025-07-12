import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  padding: 24px;
`;

const ImageBox = styled.div`
  background-color: #e5e5e5;
  width: 330px;
  aspect-ratio: 1 / 1;
  border-radius: 8px;
  margin-bottom: 24px;
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
  font-size: 16px;
`;

const TimeControl = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 32px;
  font-size: 24px;
  margin: 8px 0 26px 0;
`;

const Button = styled.button`
  font-size: 20px;
  width: 40px;
  height: 40px;
  border: 1px solid #aaa;
  border-radius: 50%;
  background-color: white;
  cursor: pointer;
`;

const RentButton = styled.button`
  width: 100%;
  margin-top: 24px;
  padding: 16px;
  font-size: 16px;
  border-radius: 30px;
  background-color: #ddd;
  border: none;
`;

function RentalTimePage() {
  const [hours, setHours] = useState(1);
  const navigate = useNavigate();

  const mockItem = {
    id: 1,
    name: 'C타입 충전 케이블',
    pricePerHour: 1000,
  };

  const estimatedPrice = hours * mockItem.pricePerHour;

  return (
    <Container>
      <div style={{display: 'flex', justifyContent: 'center'}}>
        <ImageBox />
      </div>
      <InfoRow>
        <p>{mockItem.name}</p>
        <p>{mockItem.pricePerHour.toLocaleString()}원</p>
      </InfoRow>

      <div style={{textAlign:'left'}}><strong>대여시간</strong></div>
      <TimeControl>
        <Button onClick={() => setHours(prev => Math.max(1, prev - 1))}>-</Button>
        <span>{hours} 시간</span>
        <Button onClick={() => setHours(prev => prev + 1)}>+</Button>
      </TimeControl>
      
      <div style={{textAlign:'right'}}><strong>결제 예정 금액:</strong> {estimatedPrice.toLocaleString()}원</div>
      <RentButton onClick={() => navigate('/order-confirm')}>대여하기</RentButton>
    </Container>
  );
}

export default RentalTimePage;
