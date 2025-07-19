import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../components/header/HeaderMain';
import NaverMap from './RentalStations/NaverMap';

const MainContainer = styled.div`
  padding: 24px 16px;
`;

const RentalItemList = styled.div`
  display: flex;
  overflow-x: auto;
  border: none;
  gap: 34px;
`;

const RentalItemCard = styled.div`
  background-color: var(--side-color-1);
  border-radius: 12px;
  padding: 15px;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-width: 177px;
  height: 126px;
`;

const ItemTitle = styled.div`
  font-size: 16px;
  font-family: NanumSquareRoundOTFEB;
`;

const ItemTime = styled.div`
  display: flex;
  flex-direction: column;
  gap: 7px;
  font-size: 14px;
  font-family: NanumSquareRoundOTFR;
`;

const TimeBar = styled.div`
  height: 2px;
  background: linear-gradient(to right, var(--main-color), #EEF1F4 );
`;

const EventBox = styled.div`
  margin-top: 33px;
  height: 114px;
  background-color: #9BA5B7;
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-family: NanumSquareRoundOTFR;
`;

const SectionTitle = styled.div`
  margin: 27px 0 16px;
  font-size: 19px;
  font-family: NanumSquareRoundOTFEB;
  display: flex;
  align-items: center;
`;

const MapBox = styled.div`
  width: 100%;
  height: 196px;
  overflow: hidden;
  margin-bottom: 24px;
`;

const NoticeBox = styled.div`
  margin-top: 18px;
  height: 54px;
  font-size: 19px;
  font-family: NanumSquareRoundOTFEB;
  color: #545F71;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #9BA5B7;
`;

function MainPage() {
  const navigate = useNavigate();

  return (
    <>
    <Header />
    <MainContainer>
      <RentalItemList>
        <RentalItemCard>
          <ItemTitle>대여 물품명</ItemTitle>
          <ItemTime>
            <p>잔여시간 / 대여시간</p>
            <TimeBar />       
          </ItemTime>
        </RentalItemCard>
        <RentalItemCard>
          <ItemTitle>대여 물품명</ItemTitle>
          <ItemTime>
            <p>잔여시간 / 대여시간</p>
            <TimeBar />       
          </ItemTime>
        </RentalItemCard>
      </RentalItemList>

      <EventBox>진행중인 이벤트</EventBox>

      <SectionTitle>주변 스테이션 찾기</SectionTitle>
      <MapBox onClick={() => { navigate('/station-map');}}>
        <NaverMap />
      </MapBox>

      <NoticeBox>공지사항</NoticeBox>
    </MainContainer>
    </>
  );
}

export default MainPage;
