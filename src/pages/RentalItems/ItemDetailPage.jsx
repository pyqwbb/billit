import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import Header from '../../components/header/HeaderStation';
import HeaderBack from '../../components/header/HeaderBack';

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
  const [itemData, setItemData] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/v1/products/${productName}`);
        setItemData(response.data.data);
      } catch (err) {
        setError('상품 정보를 불러오는 데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    }
    fetchItem();
  }, [productName]);

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>{error}</div>;
  if (!itemData) return null; 

  return (
    <>
      { !itemData.stock ? (
        <HeaderBack />
      ) : (
        <Header stname = '건국대학교 제1학생회관' state = '영업중' time = '08:00~22:00'/>
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
        <StationButton onClick={() => { navigate('/available-list');}}>대여 가능 스테이션 보기</StationButton>
      </Container>
    </>
  );
}

export default ItemDetailPage;
