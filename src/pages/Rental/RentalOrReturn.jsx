import styled from "styled-components";
import logo from "../../assets/billit.png";
import { useNavigate } from "react-router-dom";

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
    font-size: 24px;

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

  return (
    <Container>
      <Logo src={logo} alt="logo"/>

      <WelcomeText>
      <p>빌릿에 오신 걸 환영합니다!</p>
      <p>궁금한 게 있다면 가이드를 확인해보세요!</p>
      </WelcomeText>

      <StyledButton>
        <button style={{backgroundColor: 'var(--main-color)', paddingBottom: '45px'}} onClick={() => navigate('/qr-scan/rental')}>
          <span style={{ marginTop: 'auto' }}>대여</span>
        </button>
        <button style={{backgroundColor: 'var(--side-color-2)', paddingBottom: '45px'}} onClick={() => navigate('/qr-scan/return')}>
          <span style={{ marginTop: 'auto' }}>반납</span>
        </button>
      </StyledButton>

      <a>이용 가이드 링크</a>

      <StyledFooter>
        <p>© 2025 billit. All rights reserved.</p>
        <p>Powered by Prienz.</p>
      </StyledFooter>
    </Container>
  );
}

export default RentalOrReturn;
