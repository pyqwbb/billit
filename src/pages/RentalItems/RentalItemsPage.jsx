import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import data from '../../data/mock/items.json';
import Header from '../../components/header/HeaderMain';

const Container = styled.div`
  width: 360px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
`;

const CategoryScroll = styled.div`
  display: flex;
  overflow-x: auto;
  border: none;
  gap: 5px;
  margin-bottom: 14px;
  border-bottom: 1px solid var(--side-color-4);
`;

const CategoryButton = styled.button`
  padding: 6px 12px;
  border: none;
  background-color: #fff;
  white-space: nowrap;
  cursor: pointer;
  width: 100%;
  font-size: 16px;
  font-family: 'NanumSquareRoundOTFB';
  color: ${({ selected }) => (selected ? 'var(--side-color-4)' : 'var(--side-color-3)')};
  margin-bottom: 8px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
`;

const ProductCard = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  display-align: center;
  align-items: center;
  width: 170px;
`;

const ProductImage = styled.img`
  width: 90%; 
  aspect-ratio: 1 / 1;
  object-fit: cover;
  border-radius: 8px;
`;

const ProductInfo = styled.div`
  padding: 8px;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const ProductName = styled.span`
  font-size: 16px;
  font-family: 'NanumSquareRoundOTFB';
`;

const ProductStock = styled.span`
  font-size: 14px;
  font-family: 'NanumSquareRoundOTFR';
  display: flex;
  flex-direction: row;
  padding-bottom: 5px;
`;

const ProductPrice = styled.span`
  font-size: 16px;
  font-family: 'NanumSquareRoundOTFB';
  display: flex;
  flex-direction: row;
  justify-content: right;
  p {
    font-size: 17px;
    font-family: 'NanumSquareRoundOTFR';
  }
`;

function RentalItemsPage() {
  const navigate = useNavigate();
  const categories = ['전체', ...new Set(data.products.map(p => p.category))];
  const [selected, setSelected] = useState('전체');

  const filtered = selected === '전체'
    ? data.products
    : data.products.filter(p => p.category === selected);

  return (
    <>
    <Header/>
    <Container>
      <CategoryScroll>
        {categories.map((cat, i) => (
          <CategoryButton
            key={i}
            onClick={() => setSelected(cat)}
            selected={selected === cat}
          >
            {cat}
          </CategoryButton>
        ))}
      </CategoryScroll>

      <Grid>
        {filtered.map(product => (
          <ProductCard key={product.productModelId}
            onClick={() => navigate(`/rental-items/detail`)}>
            <ProductImage src={product.image} alt="item" />
            <ProductInfo>
              <ProductName>{product.name}</ProductName>
              <ProductStock>잔여수량&nbsp;{product.stock && <p>{product.stock}</p>}개</ProductStock>
              <ProductPrice><span style={{color: "var(--main-color)"}}>{product.pricePerHour.toLocaleString()}</span>원<p>/시간</p></ProductPrice>
            </ProductInfo>
          </ProductCard>
        ))}
      </Grid>
    </Container>
    </>
  );
}

export default RentalItemsPage;
