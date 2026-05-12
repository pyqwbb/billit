import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import api from '../../api/axiosInstance';
import styled from 'styled-components';
import HeaderMain from '../../components/header/HeaderMain';
import HeaderStation from '../../components/header/HeaderStation';
import ClipLoader from 'react-spinners/ClipLoader';

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
  margin: 14px 0;
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
  color: ${({ selected }) =>
    selected ? 'var(--side-color-4)' : 'var(--side-color-3)'};
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
  background-color: var(--side-color-1);
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

const RentalItemsPage = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState('전체');
  const [products, setProducts] = useState([]);
  const location = useLocation();
  const from = location.state?.from || 'menu';
  const stationId = location.state?.stationId;
  const [stationData, setStationData] = useState(null);
  const [loading, setLoading] = useState(true);

  const safeProducts = Array.isArray(products) ? products : [];

  const filtered =
    selected === '전체'
      ? safeProducts
      : safeProducts.filter((p) => p.category === selected);

  const categories = ['전체', ...new Set(safeProducts.map((p) => p.category))];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let response;

        if (from === 'menu') {
          response = await api.get('/api/v1/products');
          setProducts(response.data.data.products);
        } else if (from === 'location' && stationId) {
          const stationsRes = await api.get(`/api/v1/stations/${stationId}`);
          setStationData(stationsRes.data.data);
          console.log(stationsRes.data.data);
          response = await api.get(`/api/v1/stations/${stationId}/products`);
          setProducts(response.data.data.stationProducts);
        }
      } catch (err) {
        console.error('상품을 불러오는 데 실패했습니다.', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [from, stationId]);

  return loading ? (
    <div style={{ textAlign: 'center', padding: '230px 0' }}>
      <ClipLoader size={50} color="var(--main-color)" />
      <p style={{ marginTop: '5px' }}>불러오는 중...</p>
    </div>
  ) : (
    <>
      {from === 'menu' ? (
        <HeaderMain />
      ) : (
        <HeaderStation
          stname={stationData.name}
          status={stationData.status}
          time={`${stationData.openTime}~${stationData.closeTime}`}
        />
      )}

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
          {filtered.map((product) => (
            <ProductCard
              key={product.name}
              onClick={() =>
                navigate(`/rental-items/${product.name}`, {
                  state: { from: 'location', stationId: stationId },
                })
              }
            >
              <ProductImage src={product.image} alt={product.name} />
              <ProductInfo>
                <ProductName>{product.name}</ProductName>
                {!product.stock ? (
                  <ProductStock></ProductStock>
                ) : (
                  <ProductStock>
                    잔여수량&nbsp;{product.stock && <p>{product.stock}</p>}개
                  </ProductStock>
                )}
                <ProductPrice>
                  <span style={{ color: 'var(--main-color)' }}>
                    {product.pricePerHour.toLocaleString()}
                  </span>
                  원<p>/시간</p>
                </ProductPrice>
              </ProductInfo>
            </ProductCard>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default RentalItemsPage;
