import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../../api/axiosInstance';
import ClipLoader from "react-spinners/ClipLoader";

function KakaoCallbackPage() {
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URL(window.location.href).searchParams;
    const authorizationCode = urlParams.get('code');
    if (authorizationCode) {
      getToken (authorizationCode);
    }
  }, []);

  const getToken = async (code) => {
    try {
      const response = await api.post(
        '/api/v1/auth/login/kakao',
        { authorizationCode: code },
        { withCredentials: true }
      );

      const data = response.data;
      if (data.type === 'LOGIN_SUCCESS') {
        localStorage.setItem('accessToken', data.accessToken);
        localStorage.setItem('provider', 'KAKAO');

        // 로그인 성공 후 리다이렉트
        const redirect = new URLSearchParams(window.location.search).get('redirect');
        navigate(redirect || '/');
      }
      else if (data.type === 'REGISTRATION_REQUIRED') {
        const userInfoKey = data.userInfoKey;
        navigate('/terms-agreement', { state: { userInfoKey } });
      }
    } catch (err) {
      alert('카카오 로그인 처리 중 오류 발생');
      console.error(err);
    }
  };

  return (
    <div style={{ textAlign: 'center', padding: '230px 0' }}>
      <ClipLoader size={50} color='var(--main-color)' />
      <p style={{marginTop:'5px'}}>카카오 로그인 중...</p>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default KakaoCallbackPage;
