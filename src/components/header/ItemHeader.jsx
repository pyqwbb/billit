import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import HeaderMain from './HeaderMain';
import MenuDrawer from './MenuDrawer';
import { HiArrowLeft } from "react-icons/hi";

const StyledHeader = styled.header`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  background-color: rgba(213, 218, 228, 0.7);
  border-radius: 0 0 30px 30px;
`;

const ItemCard = styled.div`
  padding: 16px;
  display: flex;
  gap: 20px;
`;

const IconButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  display: flex;
  color: var(--side-color-4);
`;

const ItemImage = styled.img`
  width: 112px;
  aspect-ratio: 1 / 1;
  border-radius: 15px;
  background-color: var(--side-color-3);
`;

const ItemInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 10px;
  width: 50%;
`;

const ItemName = styled.div`
  font-size: 16px;
  font-family: 'NanumSquareRoundOTFB';
`;

const ItemPrice = styled.div`
  font-size: 17px;
  font-family: 'NanumSquareRoundOTFR';
  text-align: right;
  span {
    font-size: 16px;
    font-family: 'NanumSquareRoundOTFB';
    color: var(--main-color);
  }
`;

function ItemHeader({ itemData }) {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <StyledHeader >
        <HeaderMain />
        
        <ItemCard>
          <IconButton onClick={() => navigate(-1)}>
            <HiArrowLeft />
          </IconButton>
          <ItemImage src={itemData.image} alt={itemData.name} />
          <ItemInfo>
            <ItemName>{itemData.name}</ItemName>
            <ItemPrice>
              <span>{itemData.pricePerHour.toLocaleString()}
                <span style={{color: 'black'}}>원</span>
              </span>
               /시간
            </ItemPrice>
          </ItemInfo>
        </ItemCard>
      </StyledHeader>

      {isMenuOpen && <MenuDrawer onClose={() => setIsMenuOpen(false)} />}
    </>
  );
}

export default ItemHeader;
