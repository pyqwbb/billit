import { useState } from "react";
import styled from "styled-components";
import logo from "../../assets/billit.svg";
import { useNavigate } from "react-router-dom";
import Modal, {CancelButton, ConfirmButton} from '../../utils/Modal';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 0 20px 0;

  a {
    text-decoration: underline;
    font-family: 'NanumSquareRoundOTFR';
    font-size: 16px;
    color: #000;
  }
`;

const WelcomeText = styled.span`
  font-family: 'NanumSquareRoundOTFR';
  ont-size: 16px;
  text-align: center;
  line-height: 22px;
`;

const Logo = styled.img`
  margin-top: 50px;
  margin-bottom: 65px;
  width: 130px;
`;

const StyledButton = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 65px;
  margin-bottom: 89px;

  button {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;
    width: 160px;
    height: 200px;
    padding: 0 24px;
    border-radius: 30px;
    border: none;
    cursor: pointer;
    transition: background-color 0.3s;
    font-family: 'NanumSquareRoundOTFEB';
    font-size: 36px;

    &:hover {
      background-color: #ccc;
    }
  }
`;

const StyledFooter = styled.footer`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px;
  width: 100%;
  margin-top: 73px;

  p {
    font-size: 10px;
    font-family: 'NanumSquareRoundOTFR';
    color: #918E8E;
    line-height: 13px;
  }
`;

function RentalOrReturn() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const hasAccessToken = () => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      localStorage.setItem("redirectPath", window.location.pathname);
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

  return (
    <Container>
      <Logo src={logo} alt="logo"/>

      <WelcomeText>
      <p>빌릿에 오신 걸 환영합니다!</p>
      <p>궁금한 게 있다면 가이드를 확인해보세요!</p>
      </WelcomeText>

      <StyledButton>
        <button style={{backgroundColor: 'var(--main-color)', paddingTop: '10px'}} onClick={handleRentalClick}>
          <span style={{}}>대여</span>
        </button>
        <button style={{backgroundColor: 'var(--side-color-2)', paddingTop: '10px'}} onClick={handleReturnClick}>
          <span style={{}}>반납</span>
        </button>
      </StyledButton>

      <a onClick={() => alert("준비 중")}>이용 가이드 링크</a>
      <a 
        onClick={() => window.open('http://pf.kakao.com/_uRFKn', '_blank')}
        style={{ marginTop: '12px' }}
      >
        1:1 문의 바로가기
      </a>

      <StyledFooter>
        <p>© 2025 billit. All rights reserved.</p>
        <p>Powered by Prienz.</p>
      </StyledFooter>

      {isOpen && (
       <Modal
          title="로그인 페이지 이동"
          onClose={() => setIsOpen(false)}
          buttons={[
          <ConfirmButton key="confirm"
            onClick={() => navigate('/login')}>이동</ConfirmButton>,
            <CancelButton key="cancel" onClick={() => setIsOpen(false)}>
              취소
            </CancelButton>
          ]}
        >
          <p>로그인이 필요한 기능입니다.</p>
        </Modal>
      )}
    </Container>
  );
}

export default RentalOrReturn;
