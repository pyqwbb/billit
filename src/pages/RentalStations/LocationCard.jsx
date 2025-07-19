import mockImg from '../../../public/images/billit-black.jpg';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  position: relative;
`;

const Thumbnail = styled.img`
  position: absolute;
  top: -52%;
  left: 16px;
  width: 155px;
  height: auto;
  border-radius: 12px;
`;

const Card = styled.div`
  width: 100%;
  border-radius: 30px 30px 0 0;
  background: linear-gradient(
    rgba(133, 255, 106, 0.4),
    rgba(213, 228, 227, 0.9)
  );
  padding: 20px;
  box-sizing: border-box;
`;

const TitleSection = styled.div`
  display: flex;
  align-items: baseline;
  flex-direction: row;
  gap: 6px;
`;

const Title = styled.h2`
  font-size: 19px;
  font-family: NanumSquareRoundOTFB;
  color: #000;
`;

const Subtitle = styled.p`
  font-size: 14px;
  font-family: NanumSquareRoundOTFR;
  color: var(--side-color-4);
  margin-top: 5px;
`;

const Divider = styled.hr`
  margin: 16px 0 13px 0;
  border: none;
  border-top: 1px solid var(--side-color-3);
`;

const Label = styled.p`
  font-size: 14px;
  font-family: NanumSquareRoundOTFB;
  margin-bottom: 9px;
`;

const ItemList = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 16px;
`;

const ItemBox = styled.div`
  flex: 1;
  height: 112px;
  aspect-ratio: 1 / 1;
  background: var(--side-color-3);
  border-radius: 15px;
`;

const Button = styled.button`
  width: 100%;
  height: 52px;
  padding: 12px;
  background: var(--main-color);
  color: #000;
  font-weight: 600;
  font-size: 16px;
  font-family: NanumSquareRoundOTFB;
  border-radius: 30px;
  border: none;
  cursor: pointer;
`;

const Status = ({ state, openTime }) => {
  const isOpen = state === '영업중';

  return (
    <div
      style={{
        fontFamily: 'NanumSquareRoundOTFR',
        fontSize: '12px',
        color: 'var(--side-color-4)',
      }}
    >
      | <span style={{ color: isOpen ? 'var(--main-color)' : 'var(--side-color-4)' }}> ● </span>
      {state} ({openTime})
    </div>
  );
};

export default function LocationCard() {
  const mockData = {
    stName: '건국대학교 제1학생회관',
    state: '영업중',
    openTime: '08:00~22:00',
    stDescribe: '대학교 부속건물',
  };

  return (
    <Container>
      <Thumbnail src={mockImg} alt="건물 이미지" />
      <Card>
        <TitleSection>
          <Title>{mockData.stName}</Title>
          <Status state={mockData.state} openTime={mockData.openTime} />
        </TitleSection>

        <Subtitle>{mockData.stDescribe}</Subtitle>
        <Divider />

        <Label>바로 대여 가능!</Label>
        <ItemList>
          <ItemBox />
          <ItemBox />
          <ItemBox />
        </ItemList>

        <Button>대여 가능 물품 전체 조회</Button>
      </Card>
    </Container>
  );
}
