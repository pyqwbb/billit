import { useEffect, useState } from 'react';
import Header from '../../components/header/HeaderGradient';
import styled from 'styled-components';
import api from '../../api/authApi';

function FavoriteStationPage() {
    const [bookmarks, setBookmarks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
    const fetchStations = async () => {
      try {
        const res = await api.get('/api/v1/stations/bookmarks');
        setBookmarks(res.data.data.bookmarks || []);
      } catch (error) {
        console.error('즐겨찾기 스테이션 조회 실패:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchStations();
  }, []);

  return (
    <>
        <Header title="즐겨찾기 스테이션" backPath='/station-map'/>
        <Container>
        {loading ? (
          <Message>불러오는 중...</Message>
        ) : bookmarks.length === 0 ? (
          <Message>즐겨찾기한 스테이션이 없습니다.</Message>
        ) : (
          <StationList>
            {bookmarks.map((station) => (
              <StationCard key={station.stationId}>
                <StationName>{station.name}</StationName>
                <StationAddress>{station.address}</StationAddress>
              </StationCard>
            ))}
          </StationList>
        )}
      </Container>
    </>
  );
}

export default FavoriteStationPage;

const Container = styled.div`
    padding: 16px;
`;

const Message = styled.div`
    text-align: center;
    font-size: 16px;
    font-family: 'NanumSquareRoundOTFR';
    margin-top: 40px;
    color: var(--side-color-4);
`;

const StationList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
`;

const StationCard = styled.div`
    padding: 14px;
    padding-bottom: 20px;
    border-bottom: 1px solid var(--side-color-3);
`;

const StationName = styled.div`
    font-size: 16px;
    font-family: 'NanumSquareRoundOTFB';
`;

const StationAddress = styled.div`
    font-size: 14px;
    font-family: 'NanumSquareRoundOTFR';
    color: var(--side-color-4);
`;