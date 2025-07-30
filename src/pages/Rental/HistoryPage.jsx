import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from '../../api/axiosInstance';
import styled from 'styled-components';
import HeaderGradient from '../../components/header/HeaderGradient';

const Container = styled.div`
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

const CardWrapper = styled.div`
  border-radius: 30px;
  background-color: var(--side-color-2);
  &:hover {
    background-color: #ccc;
  }
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  border-radius: 30px;
  padding: 25px;
  background-color: ${({ status }) =>
    status === '대여중' ? '#85FF6A' : 'var(--side-color-2)'};
  p {
    font-size: 19px;
    font-family: 'NanumSquareRoundOTFEB';
  }
`;

const Status = styled.span`
  font-size: 16px;
  font-family: 'NanumSquareRoundOTFEB';
  color: white;
  padding: 2px 8px;
  border-radius: 8px;
  margin-left: 8px;
  color: ${({ status }) =>
    status === '대여중' ? 'black' : 'var(--side-color-4)'};
`;

const CardInfo = styled.div`
  margin-top: 40px;
  p {
    font-size: 14px;
    font-family: 'NanumSquareRoundOTFR';
  }
  div {
    height: 20px;
  }
`;

const RentalTime = styled.div`
  display: flex;
  flex-direction: column;
  text-align: right;
  font-size: 19px;
  font-family: 'NanumSquareRoundOTFB';
  margin-top: 10px;
  position: relative;
`;

const BottomBar = styled.div`
  height: 9px;
  background-color: white;
  border-radius: 12px;
  width: 100%;
  margin-top: 24px;
`;

const ReturnButton = styled.div`
  padding: 20px;
  border: none;
  border-radius: 0 0 30px 30px ;
  cursor: pointer;
  width: 100%;
  font-size: 19px;
  font-family: 'NanumSquareRoundOTFB';
  text-align: center;
`;

function HistoryPage() {
  const navigate = useNavigate();
  const [rentalHistory, setRentalHistory] = useState([]);

  const handleCardClick = (id) => {
    navigate(`/history/${id}`);
  };

  const handleReturnClick = (id) => {
    navigate(`/return/${id}`);
  };

  useEffect(() => {
    const fetchRentalHistory = async () => {
      try {
        const response = await api.get('/api/v1/users/me/rentals');
        const rentals = response.data.data.rentals.content;
        setRentalHistory(rentals);
      } catch (error) {
        console.error('Failed to fetch rental history:', error);
      }
    };
    fetchRentalHistory();
  }, []);

  return (
    <>
    <HeaderGradient title="이용내역"/>
    <Container>
        {rentalHistory.map((rental) => (
          <CardWrapper key={rental.rentalHistoryToken}>
            <Card
              status={rental.status}
              onClick={() => handleCardClick(rental.rentalHistoryToken)}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <p>{rental.productName}</p>
                {rental.status === '반납' ? (
                  <Status status={rental.status}>{rental.status} 완료</Status>
                ) : (
                  <Status status={rental.status}>{rental.status}</Status>
                )}
              </div>
              <div style={{ fontFamily: 'NanumSquareRoundOTFR', fontSize: '14px' }}>
                {rental.rentalStationName}
              </div>
              <CardInfo>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <p style={{ color: 'var(--side-color-4)' }}>대여시작</p>
                  <p>{rental.rentalStartTime}</p>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <p style={{ color: 'var(--side-color-4)' }}>결제금액</p>
                  <p>{rental.amount.toLocaleString()}원</p>
                </div>
              </CardInfo>
              {rental.status !== '반납' && (
                <RentalTime>
                  {rental.rentalTimeHour}시간 / {rental.rentalTimeHour}시간
                  <BottomBar />
                </RentalTime>
              )}
            </Card>
            {rental.status !== '반납' && (
              <ReturnButton
                onClick={(e) => {
                  e.stopPropagation();
                  handleReturnClick(rental.rentalHistoryToken);
                }}
              >
                반납하기
              </ReturnButton>
            )}
          </CardWrapper>
        ))}
      </Container>
    </>
  );
}

export default HistoryPage;
