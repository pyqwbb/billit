import styled from 'styled-components';
import NaverMap from './NaverMap';
import Header from '../../components/header/HeaderMain';

const PageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
`;

const HeaderOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 10;
  background-color: rgba(255, 255, 255, 0.6); // 60% 투명도
`;

function StationMapPage() {
  return (
    <PageWrapper>
      <HeaderOverlay>
        <Header />
      </HeaderOverlay>
      <NaverMap />
    </PageWrapper>
  );
}

export default StationMapPage;
