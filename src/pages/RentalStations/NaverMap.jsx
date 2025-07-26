import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import LocationCard from './LocationCard';
import styled from 'styled-components';
import { getCurrentPosition } from '../../utils/geolocation';
import api from '../../api/axiosInstance';

const LocationCardWrapper = styled.div`
  position: fixed;
  bottom: 0px;
  left: 50%;
  transform: translate(-50%, 0);
  z-index: 10;
  touch-action: none;
  transition: transform 0.3s ease;
  will-change: transform;
  width: 100%;
  max-width: 400px;
`;

function NaverMap() {
  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const [stations, setStations] = useState([]);
  const [selected, setSelected] = useState(false);
  const [selectedStationId, setSelectedStationId] = useState(null);

  const location = useLocation();

  const [userLocation, setUserLocation] = useState(null); // 사용자 위치 상태

  const [startY, setStartY] = useState(null);
  const [dragY, setDragY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const wrapperRef = useRef(null);

  const isStationMapPage = location.pathname === '/station-map';

  const handleTouchStart = (e) => {
    if (e.touches.length === 1) {
      setStartY(e.touches[0].clientY);
      setIsDragging(true);
    }
  };

  const handleTouchMove = (e) => {
    if (!isDragging || startY === null) return;

    const currentY = e.touches[0].clientY;
    const deltaY = currentY - startY;

    if (deltaY > 0) {
      setDragY(deltaY);
      wrapperRef.current.style.transform = `translate(-50%, ${deltaY}px)`;
      e.preventDefault(); // 아래로 스크롤 막기
    }
  };

  const handleTouchEnd = () => {
    if (dragY > 100) {
      setSelected(false);
    } else {
      if (wrapperRef.current) {
        wrapperRef.current.style.transform = `translate(-50%, 0)`;
      }
    }

    setStartY(null);
    setDragY(0);
    setIsDragging(false);
  };

  // 사용자 위치 가져오기
  useEffect(() => {
    getCurrentPosition()
      .then(({ latitude, longitude }) => {
        setUserLocation({ latitude, longitude });
      })
      .catch((error) => {
        console.error('사용자 위치 가져오기 실패:', error);
        // 실패 시 기본 위치 지정
        setUserLocation({ latitude: 37.542053, longitude: 127.078192 }); 
      });
  }, []);

  // 스테이션 데이터 불러오기
  useEffect(() => {
    if (!userLocation) return; // 위치 받아오기 전까지 대기

    const fetchStations = async () => {
      try {
        const response = await api.get('/api/v1/stations');
        setStations(response.data.data.stations);
      } catch (error) {
        console.error('스테이션 데이터 불러오기 실패:', error);
      }
    };
    fetchStations();
  }, [userLocation]);

  // 네이버 지도 로드 및 마커 렌더링
  useEffect(() => {
    if (!userLocation || stations.length === 0) return;

    const clientId = import.meta.env.VITE_NAVER_MAP_CLIENT_ID;
    if (!clientId) {
      console.error('Naver Map API key is missing!');
      return;
    }

    const script = document.createElement('script');
    script.src = `https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${clientId}`;
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      if (!window.naver || !mapRef.current) return;
      const naver = window.naver;

      const map = new naver.maps.Map(mapRef.current, {
        center: new naver.maps.LatLng(userLocation.latitude, userLocation.longitude),
        zoom: 16,
      });

      stations.forEach((station) => {
        const marker = new naver.maps.Marker({
          position: new naver.maps.LatLng(station.latitude, station.longitude),
          map,
          icon: {
            url: `/marker/open.png`,
            size: new naver.maps.Size(30, 43),
            origin: new naver.maps.Point(0, 0),
            anchor: new naver.maps.Point(22.5, 64),
          },
        });

        markerRef.current = marker;

        naver.maps.Event.addListener(marker, 'click', () => {
          if (!isStationMapPage) return;

          setSelected(true);
          setSelectedStationId(station.stationId);
          marker.setIcon({
            url: `/marker/active.png`,
            size: new naver.maps.Size(45, 64),
            origin: new naver.maps.Point(0, 0),
            anchor: new naver.maps.Point(25, 70),
          });
        });
      });
    };

    return () => {
      document.head.removeChild(script);
    };
  }, [userLocation, stations, location.pathname]);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100vh' }}>
      <div ref={mapRef} style={{ width: '100%', height: '100%' }} />
      {selected && (
        <LocationCardWrapper
          ref={wrapperRef}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <LocationCard stationId={selectedStationId}/>
        </LocationCardWrapper>
      )}
    </div>
  );
}

export default NaverMap;
