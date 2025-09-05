import styled from "styled-components";
import logo from '../../assets/billit.svg';
import axios from "axios";
import {useNavigate} from "react-router-dom";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  gap: 2px;
  text-align: center;

  p {
    font-family: 'NanumSquareRoundOTFB';
    font-size: 14px;
    margin: 61px;
  }
`;

const Logo = styled.img`
  margin-top: -40px;
  width: 141px;
`;

const LoginButton = styled.button`
  width: 280px;
  padding: 16px;
  font-family: 'NanumSquareRoundOTFB';
  font-size: 16px;
  border-radius: 30px;
  background-color: var(--main-color);
  border: none;
  color: black;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
`;

const TestGuideBox = styled.div`
  width: 320px;
  background-color: var(--side-color-1);
  border-radius: 20px;
  padding: 20px;
  margin-top: 20px;
  text-align: left;

  h3 {
    font-family: 'NanumSquareRoundOTFER';
    font-size: 16px;
    margin: 0 0 16px 0;
    text-align: center;
    color: black;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;

    li {
      font-family: 'NanumSquareRoundOTFR';
      font-size: 14px;
      line-height: 1.5;
      margin-bottom: 12px;
      padding-left: 20px;
      position: relative;

      &:before {
        content: '•';
        color: black;
        position: absolute;
        left: 0;
        font-weight: bold;
      }

      &:last-child {
        margin-bottom: 0;
      }
    }
  }
`;

function TossTestLoginPage() {
  const navigate = useNavigate();
  const handleTestLogin = () => {
    const origin = import.meta.env.VITE_API_BASE_URL;
    const requestUrl = origin ? `${origin}/api/v1/toss/login`
        : 'https://billit.co.kr/api/v1/toss/login';
    axios.get(requestUrl, {
      withCredentials: true
    })
        .then(res => res.data)
        .then(data => {
          localStorage.setItem('accessToken', data.accessToken);
          localStorage.setItem('profile', 'toss');
          navigate('/rental-items');
        });
  }

  return (
      <Container>
        <Logo src={logo}/>
        <p>토스 페이먼츠 테스트 계정 로그인 페이지입니다.</p>
        <LoginButton onClick={handleTestLogin}>로그인</LoginButton>

        <TestGuideBox>
          <h3>테스트 방법</h3>
          <ul>
            <li>현재 페이지의 로그인 버튼을 클릭합니다.</li>
            <li>대여 물품 페이지에서 물품을 클릭합니다.</li>
            <li>물품 상세 페이지에서 대여하기 버튼을 클릭합니다.</li>
            <li>대여할 시간을 선택합니다. 최소 1시간,<br/> 최대 12시간으로 제한되어 있습니다.</li>
            <li>주문 확인 페이지에서 결제하기 버튼을<br/> 클릭합니다.</li>
            <li>원활한 테스트를 위해 결제 이후<br/> 즉시 반납프로세스가 진행됩니다.</li>
          </ul>
        </TestGuideBox>
      </Container>
  );
}

export default TossTestLoginPage;