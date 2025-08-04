import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../components/header/HeaderMain';
import NaverMap from './RentalStations/NaverMap';
import { getCurrentPosition } from '../utils/geolocation';
import api from '../api/axiosInstance';

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

const EventBoxWrapper = styled.div`
  position: relative;
  margin-top: 33px;
  height: 114px;
  background-color: #9BA5B7;
  border-radius: 15px;
  overflow: hidden;
`;

const EventSlider = styled.div`
  display: flex;
  transform: translateX(${(props) => `-${props.index * 100}%`});
  transition: transform 0.6s ease-in-out;
  width: ${(props) => props.length * 100}%;
`;

const EventItem = styled.div`
  min-width: 100%;
  height: 114px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-family: NanumSquareRoundOTFR;
  background-color: #9BA5B7;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 15px;
  }
`;

const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 8px;
  gap: 6px;
`;

const PaginationDot = styled.div`
  width: 26px;
  height: 2px;
  background-color: ${(props) => (props.active ? '#545F71' : '#D3D6DB')};
  cursor: pointer;
  transition: background-color 0.3s;
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

const NoticeWrapper = styled.div`
  margin-top: 18px;
  height: 54px;
  overflow: hidden;
  position: relative;
  border-bottom: 1px solid #9BA5B7;
`;

const NoticeList = styled.div`
  display: flex;
  flex-direction: column;
  transform: translateY(${(props) => `-${props.index * 54}px`});
  transition: transform 0.6s ease-in-out;
`;

const NoticeItem = styled.div`
  height: 54px;
  display: flex;
  align-items: center;
  font-size: 19px;
  font-family: NanumSquareRoundOTFEB;
  color: #545F71;
  cursor: pointer;
  padding-left: 4px;
`;

const LoadingText = styled.div`
  font-size: 16px;
  color: gray;
  margin: 20px 0;
`;

function MainPage() {
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState(null);
  const [locationStatus, setLocationStatus] = useState('loading');
  const [accessToken, setAccessToken] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [currentNoticeIndex, setCurrentNoticeIndex] = useState(0);
  const [currentEventIndex, setCurrentEventIndex] = useState(0);

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
    const token = localStorage.getItem('accessToken');
    setAccessToken(token);

    const { latitude, longitude } = userLocation;

    api.get(`/api/v1/main?latitude=${latitude}&longitude=${longitude}`)
      .then((res) => {
        setDashboardData(res.data.data);
        setLocationStatus('success');
      })
      .catch(() => {
        setLocationStatus('error');
      });
  }, [userLocation]);

  // 공지사항 자동 롤링
  useEffect(() => {
    if (!dashboardData || dashboardData.latestNotices.length === 0) return;

    const interval = setInterval(() => {
      setCurrentNoticeIndex((prevIndex) =>
        prevIndex === dashboardData.latestNotices.length - 1 ? 0 : prevIndex + 1
      );
    }, 2000);

    return () => clearInterval(interval);
  }, [dashboardData]);

  // 이벤트 자동 슬라이드
  useEffect(() => {
    if (!dashboardData || dashboardData.events.length === 0) return;

    const interval = setInterval(() => {
      setCurrentEventIndex((prev) =>
        prev === dashboardData.events.length - 1 ? 0 : prev + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [dashboardData]);

  return (
    <>
      <Header />
      <MainContainer>
        {locationStatus === 'loading' && <LoadingText>위치 권한을 요청 중입니다...</LoadingText>}
        {locationStatus === 'error' && <LoadingText>위치 정보를 불러올 수 없습니다.</LoadingText>}

        {dashboardData && (
          <>
            <RentalItemList>
              {accessToken ? (
                dashboardData.activeRentals.length > 0 ? (
                  dashboardData.activeRentals.map((item, idx) => (
                    <RentalItemCard key={idx}>
                      <ItemTitle>{item.productName}</ItemTitle>
                      <ItemTime>
                        <p>{`${item.rentalTimeHour}시간 / 대여 중`}</p>
                        <TimeBar />
                      </ItemTime>
                    </RentalItemCard>
                  ))
                ) : (
                  <RentalItemCard>
                    <ItemTitle>현재 대여 중인 물품이 없습니다.</ItemTitle>
                  </RentalItemCard>
                )
              ) : (
                <RentalItemCard>
                  <ItemTitle>로그인 후 이용하세요</ItemTitle>
                </RentalItemCard>
              )}
            </RentalItemList>

            <EventBoxWrapper>
              {dashboardData.events.length > 0 ? (
                <EventSlider index={currentEventIndex} length={dashboardData.events.length}>
                  {dashboardData.events.map((event, idx) => (
                    <EventItem key={idx}>
                      <img src={event.bannerImage} alt={event.bannerImage} />
                    </EventItem>
                  ))}
                </EventSlider>
              ) : (
                <EventItem>
                  진행 중인 이벤트 없음
                </EventItem>
              )}
            </EventBoxWrapper>

            {dashboardData.events.length > 1 && (
              <PaginationWrapper>
                {dashboardData.events.map((_, idx) => (
                  <PaginationDot
                    key={idx}
                    active={idx === currentEventIndex}
                    onClick={() => setCurrentEventIndex(idx)}
                  />
                ))}
              </PaginationWrapper>
            )}

            <SectionTitle>주변 스테이션 찾기</SectionTitle>
            <MapBox onClick={() => navigate('/station-map')}>
              <NaverMap />
            </MapBox>

            <NoticeWrapper>
              <NoticeList index={currentNoticeIndex}>
                {dashboardData.latestNotices.map((notice) => (
                  <NoticeItem
                    key={notice.id}
                    onClick={() => navigate(`/notice/${notice.id}`)}
                  >
                    {notice.title}
                  </NoticeItem>
                ))}
              </NoticeList>
            </NoticeWrapper>
          </>
        )}
      </MainContainer>
    </>
  );
}

export default MainPage;
