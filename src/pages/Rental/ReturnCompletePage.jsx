import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  padding: 24px;
  text-align: center;
`;

const Logo = styled.div`
  width: 120px;
  height: 120px;
  background-color: #ddd;
  border-radius: 50%;
  margin: 0 auto 16px;
`;

const Box = styled.div`
  background-color: #eee;
  border-radius: 8px;
  padding: 24px;
  margin: 24px 0;
  text-align: left;
  width: 100%;
  aspect-ratio: 1 / 0.8;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const HomeButton = styled.button`
  width: 100%;
  padding: 16px;
  border-radius: 30px;
  background-color: #ddd;
  border: none;
  font-size: 16px;
`;

function ReturnCompletePage() {
  const navigate = useNavigate();

  return (
    <Container>
      <Logo/>
      <div style={{margin: "30px 0"}}>
        반납이 완료되었습니다.
      </div>
      <Box>
        <div>대여 물품 명</div>
        <div>대여한 스테이션</div>
        <div>대여 시작 시간</div>
        <div>대여 시간</div>
        <div>결제 금액</div>
      </Box>
      <HomeButton onClick={() => navigate('/')}>홈으로</HomeButton>
    </Container>
  );
}

export default ReturnCompletePage;
