import { useEffect, useRef, useState } from 'react';
import LocationCard from './LocationCard';

function NaverMap() {
  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const [selected, setSelected] = useState(false);

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
        setSelected(true);
        marker.setIcon({
          url: '/marker/active.png',
          size: new naver.maps.Size(45, 64),
          origin: new naver.maps.Point(0, 0),
          anchor: new naver.maps.Point(25, 70),
        });
      });
    };

    return () => {
      document.head.removeChild(script);
    };
  }, [location]);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100vh' }}>
      <div ref={mapRef} style={{ width: '100%', height: '100%' }} />
      {selected && (
        <div
          style={{
            position: 'fixed',
            bottom: '0px',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 10,
          }}
        >
          <LocationCard />
        </div>
      )}
    </div>
  );
}

export default NaverMap;
