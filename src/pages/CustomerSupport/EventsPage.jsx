import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import eventData from '../../data/mock/events.json';

const Container = styled.div`
  padding: 24px;
`;

const ControlBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 12px;
  margin-bottom: 16px;
`;

const SortButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 14px;
  color: #333;
`;

const FilterButton = styled.button`
  background-color: #eee;
  border: none;
  border-radius: 20px;
  padding: 6px 12px;
  cursor: pointer;
  margin-left: 8px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
`;

const Card = styled.div`
  border-radius: 8px;
  overflow: hidden;
  background-color: #f5f5f5;
  cursor: pointer;
`;

const Thumbnail = styled.img`
  width: 100%;
  height: 120px;
  object-fit: cover;
`;

const Info = styled.div`
  padding: 12px;
  gap: 4px;
  display: flex;
  flex-direction: column;
`;

const TitleRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  white-space: nowrap;
  overflow: hidden;
`;

const Status = styled.span`
  font-size: 12px;
  color: white;
  background-color: ${props => props.status === '진행중' ? '#22c55e' : '#aaa'};
  padding: 2px 8px;
  border-radius: 12px;
  margin-left: 8px;
`;

const MoreButton = styled.button`
  width: 100%;
  margin: 20px auto 0;
  display: block;
  padding: 12px 24px;
  background-color: #ddd;
  border: none;
  border-radius: 30px;
  cursor: pointer;
`;

function EventsPage() {
  const [filter, setFilter] = useState('전체');
  const [sortAsc, setSortAsc] = useState(false);
  const [limit, setLimit] = useState(10);
  const navigate = useNavigate();

  const filtered = eventData.filter(event => filter === '전체' || event.status === filter);

  const sorted = [...filtered].sort((a, b) => {
    const dateA = new Date(a.startDate);
    const dateB = new Date(b.startDate);
    return sortAsc ? dateA - dateB : dateB - dateA;
  });

  const paged = sorted.slice(0, limit)

  return (
    <Container>
      <ControlBox>
        <SortButton onClick={() => setSortAsc(prev => !prev)}>
          시작일자 정렬: {sortAsc ? '오름차순 ▲' : '내림차순 ▼'}
        </SortButton>
        <div>
          <FilterButton onClick={() => setFilter('전체')}>전체</FilterButton>
          <FilterButton onClick={() => setFilter('진행중')}>진행중</FilterButton>
          <FilterButton onClick={() => setFilter('마감')}>마감</FilterButton>
        </div>
      </ControlBox>

      <Grid>
        {paged.map(event => (
          <Card key={event.id} onClick={() => navigate(`/events/${event.id}`)}>
            <Thumbnail src={event.thumnail} alt="썸네일" />
            <Info>
              <TitleRow>
                <strong style={{ flexShrink: 1, overflow: 'hidden', textOverflow: 'ellipsis', fontSize: '14px' }}>
                  {event.title}
                </strong>
                <Status status={event.status}>{event.status}</Status>
              </TitleRow>
              <div style={{fontSize: '12px'}}>{event.startDate} ~ {event.endDate}</div>
            </Info>
          </Card>
        ))}
      </Grid>

      {limit < sorted.length && (
        <MoreButton onClick={() => setLimit(prev => prev + 10)}>
          더보기
        </MoreButton>
      )}
    </Container>
  );
}

export default EventsPage;
