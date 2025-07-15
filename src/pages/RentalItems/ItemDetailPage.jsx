import styled from 'styled-components';
import Header from '../../components/header/HeaderStation';

const mockProduct = {
  name: '라이트닝 충전기, 어댑터',
  image: '/images/billit-black.jpg',
  category: '보조배터리',
  description: '애플 기기 전용 충전 장비입니다. 고속 충전을 지원하며, 안정적인 전원 공급이 가능합니다.',
  pricePerHour: 1000
};

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
  const product = mockProduct;

  return (
    <>
      <Header/>
      <Container>
        <Image src={product.image} alt={product.name} />
        <Title>{product.name}</Title>
        <Category>잔여수량 3개</Category>    
        <Price>
          <Price1><span style={{color: '#53CF38'}}>{product.pricePerHour.toLocaleString()}</span>원</Price1>
          <Price2>/ 시간</Price2>
        </Price>
        <Desc>{product.description}</Desc>
        <StationButton>대여 가능 스테이션 보기</StationButton>
      </Container>
    </>
  );
}

export default ItemDetailPage;
