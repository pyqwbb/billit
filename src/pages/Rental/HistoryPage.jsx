import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import rentalData from '../../data/mock/history.json';

const Container = styled.div`
  padding: 24px;
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  background-color: #f7f7f7;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 16px;

  strong {
    margin-bottom: 8px;
  }
`;

const Status = styled.span`
  font-size: 12px;
  color: white;
  background-color: ${({ status }) =>
    status === '대여중' ? '#22c55e' :
    status === '반납' ? '#999' : '#ef4444'};
  padding: 2px 8px;
  border-radius: 8px;
  margin-left: 8px;
`;

const ReturnButton = styled.button`
  margin-top: 12px;
  padding: 8px 16px;
  background-color: #ddd;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  width: 100%;

  &:hover {
    background-color: #ccc;
  }
`;

function HistoryPage() {
  const navigate = useNavigate();

  const handleCardClick = (id) => {
    navigate(`/history/${id}`);
  };

  const handleReturnClick = (id) => {
    navigate(`/return/${id}`);
  };

  return (
    <Container>
      {rentalData.map((rental) => (
        <Card key={rental.id} onClick={() => handleCardClick(rental.id)}>
          <div style={{ display: 'flex',justifyContent: 'space-between', alignItems: 'center' }}>
            <strong>{rental.itemName}</strong>
            <Status status={rental.status}>{rental.status}</Status>
          </div>
          <div>{rental.stationName}</div>
          <div>시작 시간: {rental.startTime}</div>
          <div>결제 금액: {rental.price.toLocaleString()}원</div>
          {rental.status !== '반납' && (
            <>
              <div>잔여 시간/대여 시간</div>
              <ReturnButton onClick={(e) => {
                e.stopPropagation();
                handleReturnClick(rental.id);
              }}>
                반납하기
              </ReturnButton>
            </>
          )}
        </Card>
      ))}
    </Container>
  );
}

export default HistoryPage;
