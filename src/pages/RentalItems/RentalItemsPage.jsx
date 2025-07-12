import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import data from '../../data/mock/items.json';

const Container = styled.div`
  padding: 16px;
`;

const CategoryScroll = styled.div`
  display: flex;
  overflow-x: auto;
  border: none;
  gap: 8px;
  margin-bottom: 14px;
`;

const CategoryButton = styled.button`
  padding: 6px 12px;
  border-radius: 40px;
  border: none;
  white-space: nowrap;
  cursor: pointer;
  width: 100%;
  font-size: 14px;
  background-color: ${({ selected }) => (selected ? '#bbb' : '#eee')};
  margin-bottom: 8px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
`;

const ProductCard = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  display-align: center;
  align-items: center;
`;

const ProductImage = styled.img`
  width: 90%; 
  aspect-ratio: 1 / 1;
  object-fit: cover;
  border-radius: 8px;
`;

const ProductInfo = styled.div`
  padding: 8px;
  margin-left: 8px;
  font-size: 13px;
  width: 100%;
`;

function RentalItemsPage() {
  const navigate = useNavigate();
  const categories = ['전체', ...new Set(data.products.map(p => p.category))];
  const [selected, setSelected] = useState('전체');

  const filtered = selected === '전체'
    ? data.products
    : data.products.filter(p => p.category === selected);

  return (
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
            onClick={() => navigate(`/rental-items/${product.productModelId}`)}>
            <ProductImage src={product.image} alt="item" />
            <ProductInfo>
              <div><strong>{product.name}</strong></div>
              <div>{product.pricePerHour}원 / 시간</div>
            </ProductInfo>
          </ProductCard>
        ))}
      </Grid>
    </Container>
  );
}

export default RentalItemsPage;
