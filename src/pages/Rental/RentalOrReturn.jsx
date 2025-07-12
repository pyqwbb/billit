import styled from "styled-components";
import logo from "../../assets/billit.png";
import { BiPlug , BiCabinet } from "react-icons/bi";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 0 20px 0;

  a {
    text-decoration: underline;
    font-size: 14px;
    margin-top: 20px;
    color: #555;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const Logo = styled.img`
  margin-top: 50px;
  margin-bottom: 40px;
  width: 130px;
`;

const StyledButton = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 40px;
  margin-bottom: 30px;

  button {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;
    width: 160px;
    height: 200px;
    padding: 12px 24px;
    border-radius: 30px;
    border: none;
    background-color: #dedede;
    cursor: pointer;
    transition: background-color 0.3s;
    font-size: 25px;
    font-weight: bold;

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
  margin-top: 40px;

  p {
    margin: 5px 0;
    color: #555;
    font-size: 14px;
  }
`;

function RentalOrReturn() {
  return (
    <Container>
      <Logo src={logo} alt="logo"/>

      <p>빌릿에 오신 걸 환영합니다!</p>
      <p>궁금한 게 있다면 가이드를 확인해보세요!</p>

      <StyledButton>
        <button onClick={() => alert("qr 스캔 페이지로 이동")}>
          <BiPlug style={{ fontSize: '45px'}} />
          대여
        </button>
        <button onClick={() => alert("qr 스캔 페이지로 이동")}>
          <BiCabinet style={{ fontSize: '45px' }} />
          반납
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
