import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../../components/header/HeaderSub';
import CompleteIcon from '../../assets/icon/complete.png';

const Container = styled.div`
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

const RentalBox = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    border-top: 1px solid var(--side-color-4);
    border-radius: 0px;
    margin-top: 60px;
    padding-top: 30px;
`;

const InBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: 100%;
  margin: 5px 10px;
  span {
    font-size: 16px;
    font-family: NanumSquareRoundOTFB;
  }
  p {
    font-size: 14px;
    font-family: NanumSquareRoundOTFR;
  }
`;

const ImageBox = styled.img`
  background-color: var(--side-color-3);
  width: 130px;
  aspect-ratio: 1 / 1;
  border-radius: 15px;
  flex-shrink: 0;
`;

const Button = styled.button`
  left: 0;
  right: 0;
  width: 360px;
  margin: 38px auto;
  padding: 12px;
  background-color: var(--main-color);
  border: none;
  border-radius: 30px;
  cursor: pointer;
  font-size: 19px;
  font-family: 'NanumSquareRoundOTFB';
`;

function RentalCompletePage() {
  const navigate = useNavigate();

  const mockItem = {
    id: 1,
    name: 'C타입 충전 케이블',
    stName: '건국대학교 제1학생회관',
    rentalTime: 3,
    rentalStart: '2025.07.12 14:24',
    rentalEnd: '2025.07.12 17:24',
  };

  return (
    <>
      <Header/>
      <Container>
        <img src={CompleteIcon} style={{marginTop: '90px'}}/>
        <MainText>대여 완료!</MainText>
        <SubText>필요할 땐 언제든, 빌릿하세요!</SubText>
        <RentalBox>
          <ImageBox />
          <InBox>
            <span>{mockItem.name}</span>
            <p>{mockItem.stName}</p>
            <p><span style={{color: 'var(--main-color)'}}>{mockItem.rentalTime}</span>시간</p>
            <p>대여시작 | {mockItem.rentalStart}</p>
            <p>반납시간 | {mockItem.rentalEnd}</p>
          </InBox>
        </RentalBox>
        <Button onClick={() => navigate('/')}>홈으로</Button>
      </Container> 
    </>
  );
}

export default RentalCompletePage;
