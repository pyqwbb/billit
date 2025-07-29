import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../../api/axiosInstance';

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
      console.log('Kakao login response:', data);
      if (data.type === 'LOGIN_SUCCESS') {
        localStorage.setItem('accessToken', data.accessToken);
        alert('로그인에 성공했습니다.');
        navigate('/');
      } else if (data.type === 'REGISTRATION_REQUIRED') {
        const userInfoKey = data.userInfoKey;
        navigate('/terms-agreement', { state: { userInfoKey } });
      }
    } catch (err) {
      setError('카카오 로그인 처리 중 오류 발생');
      console.error(err);
    }
  };

  return (
    <div>
      <p>카카오 로그인 처리 중...</p>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default KakaoCallbackPage;
