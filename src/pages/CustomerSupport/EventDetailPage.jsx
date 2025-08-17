import { useState, useEffect } from 'react';
import api from '../../api/axiosInstance';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import HeaderGradient from '../../components/header/HeaderGradient';

const Container = styled.div`
  padding: 24px;
  h2 {
    font-size: 24px;
    font-family: 'NanumSquareRoundOTFEB';
  }
  p {
    font-size: 16px;
    font-family: 'NanumSquareRoundOTFR';
  }
`;

const InfoBox = styled.div`
  font-size: 12px;
  margin-top: 10px;
  border-bottom: 1px solid var(--side-color-4);
  padding-bottom: 11px;
  margin-bottom: 18px;
  font-family: 'NanumSquareRoundOTFR';
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Status = styled.span`
  font-size: 12px;
  color: black;
  background-color: ${props => props.status === '진행중' ? '#85FF6A' : 'var(--side-color-2)'};
  border-radius: 30px;
  margin-left: 8px;
  width: 66px;
  height: 25px;
  text-align: center;
  font-size: 12px;
  font-family: 'NanumSquareRoundOTFR';  
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Img = styled.img`
  width: 100%;
  margin-top: 16px;
  border-radius: 8px;
`;

const NoImageText = styled.div`
  text-align: center;
  font-size: 16px;
  font-family: 'NanumSquareRoundOTFR';
  color: var(--side-color-3);
  margin: 26px 0;
  background-color: var(--side-color-1);
  border-radius: 16px;
  width: 100%;
  aspect-ratio: 1 / 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

function EventDetailPage() {
  const { id } = useParams();
  const [event, setEvent] = useState({});

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await api.get(`/api/v1/events/${id}`);
        setEvent(response.data.data);
      } catch (error) {
        console.error('이벤트 정보를 불러오는 데 실패했습니다:', error);
      }
    }
    fetchEvent();
  }, [id]);

  if (!event) return <Container>존재하지 않는 이벤트입니다.</Container>;

  const sortedImages = Array.isArray(event.images)
    ? [...event.images].sort((a, b) => a.order - b.order)
    : [];

  return (
    <>
    <HeaderGradient title="이벤트"/>
    <Container>
      <h2>{event.title}</h2>
      <InfoBox>
        {event.startDate} ~ {event.endDate}
        <Status status={event.status}>{event.status}</Status>
      </InfoBox>
      {event.content && <p>{event.content}</p>}
      {sortedImages.length > 0 ? (
        sortedImages.map((img, i) => (
          <Img key={i} src={img.image} alt={`event-image-${i}`} />
        ))
      ) : (
        <NoImageText>등록된 이미지가 없습니다.</NoImageText>
      )}
    </Container>
    </>
  );
}

export default EventDetailPage;