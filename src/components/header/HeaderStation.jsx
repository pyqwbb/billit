import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { HiArrowLeft } from "react-icons/hi";

const StyledHeader = styled.header`
  position: relative;
  width: 100%;
  height: 70px;
  background: var(--gradation);
  border-radius: 0 0 30px 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
`;

const IconButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
`;

const TitleTimeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  position: relative;

  p {
    font-size: 12px;
    font-family: 'NanumSquareRoundOTFR';
    display: flex;
    align-items: center;
    color: var(--side-color-4);
  }
`;

const StationName = styled.div`
  margin-bottom: 5px;
  font-size: 19px;
  font-family: 'NanumSquareRoundOTFB';
`;

const OpenDot = styled.span`
  display: inline-block;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: var(--main-color);
  margin-right: 4px;
`;

function HeaderStation() {
  const navigate = useNavigate();

  const stname = '건국대학교 제1학생회관';
  const state = '영업중';
  const time = '08:00~22:00';

  return (
    <StyledHeader>
      <IconButton onClick={() => navigate(-1)}>
        <HiArrowLeft />
      </IconButton>

      <TitleTimeWrapper>
        {stname && <StationName>{stname}</StationName>}
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          {state && (
            <p>
              {state === '영업중' && <OpenDot />}
              {state}&nbsp;
            </p>
          )}
          {time && <p>({time})</p>}
        </div>
      </TitleTimeWrapper>

      <div style={{ width: '24px' }} />
    </StyledHeader>
  );
}

export default HeaderStation;
