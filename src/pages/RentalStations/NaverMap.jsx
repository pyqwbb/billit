import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import LocationCard from './LocationCard';
import styled from 'styled-components';

const LocationCardWrapper = styled.div`
  position: fixed;
  bottom: 0px;
  left: 50%;
  transform: translate(-50%, 0);
  z-index: 10;
  touch-action: none;
  transition: transform 0.3s ease;
  will-change: transform;
`;

function NaverMap() {
  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const [selected, setSelected] = useState(false);
  const location = useLocation();

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

  useEffect(() => {
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
      const center = new naver.maps.LatLng(37.551940, 127.076400);

      const map = new naver.maps.Map(mapRef.current, {
        center,
        zoom: 16,
      });

      const marker = new naver.maps.Marker({
        position: new naver.maps.LatLng(37.541940, 127.076400),
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
        marker.setIcon({
          url: `/marker/active.png`,
          size: new naver.maps.Size(45, 64),
          origin: new naver.maps.Point(0, 0),
          anchor: new naver.maps.Point(25, 70),
        });
      });
    };

    return () => {
      document.head.removeChild(script);
    };
  }, [location.pathname]);

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
          <LocationCard />
        </LocationCardWrapper>
      )}
    </div>
  );
}

export default NaverMap;
