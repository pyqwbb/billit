import styled from 'styled-components';
import logo from '../../assets/billit.png';
import kakao from '../../assets/kakao-login.png';
import google from '../../assets/google-login.png';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  text-align: center;
  align-items: center;
  p {
    font-family: 'NanumSquareRoundOTFR';
    font-size: 14px;
    margin: 61px;
  }
`;

const LoginForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  input {
    width: 288px;
    font-family: 'NanumSquareRoundOTFR';
    border: none;
    font-size: 14px;
    border-bottom: 1px solid #000;
    border-radius: 0px;
    margin-bottom: 24px;
    padding-bottom: 7px;
  }
`;

const LoginButton = styled.button`
  width: 289px;
  height: 52px;
  border: none;
  border-radius: 30px;
  background-color: var(--main-color);
  font-size: 15px;
  font-family: 'NanumSquareRoundOTFB';
`;

const RegisterButton = styled.button`
  width: 30%;
  padding: 17px;
  color: var(--side-color-3);
  font-family: 'NanumSquareRoundOTFR';
  border: none;
  background: none;
  font-size: 14px;
  display: block;
  margin: 0 auto;
  text-decoration: underline;
`;

const SocialLogin = styled.div`
  padding-top: 48px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Logo = styled.img`
  padding-top: 70px;
  width: 141px;
`;

function LoginPage() {

  const handleKakaoLogin = () => {
    const baseUrl = 'https://kauth.kakao.com/oauth/authorize';
    const clientId = import.meta.env.VITE_KAKAO_CLIENT_ID;
    const redirectUri = import.meta.env.VITE_KAKAO_REDIRECT_URI;

    const params = new URLSearchParams({
      client_id: clientId,
      redirect_uri: redirectUri,
      response_type: 'code',
      scope: 'openid,profile_nickname,profile_image,account_email',
    });

    window.location.href = `${baseUrl}?${params.toString()}`;
  };

  return (
    <Container>
        <Logo src={logo}/>
        <p>3초 만에 가입하고,<br/>필요한 물품 바로 대여해보세요!</p>

        <LoginForm>
            <input
              placeholder='아이디'
            />
            <input
              placeholder='비밀번호'
            />
            <LoginButton>로그인</LoginButton>
            <RegisterButton>회원가입</RegisterButton>
        </LoginForm>

        <SocialLogin>
            <img src={kakao} onClick={handleKakaoLogin}/>
            <img src={google}/>
        </SocialLogin>
    </Container>
  );
}

export default LoginPage;
