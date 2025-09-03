import { useEffect, useRef, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { getCurrentPosition } from '../../utils/geolocation';
import api from '../../api/axiosInstance';
import Header from '../../components/header/ItemHeader.jsx';

function AvailableMapPage() {
  const mapRef = useRef(null);
  const markerRefs = useRef([]);
  const [stations, setStations] = useState([]);
  const location = useLocation();
  const itemData = location.state?.itemData;
  const { productName } = useParams();
  const [userLocation, setUserLocation] = useState(null);

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

  // 스테이션 데이터 불러오기
  useEffect(() => {
    if (!userLocation) return;

    const fetchStations = async () => {
      try {
        const response = await api.get(`/api/v1/products/${productName}/stations`, {
          params: {
            latitude: userLocation.latitude,
            longitude: userLocation.longitude,
          },
        });
        setStations(response.data.data.content);
      } catch (error) {
        console.error(error);
      }
    };
    fetchStations();
  }, [userLocation, itemData]);

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

      markerRefs.current = [];

      stations.forEach((station) => {
        const iconUrl =  station.status === '운영 중'
          ? '/marker/open.svg'
          : '/marker/close.svg';

        const marker = new naver.maps.Marker({
          position: new naver.maps.LatLng(station.latitude, station.longitude),
          map,
          icon: {
            url: iconUrl,
            size: new naver.maps.Size(30, 43),
            origin: new naver.maps.Point(0, 0),
            anchor: new naver.maps.Point(22.5, 64),
          },
        });

        markerRefs.current.push(marker);
      });
    };

    return () => {
      document.head.removeChild(script);
    };
  }, [userLocation, stations, location.pathname]);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100vh' }}>
      <Header itemData={itemData} style={{ position: 'absolute', top: 0, left: 0, width: '100%', zIndex: 10 }} />
      <div
        ref={mapRef}
        style={{
          width: '100%',
          height: '100%',
          position: 'absolute',
          top: 0,
          left: 0,
          zIndex: 0,
        }}
      />
    </div>
  );
}

export default AvailableMapPage;
