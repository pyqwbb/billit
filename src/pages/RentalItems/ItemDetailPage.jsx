import { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import api from '../../api/axiosInstance';
import styled from 'styled-components';
import Header from '../../components/header/HeaderStation';
import HeaderBack from '../../components/header/HeaderBack';
import Cookies from 'js-cookie';

const Container = styled.div`
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Image = styled.img`
  width: 330px;
  aspect-ratio: 1 / 1;
  border-radius: 8px;
  background-color: var(--side-color-1);
`;

const Title = styled.h2`
  margin-top: 16px;
  margin-left: 45px;
  font-size: 24px;
  font-family: 'NanumSquareRoundOTFEB';
  width: 360px;
`;

const Category = styled.div`
  margin-top: 8px;
  margin-left: 45px;
  font-size: 16px;
  font-family: 'NanumSquareRoundOTFR';
  color: #888;
  width: 360px;
`;

const Desc = styled.p`
  font-size: 16px;
  color: #000;
  margin: 16px;
  line-height: 1.5;
  font-family: 'NanumSquareRoundOTFR';
`;

const Price = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  font-size: 32px;
  padding-top: 40px;
  padding-bottom: 23px;
  padding-right: 20px;
  border-bottom: solid 1px #545F71;
  width: 360px;
`;

const Price1 = styled.div`
  margin-top: 16px;
  font-family: 'NanumSquareRoundOTFB';
`;

const Price2 = styled.div`
  margin-top: 16px;
  font-family: 'NanumSquareRoundOTFR';
`;

const StationButton = styled.button`
  margin-top: 24px;
  padding: 12px;
  width: 361px;
  height: 52px;
  background: var(--main-color);
  border: none;
  border-radius: 30px;
  cursor: pointer;
  font-size: 16px;
  font-family: 'NanumSquareRoundOTFB';
`;

function ItemDetailPage() {
  const navigate = useNavigate();
  const { productName } = useParams();
  const location = useLocation();
  const from = location.state?.from || 'menu';
  const stationId = location.state?.stationId;
  const [itemData, setItemData] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const selectStation = JSON.parse(Cookies.get('selectStation') || '{}');
  console.log(selectStation.name);


  useEffect(() => {
    const fetchItem = async () => {
      try {
        let response;
        if (from === 'location' && stationId) {
          response = await api.get(`/api/v1/stations/${stationId}/products/${productName}`);
        } else {
          response = await api.get(`/api/v1/products/${productName}`);
        }
        setItemData(response.data.data);
      } catch (err) {
        setError('상품 정보를 불러오는 데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    }
    fetchItem();
  }, [from, stationId, productName]);

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>{error}</div>;
  if (!itemData) return null; 

  return (
    <>
      { !itemData.stock ? (
        <HeaderBack />
      ) : (
        <Header stname={selectStation.name} status={selectStation.status} time={`${selectStation.openTime}~${selectStation.closeTime}`}/>
      )}
      <Container>
        <Image src={itemData.image} alt={itemData.name} />
        <Title>{itemData.name}</Title>
        { !itemData.stock ? (
          <Category></Category> 
        ) : (
          <Category>잔여수량&nbsp;{itemData.stock}개</Category>
        )}   
        <Price>
          <Price1><span style={{color: '#53CF38'}}>{itemData.pricePerHour.toLocaleString()}</span>원</Price1>
          <Price2>/ 시간</Price2>
        </Price>
        <Desc>{itemData.description}</Desc>
        { !itemData.stock ? (
          <StationButton onClick={() => navigate(`/rental-items/${productName}/station`, { state: { itemData } })}>
            대여 가능 스테이션 보기
          </StationButton>
        ) : (
          <div />
        )}
      </Container>
    </>
  );
}

export default ItemDetailPage;
