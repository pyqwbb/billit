import { useParams } from 'react-router-dom';
import rentalData from '../../data/mock/history.json';
import styled from 'styled-components';

const Container = styled.div`
  padding: 10px;
  margin: 25px 25px 0 25px;
  background-color: #f5f5f5;
  border-radius: 12px 12px 0 0;
`;

const Section = styled.div`
  margin-bottom: 24px;
  padding: 16px;
  border-radius: 12px;
`;

const Title = styled.h3`
  margin-bottom: 10px;
`;

const Label = styled.div`
  font-weight: bold;
`;

const Value = styled.div`
  margin-bottom: 8px;
`;

function HistoryDetailPage() {
  const { id } = useParams();
  const rental = rentalData.find(r => r.id.toString() === id);

  if (!rental) return <Container>존재하지 않는 내역입니다.</Container>;

  return (
    <Container>
      <Section style={{ borderBottom: '1px solid #333', borderRadius: '0' }}>
        <Title>대여 물품 정보</Title>
        <Label>대여 시간</Label>
        <Value>{rental.rentalTimeHour}</Value>
        <Label>대여 시작 시간</Label>
        <Value>{rental.startTime}</Value>
        <Label>예정 반납 시간</Label>
        <Value>{rental.expectedReturnTime ?? '없음'}</Value>
        {rental.returnTime && (
          <>
            <Label>반납 시간</Label>
            <Value>{rental.returnTime}</Value>
          </>
        )}
        <Label>대여 스테이션</Label>
        <Value>{rental.stationName}</Value>
        {rental.returnStation && (
          <>
            <Label>반납 스테이션</Label>
            <Value>{rental.returnStation}</Value>
          </>
        )}
      </Section>

      <Section style={{ borderBottom: '1px solid #333', borderRadius: '0' }}>
        <Title>결제 정보</Title>
        <Label>결제 수단</Label>
        <Value>{rental.paymentMethod}</Value>
        <Label>결제 승인 시간</Label>
        <Value>{rental.paymentTime}</Value>
        <Label>결제 금액</Label>
        <Value>{rental.price.toLocaleString()}원</Value>
      </Section>

      <Section>
        <Title>기기 정보</Title>
        <Label>대여 물품 명</Label>
        <Value>{rental.itemName}</Value>
        <Label>시리얼 넘버</Label>
        <Value>{rental.serialNumber}</Value>
      </Section>
    </Container>
  );
}

export default HistoryDetailPage;
