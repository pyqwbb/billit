import { useParams } from 'react-router-dom';
import eventData from '../../data/mock/events-detail.json';
import styled from 'styled-components';

const Container = styled.div`
  padding: 24px;
`;

const InfoBox = styled.div`
  font-size: 14px;
  border-bottom: 1px solid #ccc;
  padding-bottom: 12px;
  margin-bottom: 12px;
`;

const Img = styled.img`
  width: 100%;
  margin-top: 16px;
  border-radius: 8px;
`;

function EventDetailPage() {
  const { id } = useParams();
  const event = eventData.find(e => e.id === parseInt(id));

  if (!event) return <Container>존재하지 않는 이벤트입니다.</Container>;

  const sortedImages = [...event.images].sort((a, b) => a.order - b.order);

  return (
    <Container>
      <h2 style={{"paddingBottom": "8px"}}>{event.title}</h2>
      <InfoBox>
        {event.startDate} ~ {event.endDate}
      </InfoBox>
      {event.content && <p>{event.content}</p>}
      {sortedImages.map((img, i) => (
        <Img key={i} src={img.image} alt={`event-image-${i}`} />
      ))}
    </Container>
  );
}

export default EventDetailPage;