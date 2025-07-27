import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/axiosInstance';
import styled from 'styled-components';
import Cookies from 'js-cookie';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  position: relative;
`;

const Thumbnail = styled.img`
  position: absolute;
  top: -52%;
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

const Title = styled.h2`
  font-size: 19px;
  font-family: NanumSquareRoundOTFB;
  color: #000;
`;

const Subtitle = styled.p`
  font-size: 14px;
  font-family: NanumSquareRoundOTFR;
  color: var(--side-color-4);
  margin-top: 5px;
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
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStationData = async () => {
      try {
        const response = await api.get(`/api/v1/stations/${stationId}`);
        setStation(response.data.data);
      } catch (error) {
        console.error('Error fetching station data:', error);
      }
    };
    fetchStationData();
  }, [stationId]);

  if (!station) return null;

  const products = station.popularProducts?.slice(0, 3) || [];

  return (
    <Container>
      <Thumbnail src={station.image} alt="건물 이미지" />
      <Card>
        <TitleSection>
          <Title>{station.name}</Title>
          <Status
            status={station.status}
            openTime={station.openTime}
            closeTime={station.closeTime}
          />
        </TitleSection>

        <Subtitle>{station.address}</Subtitle>
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
