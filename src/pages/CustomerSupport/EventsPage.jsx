import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import HeaderGradient from '../../components/header/HeaderGradient';
import api from '../../api/axiosInstance';

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
  font-size: 12px;
  font-family: 'NanumSquareRoundOTFR';
`;

const FilterButton = styled.button`
  background-color: #fff;
  border: none;
  padding: 6px;
  cursor: pointer;
  margin-left: 8px;
  font-weight: ${({ $active }) => ($active ? 'bold' : 'normal')};
  font-size: 12px;
  font-family: 'NanumSquareRoundOTFR';
`;

const Grid = styled.div`
  gap: 40px;
  display: flex;
  flex-direction: column;
`;

const Card = styled.div`
  border-radius: 8px;
  background-color: #fff;
  cursor: pointer;
`;

const Thumbnail = styled.img`
  width: 100%;
  object-fit: cover;
  border-radius: 30px;
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

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 8px;
  white-space: nowrap;
  overflow: hidden;
  font-size: 19px;
  font-family: 'NanumSquareRoundOTFB';

  p {
    font-size: 16px;
    font-family: 'NanumSquareRoundOTFR';
  }
`;

const Status = styled.span`
  font-size: 12px;
  color: black;
  background-color: ${({ $status }) =>
    $status === '진행중' ? '#85FF6A' : 'var(--side-color-2)'};
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
  const [events, setEvents] = useState([]);
  const [filter, setFilter] = useState('전체');
  const [sortAsc, setSortAsc] = useState(false);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const size = 10;
  const navigate = useNavigate();

  useEffect(() => {
    setEvents([]);
    setPage(0);
    fetchEvents(0, sortAsc);
  }, [sortAsc]);

  const fetchEvents = async (pageNumber, isAsc) => {
    if (pageNumber === 0) return;
    const sort = isAsc ? 'asc' : 'desc';

    try {
      const response = await api.get(
        `/api/v1/events?page=${pageNumber}&size=${size}&sort=startDate,${sort}`,
      );
      const content = response.data?.data?.events?.content || [];
      const pageInfo = response.data?.data?.events?.page;

      setEvents((prev) => [...prev, ...content]);
      setPage(pageNumber + 1);
      setHasMore(pageNumber + 1 < pageInfo.totalPages);
    } catch (error) {
      console.error('이벤트 불러오기 실패:', error);
    }
  };

  const filtered = events.filter(
    (event) => filter === '전체' || event.status === filter,
  );

  return (
    <>
      <HeaderGradient title="이벤트" backPath="/mypage" />
      <Container>
        <ControlBox>
          <SortButton onClick={() => setSortAsc((prev) => !prev)}>
            시작일자 정렬: {sortAsc ? '오름차순 ▲' : '내림차순 ▼'}
          </SortButton>
          <FilterButton
            onClick={() =>
              setFilter((prev) => (prev === '진행중' ? '전체' : '진행중'))
            }
            $active={filter === '진행중'}
          >
            마감 제외
          </FilterButton>
        </ControlBox>

        <Grid>
          {filtered.map((event) => (
            <Card
              key={event.id}
              onClick={() => navigate(`/events/${event.id}`)}
            >
              <Thumbnail src={event.thumbnail} alt="썸네일" />
              <Info>
                <Content>
                  <TitleRow>
                    {event.title}
                    <Status $status={event.status}>{event.status}</Status>
                  </TitleRow>
                  <p>{event.content}</p>
                </Content>
                <div
                  style={{
                    fontFamily: 'NanumSquareRoundOTFR',
                    fontSize: '12px',
                    textAlign: 'right',
                    marginTop: '6px',
                  }}
                >
                  {event.startDate} ~ {event.endDate}
                </div>
              </Info>
            </Card>
          ))}
        </Grid>

        {hasMore && (
          <MoreButton onClick={() => fetchEvents(page, sortAsc)}>
            더보기
          </MoreButton>
        )}
      </Container>
    </>
  );
}

export default EventsPage;
