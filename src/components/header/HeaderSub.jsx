import styled from 'styled-components';
import logo from '../../assets/billit.svg';

const StyledHeader = styled.header`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 60px;
  padding: 0 16px;
`;

const Logo = styled.img`
  height: 30px;
`;

function HeaderSub() {
  return (
    <StyledHeader>
      <Logo src={logo} alt="logo"/>
    </StyledHeader>
  );
}

export default HeaderSub;