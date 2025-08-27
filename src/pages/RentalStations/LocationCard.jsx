import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/axiosInstance';
import styled from 'styled-components';
import Cookies from 'js-cookie';
import { HiHeart, HiOutlineHeart } from "react-icons/hi";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  position: relative;
`;

const Thumbnail = styled.img`
  position: absolute;
  top: -170px;
  left: 16px;
  width: 155px;
  height: auto;
  border-radius: 12px;
`;

const Card = styled.div`
  width: 100%;
  border-radius: 30px 30px 0 0;
  background: linear-gradient(rgba(133, 255, 106, 0.7), rgba(213, 228, 227, 0.9));
  padding: 20px;
  box-sizing: border-box;
`;

const TitleSection = styled.div`
  display: flex;
  align-items: baseline;
  flex-direction: row;
  gap: 6px;
`;

const SubSection = styled.div`
  display: flex;
  justify-content: space-between;
`;

const LikeIcon = styled.div`
  font-size: 24px;
  display: flex;
  align-items: center;
  margin-right: 8px;
`;

const Title = styled.h2`
  font-size: 19px;
  font-family: NanumSquareRoundOTFB;
  color: #000;
  white-space: pre-line;
`;

const Address = styled.p`
  font-size: 14px;
  font-family: NanumSquareRoundOTFR;
  color: var(--side-color-4);
  margin-top: 5px;
  white-space: pre-line;
`;

const Divider = styled.hr`
  margin: 16px 0 13px 0;
  border: none;
  border-top: 1px solid var(--side-color-3);
`;

const Label = styled.p`
  font-size: 14px;
  font-family: NanumSquareRoundOTFB;
  margin-bottom: 9px;
`;

const ItemList = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 12px;
  margin-bottom: 16px;
`;

const ItemBox = styled.div`
  width: 112px;
  height: 112px;
  background: var(--side-color-3);
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 8px;
  box-sizing: border-box;
  font-family: NanumSquareRoundOTFR;
  font-size: 12px;
  text-align: center;
`;

const ItemImage = styled.img`
  width: 40px;
  height: 40px;
  object-fit: contain;
  margin-bottom: 6px;
`;

const Button = styled.button`
  width: 100%;
  height: 52px;
  padding: 12px;
  background: var(--main-color);
  color: #000;
  font-weight: 600;
  font-size: 16px;
  font-family: NanumSquareRoundOTFB;
  border-radius: 30px;
  border: none;
  cursor: pointer;
`;

const Status = ({ status, openTime, closeTime }) => {
  const isOpen = status === '운영 중';

  return (
    <div
      style={{
        fontFamily: 'NanumSquareRoundOTFR',
        fontSize: '12px',
        color: 'var(--side-color-4)',
      }}
    >
      |{' '}
      <span style={{ color: isOpen ? '#51f12e' : 'var(--side-color-4)' }}>
        ●
      </span>{' '}
      {status} ({openTime}~{closeTime})
    </div>
  );
};

export default function LocationCard({ stationId }) {
  const [station, setStation] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const navigate = useNavigate();

  // 스테이션 데이터 & 즐겨찾기 여부 불러오기
  useEffect(() => {
    const fetchStationData = async () => {
      try {
        // 1. 스테이션 상세
        const response = await api.get(`/api/v1/stations/${stationId}`);
        setStation(response.data.data);

        // 2. 즐겨찾기 목록
        const bookmarkRes = await api.get(`/api/v1/stations/bookmarks`);
        const bookmarkedIds = bookmarkRes.data.data.bookmarks.map(b => b.stationId);

        // 3. 현재 stationId가 즐겨찾기 목록에 있는지 확인
        setIsFavorite(bookmarkedIds.includes(Number(stationId)));
      } catch (error) {
        console.error('Error fetching station data:', error);
      }
    };
    fetchStationData();
  }, [stationId]);

  if (!station) return null;

  const products = station.popularProducts?.slice(0, 3) || [];

  // name이 12글자 이상이면 개행 추가
  const formattedName =
    station.name.length > 10
      ? station.name.slice(0, 12) + '\n' + station.name.slice(12)
      : station.name;

  // address 구 단위로 개행
  const formattedAddress = station.address.replace(/(구\s)/, '구\n');

  // 즐겨찾기 스테이션 등록/삭제
  const handleFavoriteToggle = async () => {
    try {
      if (isFavorite) {
        await api.delete(`/api/v1/stations/${stationId}/bookmarks`);
        setIsFavorite(false);
      } else {
        await api.post(`/api/v1/stations/${stationId}/bookmarks`);
        setIsFavorite(true);
      }
    } catch (error) {
      console.error('즐겨찾기 등록/삭제 실패:', error);
    }
  };

  return (
    <Container>
      <Thumbnail src={station.image} alt="건물 이미지" />
      <Card>
        <TitleSection>
          <Title>{formattedName}</Title>
          <Status
            status={station.status}
            openTime={station.openTime}
            closeTime={station.closeTime}
          />
        </TitleSection>

        <SubSection>
          <Address>{formattedAddress}</Address>
          <LikeIcon onClick={handleFavoriteToggle}>
            {isFavorite ? <HiHeart/> : <HiOutlineHeart/>}
          </LikeIcon>
        </SubSection>
        <Divider />

        <Label>바로 대여 가능!</Label>
        <ItemList>
          {products.slice(0, 3).map((item, index) => (
            <ItemBox key={index}>
              <ItemImage src={item.image} alt={item.name} />
              <div>{item.name}</div>
              <div>{item.count}개</div>
            </ItemBox>
          ))}
        </ItemList>

        <Button
          onClick={() => {
            // 1. 기존 쿠키 제거
            Cookies.remove('recentStation');

            // 2. 새 스테이션 정보 저장 (필요한 필드만 추려서)
            Cookies.set('selectStation', JSON.stringify({
              id: station.id,
              name: station.name,
              status: station.status,
              openTime: station.openTime,
              closeTime: station.closeTime
            }), { expires: 1 }); // 1일 동안 유지

            // 3. 페이지 이동
            navigate('/rental-items', { state: { from: 'location', stationId: stationId } });
          }}
        >
          대여 가능 물품 전체 조회
        </Button>

      </Card>
    </Container>
  );
}
