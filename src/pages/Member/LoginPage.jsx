import styled from 'styled-components';
import logo from '../../assets/billit.png';
import kakao from '../../assets/kakao-login.png';
import google from '../../assets/google-login.png';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh; 
  gap: 2px;
  text-align: center;
  align-items: center;
  p {
    font-family: 'NanumSquareRoundOTFB';
    font-size: 14px;
    margin: 61px;
  }
`;

const SocialLogin = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  p {
    font-family: 'NanumSquareRoundOTFR';
    font-size: 12px;
    margin: 12px;
  }
`;

const Divider = styled.div`
  width: 100%;
  text-align: center;
  border-bottom: 1px solid var(--side-color-3);
  line-height: 0;
  margin: 12px 0 20px;
  span {
    background: #fff;
    padding: 0 10px;
    font-size: 12px;
    color: black;
  }
`;

const Logo = styled.img`
  margin-top: -40px;
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

  const handleGoogleLogin = () => {
    const baseUrl = 'https://accounts.google.com/o/oauth2/v2/auth';
    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
    const redirectUri = import.meta.env.VITE_GOOGLE_REDIRECT_URI;

    const params = new URLSearchParams({
      client_id: clientId,
      redirect_uri: redirectUri,
      response_type: 'code',
      scope: 'email profile',
      access_type: 'offline',
      prompt: 'consent'
    });

    window.location.href = `${baseUrl}?${params.toString()}`;    
  };

  return (
    <Container>
        <Logo src={logo}/>
        <p>3초 만에 가입하고,<br/>필요한 물품 바로 대여해보세요!</p>

        <SocialLogin>
            <Divider><span>소셜 로그인으로 이용하기</span></Divider>
            <img src={kakao} onClick={handleKakaoLogin}/>
            <img src={google} onClick={handleGoogleLogin}/>
        </SocialLogin>
    </Container>
  );
}

export default LoginPage;
