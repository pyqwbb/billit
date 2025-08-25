import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation, useParams } from 'react-router-dom';
import api from '../../api/axiosInstance';
import { getCurrentPosition } from '../../utils/geolocation';
import styled from 'styled-components';
import { FiSearch } from 'react-icons/fi';
import Header from '../../components/header/HeaderMain.jsx';
import map from '../../assets/icon/map.svg';

const Container = styled.div`
  position: relative;
  padding: 16px;
`;

const ItemCard = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 15px;
`;

const ItemImage = styled.img`
  width: 170px;
  height: 170px;
  border-radius: 15px;
  background-color: var(--side-color-1);
`;

const ItemInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 10px;
`;

const ItemName = styled.div`
  font-size: 16px;
  font-family: 'NanumSquareRoundOTFB';
`;

const ItemPrice = styled.div`
  font-size: 17px;
  font-family: 'NanumSquareRoundOTFR';
  text-align: right;
  span {
    font-size: 16px;
    font-family: 'NanumSquareRoundOTFB';
    color: var(--main-color);
  }
`;

const SearchWrapper = styled.div`
  position: relative;
  width: 100%;
  padding: 20px 0;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 12px 40px 12px 12px;
  border: none;
  border-bottom: 1px solid var(--side-color-3);
  border-radius: 0px;
  font-family: 'NanumSquareRoundOTFR';
  font-size: 16px;
`;

const SearchIcon = styled(FiSearch)`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--side-color-3);
  pointer-events: none;
  font-size: 20px;
`;

const FilterWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 10px;
`;

const FilterButton = styled.button`
  padding: 6px 12px;
  border: 1px solid var(--main-color);
  background-color: ${props => (props.active ? 'var(--main-color)' : 'white')};
  color: ${props => (props.active ? 'white' : 'var(--main-color)')};
  border-radius: 6px;
  cursor: pointer;
  font-family: 'NanumSquareRoundOTFR';
  font-size: 14px;
`;

const StationCard = styled.div`
  display: flex;
  padding: 16px 0;
  border-bottom: 1px solid var(--side-color-2);
`;

const StationImage = styled.img`
  width: 154px;
  height: 154px;
  border-radius: 15px;
  background-color: var(--side-color-1);
`;

const StationInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 15px;
`;

const StationName = styled.div`
  font-size: 16px;
  font-family: 'NanumSquareRoundOTFB';
`;

const StationDetail = styled.div`
  p {
    height: 22px;
    font-size: 14px;
    font-family: 'NanumSquareRoundOTFR';
  }
`;

const MapIcon = styled.img`
  position: fixed;
  bottom: 36px;
  right: 12px;
  width: 71px;
  aspectRatio: 1 / 1;
  cursor: pointer;
  transition: transform 0.2s ease;
  &:hover {
    transform: translateY(-8px);
  }
`;

const Status = ({ status, openTime }) => {
  const isOpen = status === '운영 중';

  return (
    <div
      style={{
        height: '22px',
        fontFamily: 'NanumSquareRoundOTFR',
        fontSize: '12px',
        color: 'var(--side-color-4)',
      }}
    >
      <span style={{ color: isOpen ? 'var(--main-color)' : 'var(--side-color-4)' }}> ● </span>
      {status} ({openTime})
    </div>
  );
};

function AvailableListPage() {
  const [searchText, setSearchText] = useState('');
  const [stationData, setStationData] = useState([]);
  const [showInStockOnly, setShowInStockOnly] = useState(false);
  const navigate = useNavigate();
  const { productName } = useParams();
  const location = useLocation();
  const itemData = location.state?.itemData;
  const [userLocation, setUserLocation] = useState(null); // 사용자 위치 상태

  // 사용자 위치 가져오기
  useEffect(() => {
    getCurrentPosition()
      .then(({ latitude, longitude }) => {
        setUserLocation({ latitude, longitude });
      })
      .catch(() => {
        setUserLocation({ latitude: 37.542053, longitude: 127.078192 });
      });
  }, []);

  useEffect(() => {
    if (!userLocation) return; // 위치 받아오기 전까지 대기

    const fetchStations = async () => {
      try {
        const response = await api.get(`/api/v1/products/${productName}/stations`, {
          params: {
            latitude: userLocation.latitude,
            longitude: userLocation.longitude,
          },
        });
        setStationData(response.data.data.content);
      } catch (error) {
        console.error('Error fetching rental stations:', error);
      }
    }
    fetchStations();
  }, [userLocation]);

  const filteredStationData = stationData
    .filter(station =>
      station.name.toLowerCase().includes(searchText.toLowerCase())
    )
    .filter(station => (showInStockOnly ? station.stock > 0 : true));

  return (
    <>
      <Header />
      <Container>
        <ItemCard>
          <ItemImage src={itemData.image} alt={itemData.name} />
          <ItemInfo>
            <ItemName>{itemData.name}</ItemName>
            <ItemPrice>
              <span>{itemData.pricePerHour.toLocaleString()}
                <span style={{color: 'black'}}>원</span>
              </span>
               /시간
            </ItemPrice>
          </ItemInfo>
        </ItemCard>

        <SearchWrapper>
          <SearchInput
            placeholder='매장 이름 검색'
            value={searchText}
            onChange={e => setSearchText(e.target.value)}
          />
          <SearchIcon />
        </SearchWrapper>

        <FilterWrapper>
          <FilterButton
            active={showInStockOnly}
            onClick={() => setShowInStockOnly(prev => !prev)}
          >
            품절 제외
          </FilterButton>
        </FilterWrapper>

        {filteredStationData.map(station => (
          <StationCard key={station.id}>
            <StationImage src={station.image} alt={station.name} />
            <StationInfo>
              <StationName>{station.name}</StationName>
              <StationDetail>
                <p>잔여수량 {station.stock}개 · {station.distance}m</p>
                <Status status={station.status} openTime={station.openTime} />
              </StationDetail>
            </StationInfo>
          </StationCard>
        ))}

        <MapIcon
          src={map}
          onClick={() => navigate(`/rental-items/${productName}/map`, { state: { itemData } })}
        />
      </Container>
    </>
  );
}

export default AvailableListPage;
