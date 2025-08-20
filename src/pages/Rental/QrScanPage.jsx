import { useEffect, useRef, useState } from 'react';
import jsQR from 'jsqr';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/header/HeaderGradient';
import styled from 'styled-components';

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

const QRScanInfo = styled.div`
  width: 100%;
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
  const [scannedResult, setScannedResult] = useState('');
  const navigate = useNavigate();

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

        const scan = () => {
          if (video.readyState === video.HAVE_ENOUGH_DATA) {
            canvas.height = video.videoHeight;
            canvas.width = video.videoWidth;
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const code = jsQR(imageData.data, imageData.width, imageData.height);

            if (code) {
              const data = code.data.trim();
              console.log('QR 인식 성공:', data);

              // 숫자인 경우에만 처리
              if (/^\d+$/.test(data)) {
                sessionStorage.setItem('scannedQrNumber', data); // 저장
                navigate('/rental-or-return'); // 이동
              } else {
                setScannedResult(`잘못된 코드: ${data}`);
              }
              
              // 일련 코드의 경우
              if (/^SN-\d{3}-\d{3}$/.test(data)) {
                sessionStorage.setItem('scannedQrCode', data);

                const currentPath = window.location.pathname;

                if (currentPath === '/qr-scan/rental') {
                  navigate('/rental-time');
                } else if (currentPath === '/qr-scan/return') {
                  navigate('/return');
                } else {
                  console.warn('경로 인식 실패:', currentPath);
                }

                return;
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
        <Header />
        <QRScanInfo>
          <ul>
            <li>빛이 적절하게 있는 환경에서 촬영해주세요.</li>
            <li>QR 코드가 빛에 반사되지 않도록 주의해주세요.</li>
            <li>너무 어두운 환경에서는 플래시를 사용해 촬영해주세요.</li>
          </ul>
        </QRScanInfo>
      </Overlay>
    </PageWrapper>
  );
}

export default QrScanPage;
