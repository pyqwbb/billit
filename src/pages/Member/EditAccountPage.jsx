import styled from 'styled-components';
import { useEffect, useState } from 'react';
import api from '../../api/axiosInstance';
import { useNavigate } from 'react-router-dom';
import imageCompression from 'browser-image-compression';
import HeaderGradient from '../../components/header/HeaderGradient';
import defaultImg from '/images/default-profile.svg';

const Container = styled.div`
  padding: 16px;
`;

const Header = styled.div`
  text-align: center;
  position: relative;
`;

const ProfileImage = styled.img`
  width: 146px;
  height: 146px;
  margin: 23px 0 13px 0;
  border-radius: 50%;
`;

const ProfileName = styled.div`
  font-size: 24px;
  font-family: 'NanumSquareRoundOTFEB';
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-end;
  gap: 4px;
  span {
    color: var(--main-color-ver2);
  }
  button {
    border: none;
    background-color: var(--side-color-1);
    font-size: 12px;
    font-family: 'NanumSquareRoundOTFR';
    color: var(--side-color-3);
    padding: 8px;
    cursor: pointer;
    border: 1px solid var(--side-color-3);
    border-radius: 10px;
    width: 65px;
  }
`;

const NicknameInput = styled.input`
  width: ${({ length }) => `${length+2 || 1}rem`};
  padding: 4px 6px;
  box-sizing: content-box;
  font-size: 24px;
  border: none;
  border-bottom: 1px solid #ccc;
  outline: none;
  text-align: center;
  color: var(--main-color-ver2);
  font-family: 'NanumSquareRoundOTFEB';
  background-color: transparent;
`;

const AccountInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 185px;
  gap: 13px;
  font-size: 16px;
  font-family: 'NanumSquareRoundOTFEB';
  button {
    font-family: 'NanumSquareRoundOTFEB';
    width: 290px;
    margin: 0 auto;
    background-color: var(--main-color);
    border-radius: 30px;
    border: none;
    height: 52px;
    font-size: 18px;
    text-align: center;
    line-height: 52px;
  }
`;

function EditAccountPage() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: '',
    nickname: '',
    profileImage: '',
  });
  const [originalNickname, setOriginalNickname] = useState('');
  const [isDuplicateChecked, setIsDuplicateChecked] = useState(false);
  const [newProfileImageUrl, setNewProfileImageUrl] = useState(null);

  const handleSave = async () => {
    if (user.nickname !== originalNickname && !isDuplicateChecked) {
      alert('닉네임 중복확인을 해주세요.');
      return;
    }

    try {
      await api.patch('/api/v1/users/profile', {
        newProfileImage: newProfileImageUrl,
        newNickname: user.nickname,
      });
      alert('수정 완료!');
      navigate('/account-settings');
    } catch (error) {
      console.error('프로필 수정 실패:', error);
      alert('프로필 수정에 실패했습니다. 다시 시도해주세요.');
    }
  };

  const handleDuplicateCheck = async () => {
    try {
      const response = await api.get(`/api/v1/users/nicknames/${encodeURIComponent(user.nickname)}/availability`);
      if (response.data.data.available) {
        alert('사용 가능한 닉네임입니다.');
        setIsDuplicateChecked(true);
      } else {
        alert('이미 사용 중인 닉네임입니다.');
        setIsDuplicateChecked(false);
      }
    } catch (error) {
      alert('닉네임 중복체크 중 오류 발생');
      setIsDuplicateChecked(false);
    }
  };

  const handleImageChange = async (event) => {
    const originalFile = event.target.files[0];
    if (!originalFile) return;

    try {
      // 1. 압축 옵션 설정
      const options = {
        maxSizeMB: 0.5,           // 최대 파일 크기 (MB)
        maxWidthOrHeight: 1024,   // 최대 가로/세로 크기
        useWebWorker: true,       // 웹워커 사용 (UI block 방지)
        fileType: 'image/webp',   // 변환할 포맷
        initialQuality: 0.3       // 압축 품질 (0~1)
      };

      // 2. 이미지 압축 + WebP 변환
      const compressedFile = await imageCompression(originalFile, options);

      // 3. presigned URL 요청
      const presignedResponse = await api.get('/api/v1/users/profile-image/pre-signed?extension=webp');
      const presignedUrl = presignedResponse.data.data.preSignedUrl;

      // 4. presigned URL로 업로드
      const response = await fetch(presignedUrl, {
        method: 'PUT',
        headers: { 'Content-Type': 'image/webp' },
        body: compressedFile
      });

      if (!response.ok) throw new Error(`Upload failed: ${response.status}`);

      // 5. 업로드 성공 후 URL 저장
      const imageUrl = presignedUrl.split('?')[0];
      setNewProfileImageUrl(imageUrl);

      // 6. 미리보기
      const previewUrl = URL.createObjectURL(compressedFile);
      setUser(prev => ({ ...prev, profileImage: previewUrl }));
    } catch (error) {
      console.error('이미지 업로드 실패:', error);
      alert('이미지 업로드에 실패했습니다.');
    }
  };

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await api.get('/api/v1/users/me');
        const { email, nickname, profileImage } = response.data.data;
        setUser({ email, nickname, profileImage });
        setOriginalNickname(nickname);
        setIsDuplicateChecked(true);
      } catch (error) {
        console.error('사용자 정보 가져오기 실패:', error);
      }
    };

    fetchUserInfo();
  }, []);

  return (
    <>
      <HeaderGradient title="내 정보 수정" backPath='/account-settings'/>
      <Container>
        <Header>
          <label htmlFor="profileImageInput">
            <ProfileImage src={user.profileImage ? user.profileImage : defaultImg} alt="프로필 이미지" />
          </label>
          <input
            id="profileImageInput"
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={handleImageChange}
          />
          <ProfileName>
            <div style={{width:'65px'}}/>
            <NicknameInput 
              value={user.nickname} 
              length={user.nickname.length}
              onChange={(e) => {
                const newNickname = e.target.value;
                setUser((prev) => ({ ...prev, nickname: newNickname }));
                setIsDuplicateChecked(newNickname === originalNickname);
              }} 
            />
            <button onClick={handleDuplicateCheck}>중복확인</button>
          </ProfileName>
        </Header>

        <AccountInfo>
            <button onClick={handleSave}>수정 완료</button>
        </AccountInfo>
      </Container>
    </>
  );
}

export default EditAccountPage;
