import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import styled from 'styled-components';
import Header from '../../components/header/HeaderSub';
import CompleteIcon from '../../assets/icon/complete.svg';
import api from '../../api/axiosInstance';
import ClipLoader from "react-spinners/ClipLoader";

const Container = styled.div`
  padding: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MainText = styled.p`
  font-size: 24px;
  font-family: 'NanumSquareRoundOTFEB';
  margin-top: 21px;
  margin-bottom: 9px;
`;

const SubText = styled.p`
  font-size: 16px;
  font-family: 'NanumSquareRoundOTFR';
`;

const Icon = styled.img`
  margin-top: 100px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 80px 0 40px;
  width: 100%;
`;

const Button = styled.button`
  width: 100%;
  max-width: 360px;
  padding: 12px 0;
  margin-top: 80px;
  background-color: var(--main-color);
  border: none;
  border-radius: 30px;
  cursor: pointer;
  font-size: 19px;
  font-family: 'NanumSquareRoundOTFB';
  box-sizing: border-box;
`;

function PackageReturnCompletePage() {
  const navigate = useNavigate();
  // sessionInfoKey 대신 rentalHistroyToken 직접 사용
  const rentalHistoryToken = sessionStorage.getItem('rentalHistoryToken');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!rentalHistoryToken) {
      console.error('필수 반납 데이터 없음');
      navigate('/payment-failed');
      return;
    }

    const handleComplete = async () => {
      try {
        await completeReturn();
        sessionStorage.removeItem('rentalHistoryToken');
        setLoading(false);
      } catch (err) {
        console.error('반납 실패:', err);
        navigate('/payment-failed');
      }
    };

    handleComplete();
  }, []);

  const completeReturn = async () => {
    try {
      await api.post(`/api/v1/returns/products/packages`, {
        rentalHistoryToken: rentalHistoryToken,
      });
    } catch (err) {
      console.error("반납 실패:", err);
    }
  };

  if (loading) {
    return (
        <div style={{textAlign: 'center', padding: '230px 0'}}>
          <ClipLoader size={50} color='var(--main-color)'/>
          <p style={{marginTop: '5px'}}>
            불러오는 중...
          </p>
        </div>
    );
  }

  return (
      <>
        <Header/>
        <Container>
          <Icon src={CompleteIcon}/>
          <MainText>반납 완료</MainText>
          <SubText>필요할 땐 언제든, 다시 찾아주세요!</SubText>
          <ButtonWrapper>
            <Button onClick={() => navigate('/')}>홈으로</Button>
          </ButtonWrapper>
        </Container>

      </>
  );
}

export default PackageReturnCompletePage;