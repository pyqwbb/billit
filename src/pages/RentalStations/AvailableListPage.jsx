import { useState } from 'react';
import ReactDOM from 'react-dom';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FiSearch } from 'react-icons/fi';
import Header from '../../components/header/HeaderMain.jsx';

const Container = styled.div`
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

const StationCard = styled.div`
  display: flex;
  padding: 16px 0;
  border-bottom: 1px solid var(--side-color-2);
`;

const StationImage = styled.img`
  width: 154px;
  height: 154px;
  border-radius: 15px;
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

const Status = ({ state, openTime }) => {
  const isOpen = state === '영업중';

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
      {state} ({openTime})
    </div>
  );
};

function AvailableListPage() {
  const [searchText, setSearchText] = useState('');

  const itemData = {
    id: 1,
    name: "라이트닝 충전기, 어댑터",
    pricePerHour: 1000,
    imageUrl: `/images/billit-black.jpg`,
  };

  const stationData = [
    {
      id: 1,
      stationName: "건국대학교 제1학생회관",
      availableCount: 3,
      distance: 324,
      status: "영업중",
      hours: "08:00~22:00",
      imageUrl: `/images/billit-black.jpg`,
    },
    {
      id: 2,
      stationName: "엔제리너스 건대입구점",
      availableCount: 5,
      distance: 733,
      status: "오늘휴무",
      hours: "07:00~00:00",
      imageUrl: `/images/billit-black.jpg`,
    }
  ];

  const filteredStationData = stationData.filter(station =>
    station.stationName.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <>
      <Header />
      <Container>
        <ItemCard>
          <ItemImage src={itemData.imageUrl} alt={itemData.name} />
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

        {filteredStationData.map(station => (
          <StationCard key={station.id}>
            <StationImage src={station.imageUrl} alt={station.stationName} />
            <StationInfo>
              <StationName>{station.stationName}</StationName>
              <StationDetail>
                <p>잔여수량 {station.availableCount}개 · {station.distance}m</p>
                <Status state={station.status} openTime={station.hours} />
              </StationDetail>
            </StationInfo>
          </StationCard>
        ))}
      </Container>
    </>
  );
}

export default AvailableListPage;
