import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from '../../api/axiosInstance';
import styled from 'styled-components';
import HeaderGradient from '../../components/header/HeaderGradient';

const Container = styled.div`
  padding: 20px;
`;

const Box = styled.div`
  padding: 21px 0 0 0;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
`;

const InBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: end;
  gap: 4px;
  width: 100%;
  margin-bottom: 22px;
  p {
    font-size: 16px;
    font-family: NanumSquareRoundOTFB;
  }
`;

const ImageBox = styled.img`
  background-color: var(--side-color-3);
  width: 130px;
  aspect-ratio: 1 / 1;
  border-radius: 15px;
`;

const StatusBox = styled.div`
  font-size: 16px;
  font-family: NanumSquareRoundOTFB;
  width: 100px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 30px;
  background-color: var(--main-color);
`;

const ReturnInfo = styled.div`
  font-size: 14px;
  font-family: NanumSquareRoundOTFR;
  display: flex;
  flex-direction: column;
  padding-bottom: 17px;
`;

const ReturnInfoDetail = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 22px;
  span {
    color: var(--side-color-4);
  }
`;

const Title = styled.p`
  font-size: 19px;
  font-family: NanumSquareRoundOTFB;
  margin: 23px 0 18px;
`;

function HistoryDetailPage() {
  const { id } = useParams();
  const [rental, setRental] = useState(null);
  const [payment, setPayment] = useState(null);

  useEffect(() => {
    const fetchRentalDetail = async () => {
      try {
        const response = await api.get(`/api/v1/users/me/rentals/${id}`);
        const data = response.data.data;

        setRental(data.rentalHistory);
        setPayment(data.payments?.[0] || null);
      } catch (error) {
        console.error('이용내역 상세 조회 실패:', error);
      }
    };

    fetchRentalDetail();
  }, [id]);

  if (!rental) return <Container>존재하지 않는 내역입니다.</Container>;

  return (
    <>
    <HeaderGradient title="이용내역" backPath='/history'/>
    <Container>
        <p style={{ fontFamily: 'NanumSquareRoundOTFB', fontSize: '19px' }}>대여 정보</p>
        <Box>
          <InBox>
            <ImageBox src={rental.productImage}/>
            <StatusBox>{rental.status}</StatusBox>
          </InBox>
          <p style={{ fontSize: '19px', fontFamily: 'NanumSquareRoundOTFB', marginBottom: '4px' }}>{rental.productName}</p>
          <p style={{ fontSize: '14px', fontFamily: 'NanumSquareRoundOTFR', marginBottom: '24px' }}>{rental.rentalStationName}</p>
          <p style={{ fontSize: '16px', fontFamily: 'NanumSquareRoundOTFB', marginBottom: '4px' }}>
            대여시간 <span style={{ color: 'var(--main-color)' }}>{rental.rentalTimeHour}</span>시간
          </p>
        </Box>

        <ReturnInfo style={{ borderBottom: '1px solid var(--side-color-4)' }}>
          <ReturnInfoDetail>
            <span>대여시작</span>
            <p>{rental.rentalStartTime}</p>
          </ReturnInfoDetail>
          <ReturnInfoDetail>
            <span>반납예정</span>
            <p>{rental.expectedReturnTime}</p>
          </ReturnInfoDetail>
          {rental.returnTime && (
            <ReturnInfoDetail>
              <span>반납시간</span>
              <p>{rental.returnTime}</p>
            </ReturnInfoDetail>
          )}
          <ReturnInfoDetail>
            <span>대여 스테이션</span>
            <p>{rental.rentalStationName}</p>
          </ReturnInfoDetail>
          {rental.returnStationName && (
            <ReturnInfoDetail>
              <span>반납 스테이션</span>
              <p>{rental.returnStationName}</p>
            </ReturnInfoDetail>
          )}
        </ReturnInfo>

        {payment && (
          <ReturnInfo style={{ borderBottom: '1px solid var(--side-color-4)' }}>
            <Title>결제 정보</Title>
            <ReturnInfoDetail>
              <span>결제 수단</span>
              <p>{payment.method}</p>
            </ReturnInfoDetail>
            <ReturnInfoDetail>
              <span>결제 승인 시간</span>
              <p>{payment.paymentDate}</p>
            </ReturnInfoDetail>
            <ReturnInfoDetail>
              <span>결제 금액</span>
              <p>{payment.amount.toLocaleString()}원</p>
            </ReturnInfoDetail>
          </ReturnInfo>
        )}

        <ReturnInfo>
          <Title>기기 정보</Title>
          <ReturnInfoDetail>
            <span>대여물품명</span>
            <p>{rental.productName}</p>
          </ReturnInfoDetail>
          <ReturnInfoDetail>
            <span>대여물품 시리얼 넘버</span>
            <p>{rental.serialNumber}</p>
          </ReturnInfoDetail>
        </ReturnInfo>
    </Container>
    </>
  );
}

export default HistoryDetailPage;
