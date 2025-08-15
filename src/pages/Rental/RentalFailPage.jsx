import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;
  font-family: 'NanumSquareRoundOTFB';
`;

const Message = styled.p`
  font-size: 18px;
  margin-bottom: 24px;
`;

const HomeButton = styled.button`
  width: 50%;
  padding: 12px 24px;
  font-size: 16px;
  font-family: 'NanumSquareRoundOTFB';
  border-radius: 8px;
  border: none;
  background-color: var(--side-color-2);
  color: #000;
  cursor: pointer;
  &:hover {
    background-color: var(--side-color-3);
  }
`;

function RentalFailPage() {
  const navigate = useNavigate();

  return (
    <Container>
      <Message>결제 실패: 관리자에게 문의하세요.</Message>
      <HomeButton onClick={() => navigate('/')}>
        홈으로
      </HomeButton>
    </Container>
  );
}

export default RentalFailPage;