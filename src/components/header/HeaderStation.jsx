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
  text-align: center;
  margin: 4px;
`;

const OpenDot = styled.span`
  display: inline-block;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: var(--main-color);
  margin-right: 4px;
`;

function HeaderStation({stname, status, time}) {
  const navigate = useNavigate();

  return (
    <StyledHeader>
      <IconButton onClick={() => navigate(-1)}>
        <HiArrowLeft />
      </IconButton>

      <TitleTimeWrapper>
        {stname && <StationName>{stname}</StationName>}
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          {status && (
            <p>
              {status === '운영 중' && <OpenDot />}
              {status}&nbsp;
            </p>
          )}
          {time && (
            <p>
              {time === '운영 중' && <OpenDot />}
              {time}&nbsp;
            </p>
          )}
        </div>
      </TitleTimeWrapper>

      <div style={{ width: '24px' }} />
    </StyledHeader>
  );
}

export default HeaderStation;
