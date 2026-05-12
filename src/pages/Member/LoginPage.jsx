import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import logo from '../../assets/billit.svg';
import kakao from '../../assets/kakao-login.svg';
import google from '../../assets/google-login.svg';

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

const SocialLogin = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;

  p {
    font-family: 'NanumSquareRoundOTFR';
    font-size: 12px;
    margin: 12px;
  }

  img {
    cursor: pointer;
  }

  #googleLogin {
    margin-bottom: 20px;
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

const TestLoginButton = styled.button`
  padding: 12px 24px;
  background-color: var(--main-color);
  border: none;
  border-radius: 20px;
  font-family: 'NanumSquareRoundOTFB';
  font-size: 14px;
  color: var(--side-color-5);
  cursor: pointer;
  width: 100%;
  height: 50px;
  max-width: 300px;
  transition: background-color 0.2s;

  &:hover {
    background-color: var(--main-color-ver2);
  }
`;

function LoginPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const handleSocialLoginClick = () => {
    alert('test 환경에서는 동작하지 않습니다.');
  };

  const handleTestLogin = () => {
    // 테스트 토큰 저장
    localStorage.setItem('accessToken', 'mock-access-token');
    const redirect = searchParams.get('redirect') || '/';
    navigate(redirect);
  };

  return (
    <Container>
      <Logo src={logo} />
      <p>
        3초 만에 가입하고,
        <br />
        필요한 물품 바로 대여해보세요!
      </p>

      <SocialLogin>
        <Divider>
          <span>소셜 로그인으로 이용하기</span>
        </Divider>
        <img src={kakao} onClick={handleSocialLoginClick} alt="kakao login" />
        <img
          src={google}
          onClick={handleSocialLoginClick}
          alt="google login"
          id="googleLogin"
        />

        <Divider>
          <span>테스트 계정으로 시작하기</span>
        </Divider>
        <TestLoginButton onClick={handleTestLogin}>
          테스트 로그인
        </TestLoginButton>
      </SocialLogin>
    </Container>
  );
}

export default LoginPage;
