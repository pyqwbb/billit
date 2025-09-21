import { useEffect, useRef, useState } from 'react';
import jsQR from 'jsqr';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../../components/header/HeaderGradient';
import styled from 'styled-components';
import api from '../../api/axiosInstance';
import Modal, { ConfirmButton, CancelButton } from '../../utils/Modal';

const PageWrapper = styled.div`
  position: relative;
  width: 100vw;
  max-width: 400px;
  height: 100vh;
  overflow: hidden;
  background: #000;
`;

const ScannerContainer = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Overlay = styled.div`
  position: absolute;
  width: 100%;
  z-index: 10;
  top: 0;
  left: 0;
`;

const QRScanNoti = styled.div`
  position: absolute;
  top: 150px;
  width: 100%;
  p {
    font-family: 'NanumSquareRoundOTFB';
    color: var(--main-color);
    font-size: 16px;
    text-align: center;
  }
`;

const QRScanInfo = styled.div`
  width: 100%;
  height: 100vh;
  margin-top: 510px;
  padding: 16px;
  font-size: 14px;
  font-family: 'NanumSquareRoundOTFR';
  color: var(--side-color-4);
  background-color: rgba(213, 218, 228, 0.7);
  border-radius: 30px 30px 0 0;
  backdrop-filter: blur(5px);
  ul {
    margin-top: 16px;
    list-style-type: disc;
    padding-left: 20px;
    li {
      margin-bottom: 5px;
      height: 22px;
    }
  }
`;

const QrFocusBox = styled.div`
  position: absolute;
  top: 250px;
  left: 50%;
  transform: translateX(-50%);
  width: 250px;
  height: 250px;
  z-index: 15;
  pointer-events: none;

  .corner {
    position: absolute;
    width: 50px;
    height: 50px;
    border-color: var(--main-color);
    border-style: solid;
    border-width: 0;
  }

  .top-left {
    top: 0;
    left: 0;
    border-top-width: 5px;
    border-left-width: 5px;
    border-top-left-radius: 30px;
  }

  .top-right {
    top: 0;
    right: 0;
    border-top-width: 5px;
    border-right-width: 5px;
    border-top-right-radius: 30px;
  }

  .bottom-left {
    bottom: 0;
    left: 0;
    border-bottom-width: 5px;
    border-left-width: 5px;
    border-bottom-left-radius: 30px;
  }

  .bottom-right {
    bottom: 0;
    right: 0;
    border-bottom-width: 5px;
    border-right-width: 5px;
    border-bottom-right-radius: 30px;
  }
`;

function QrScanPage() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const navigate = useNavigate();
  const { type } = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const [stationName, setStationName] = useState('');
  const [mode, setMode] = useState(type);

  const prefixes = [
    "CHR_", // 충전기
    "CAB_", // 케이블
    "HUB_", // 허브
    "PWB_", // 보조 배터리
    "MOU_", // 마우스
    "KEY_", // 키보드
    "STD_", // 노트북 스탠드
    "ETC_", // 기타
  ];

  useEffect(() => {
    let animationId;

    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
        const video = videoRef.current;
        video.srcObject = stream;
        video.setAttribute('playsinline', true);
        await video.play();

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        const scan = async () => {
          if (video.readyState === video.HAVE_ENOUGH_DATA) {
            canvas.height = video.videoHeight;
            canvas.width = video.videoWidth;
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const code = jsQR(imageData.data, imageData.width, imageData.height);

            if (code) {
              const data = code.data.trim();

              // 스테이션 QR
              if (data.includes("stationId=") && mode === 'station') {
                const url = new URL(data);
                const stationId = url.searchParams.get("stationId");

                if (stationId) {
                  sessionStorage.setItem('scannedQrNumber', stationId);

                  try {
                    const response = await api.get(`/api/v1/stations/${stationId}`);
                    setStationName(response.data.data.name);
                    setIsOpen(true);
                    setMode(sessionStorage.getItem('rentalProcessType'));
                    return;
                  } catch (err) {
                    console.error('스테이션 정보를 불러오는 데 실패했습니다.', err);
                  }
                } else {
                  console.error('stationId 파라미터 없음:', data);
                }

              // 대여 물품 QR  
              } else if (prefixes.some(prefix => data.startsWith(prefix)) && (mode !== "station")) {
                sessionStorage.setItem('scannedQrCode', data);

                 if (mode === "rental") {
                   navigate("/rental-time");
                 } else if (mode === "return") {
                   navigate("/return");
                 }
              } else {
                console.error('잘못된 코드:', data);
              }
            }
          }

          animationId = requestAnimationFrame(scan);
        };

        scan();
      } catch (error) {
        console.error('카메라 접근 실패:', error);
      }
    };

    startCamera();

    return () => {
      cancelAnimationFrame(animationId);
      if (videoRef.current?.srcObject) {
        videoRef.current.srcObject.getTracks().forEach(track => track.stop());
      }
    };
  }, [navigate]);

  return (
    <PageWrapper>
      <ScannerContainer>
        <video
          ref={videoRef}
          playsInline
          muted
          autoPlay
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <canvas ref={canvasRef} style={{ display: 'none' }} />
      </ScannerContainer>

      <QrFocusBox>
        <div className="corner top-left" />
        <div className="corner top-right" />
        <div className="corner bottom-left" />
        <div className="corner bottom-right" />
      </QrFocusBox>

      <Overlay>
        <Header 
          title={
            type === 'station'
              ? '스테이션 QR 스캔'
              : type === 'rental' || type === 'return'
              ? '물품 QR 스캔'
              : ''
          }
        />
        <QRScanNoti>
          <p>
            {type === 'station'
              ? '스테이션에 비치된 QR을 스캔해주세요'
              : type === 'rental' || type === 'return'
              ? '물품에 부착된 QR을 스캔해주세요'
              : ''}
          </p>
        </QRScanNoti>
        <QRScanInfo>
          <ul>
            <li>빛이 적절하게 있는 환경에서 촬영해주세요.</li>
            <li>QR 코드가 빛에 반사되지 않도록 주의해주세요.</li>
            <li>너무 어두운 환경에서는 플래시를 사용해 촬영해주세요.</li>
          </ul>
        </QRScanInfo>
      </Overlay>

      {isOpen && (
        <Modal
          title="스테이션 확인"
          onClose={() => setIsOpen(false)}
          buttons={[
            <ConfirmButton
              key="confirm"
              onClick={() => {
                const processType = sessionStorage.getItem('rentalProcessType');
                navigate(`/qr-scan/${processType}`);
                setIsOpen(false);
              }}
            >
              확인
            </ConfirmButton>,
            <CancelButton key="cancel" onClick={() => setIsOpen(false)}>취소</CancelButton>
          ]}
        >
          <p>
            {stationName}에서{' '}
            {sessionStorage.getItem('rentalProcessType') === 'rental' ? '대여' : '반납'}
            합니다.
          </p>
        </Modal>
      )}
    </PageWrapper>
  );
}

export default QrScanPage;
