import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../components/header/HeaderMain';
import NaverMap from './RentalStations/NaverMap';
import { getCurrentPosition } from '../utils/geolocation';
import api from '../api/axiosInstance';
import mainApi from '../api/mainApi';
import ClipLoader from 'react-spinners/ClipLoader';
import Modal, { CancelButton, ConfirmButton } from '../utils/Modal';

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
  margin-bottom: 33px;
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
  background: linear-gradient(to right, var(--main-color), #eef1f4);
`;

const EventBoxWrapper = styled.div`
  position: relative;
  background-color: #deffd6;
  border-radius: 15px;
  overflow: hidden;
`;

const EventSlider = styled.div`
  display: flex;
  width: 100%;
`;

const EventItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #deffd6;
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
  border-bottom: 1px solid #9ba5b7;
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
  color: #545f71;
  cursor: pointer;
  padding-left: 4px;
`;

const StyledButton = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 30px;
  margin-bottom: -30px;

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50%;
    height: 84px;
    border: none;
    cursor: pointer;
    font-family: 'NanumSquareRoundOTFEB';
    font-size: 20px;
  }
`;

const LoadingText = styled.div`
  font-size: 16px;
  color: gray;
  margin: 20px 0;
`;

function MainPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const [dashboardData, setDashboardData] = useState(null);
  const [activeRentals, setActiveRentals] = useState([]);
  const [locationStatus, setLocationStatus] = useState('loading');
  const [currentNoticeIndex, setCurrentNoticeIndex] = useState(0);

  const DEFAULT_LOCATION = {
    latitude: 37.542183,
    longitude: 127.078188,
  };

  const [isOpen, setIsOpen] = useState(false);

  const hasAccessToken = () => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      localStorage.setItem('redirectPath', window.location.pathname);
      setIsOpen(true);
      return false;
    }
    return true;
  };

  const handleRentalClick = () => {
    if (!hasAccessToken()) return;
    navigate('/packages');
  };

  const handleReturnClick = () => {
    if (!hasAccessToken()) return;
    navigate('/package-return-newAPI');
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const stationId = params.get('stationId');

    if (stationId) {
      sessionStorage.setItem('scannedQrNumber', stationId);
    }

    const fetchDataAndSetLocation = async () => {
      setLocationStatus('loading');
      let currentPosition = DEFAULT_LOCATION;

      try {
        const position = await getCurrentPosition();
        currentPosition = position;
      } catch (error) {
        console.error('위치 정보를 가져오는 데 실패했습니다.');
      }

      try {
        const res = await api.get(
          `/api/v1/main?latitude=${currentPosition.latitude}&longitude=${currentPosition.longitude}`,
        );
        setDashboardData(res.data.data);
        setLocationStatus('success');

        if (localStorage.getItem('accessToken')) {
          try {
            const rentalRes = await mainApi.get('/api/v1/main/active-rentals');
            setActiveRentals(rentalRes.data.data.activeRentals);
          } catch (err) {
            console.warn('활성 이용내역 조회 실패했습니다.', err);
            setActiveRentals([]);
          }
        }
      } catch (e) {
        setLocationStatus('error');
        setDashboardData(null);
        console.error('대시보드 데이터를 불러오는 데 실패했습니다.');
      }
    };

    fetchDataAndSetLocation();
  }, [location]);

  // 공지사항 자동 롤링
  useEffect(() => {
    if (!dashboardData || dashboardData.latestNotices.length === 0) return;

    const interval = setInterval(() => {
      setCurrentNoticeIndex((prevIndex) =>
        prevIndex === dashboardData.latestNotices.length - 1
          ? 0
          : prevIndex + 1,
      );
    }, 2000);

    return () => clearInterval(interval);
  }, [dashboardData]);

  return (
    <>
      <Header />
      <MainContainer>
        {locationStatus === 'loading' && (
          <div style={{ textAlign: 'center', padding: '230px 0' }}>
            <ClipLoader size={50} color="var(--main-color)" />
            <p style={{ marginTop: '5px' }}>위치 정보를 가져오는 중입니다...</p>
          </div>
        )}

        {locationStatus === 'error' && (
          <LoadingText>위치 정보를 불러올 수 없습니다.</LoadingText>
        )}

        {locationStatus === 'success' && dashboardData && (
          <>
            <RentalItemList>
              {localStorage.getItem('accessToken') &&
                activeRentals.length > 0 &&
                activeRentals.map((item, idx) => (
                  <RentalItemCard key={idx}>
                    <ItemTitle>{item.productName}</ItemTitle>
                    <ItemTime>
                      <p>{`${item.rentalTimeHour}시간 / 대여 중`}</p>
                      <TimeBar />
                    </ItemTime>
                  </RentalItemCard>
                ))}
            </RentalItemList>

            <EventBoxWrapper>
              {dashboardData.events.length > 0 ? (
                <EventSlider>
                  <EventItem
                    onClick={() =>
                      navigate(`/events/${dashboardData.events[0].id}`)
                    }
                  >
                    <img
                      src={dashboardData.events[0].bannerImage}
                      alt="event banner"
                    />
                  </EventItem>
                </EventSlider>
              ) : (
                <EventItem>진행 중인 이벤트 없음</EventItem>
              )}
            </EventBoxWrapper>

            <SectionTitle>주변 스테이션 찾기</SectionTitle>
            <MapBox onClick={() => navigate('/station-map')}>
              <NaverMap />
            </MapBox>

            <NoticeWrapper>
              <NoticeList index={currentNoticeIndex}>
                {dashboardData.latestNotices.map((notice) => (
                  <NoticeItem
                    key={notice.id}
                    onClick={() => navigate(`/notices/${notice.id}`)}
                  >
                    {notice.title}
                  </NoticeItem>
                ))}
              </NoticeList>
            </NoticeWrapper>
          </>
        )}
      </MainContainer>
      <StyledButton>
        <button
          style={{ backgroundColor: 'var(--side-color-2)' }}
          onClick={handleReturnClick}
        >
          <span>반납</span>
        </button>
        <button
          style={{ backgroundColor: 'var(--main-color)' }}
          onClick={handleRentalClick}
        >
          <span>대여</span>
        </button>
      </StyledButton>

      {isOpen && (
        <Modal
          title="로그인 페이지 이동"
          onClose={() => setIsOpen(false)}
          buttons={[
            <ConfirmButton key="confirm" onClick={() => navigate('/login')}>
              이동
            </ConfirmButton>,
            <CancelButton key="cancel" onClick={() => setIsOpen(false)}>
              취소
            </CancelButton>,
          ]}
        >
          <p>로그인이 필요한 기능입니다.</p>
        </Modal>
      )}
    </>
  );
}

export default MainPage;
