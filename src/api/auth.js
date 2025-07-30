import api from './axiosInstance';

export const refreshAccessToken = async () => {
  try {
    const response = await api.post(
      '/api/v1/auth/token/refresh',
      {},
      { withCredentials: true }
    );
    return response.data.accessToken;
  } catch (error) {
    console.error('토큰 재발급 실패:', error);
    throw error;
  }
};
