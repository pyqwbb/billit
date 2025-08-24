import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/billit.svg';
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
  padding-left: 16px;
  padding-right: 16px;
`;

const IconButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
`;

const LogoTitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  position: relative;
`;

const Logo = styled.img`
  height: 30px;
  cursor: pointer;
`;

const PageTitle = styled.div`
  margin-top: 8px;
  font-size: 14px;
  color: black;
  text-align: center;
  font-family: 'NanumSquareRoundOTFB';
`;

function HeaderGradient({ title }) {
  const navigate = useNavigate();

  return (
    <StyledHeader>
      <IconButton onClick={() => navigate(-1)}>
        <HiArrowLeft />
      </IconButton>

      <LogoTitleWrapper>
        <Logo src={logo} alt="logo" />
        {title && <PageTitle>{title}</PageTitle>}
      </LogoTitleWrapper>

      <div style={{ width: '24px' }} />
    </StyledHeader>
  );
}

export default HeaderGradient;