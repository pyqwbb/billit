import { useParams } from 'react-router-dom';
import rentalData from '../../data/mock/history.json';
import styled from 'styled-components';

const Container = styled.div`
  padding: 35px;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 16px;
`;

const ImageBox = styled.div`
  background-color: #e5e5e5;
  width: 100%;
  aspect-ratio: 1 / 1;
  border-radius: 8px;
  margin-bottom: 24px;
`;

const Red = styled.span`
  color: red;
`;

const Bold = styled.span`
  font-weight: bold;
`;

const Button = styled.button`
  width: 100%;
  padding: 12px;
  background-color: #ddd;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  margin-top: 15px;
`;

function ReturnPage() {
  const { id } = useParams();
  const rental = rentalData.find(r => r.id.toString() === id);

  if (!rental) return <Container>존재하지 않는 내역입니다.</Container>;

  return (
    <Container>
      <ImageBox />
      <Info>
        <div>물품명: {rental.itemName}</div>
        <div>반납 스테이션: {rental.returnStation}</div>
        <div>이용 시간: {rental.rentalTimeHour}</div>
        {rental.status === '연체' && (
          <>
            <Red>연체 시간: {rental.overdueTime}</Red><br />
            <Bold>결제 예정 금액: {rental.expectedPayment.toLocaleString()}원</Bold>
          </>
        )}
      </Info>
      <Button>
        {rental.status === '연체' ? '연체 금액 결제' : '반납하기'}
      </Button>
    </Container>
  );
}

export default ReturnPage;
