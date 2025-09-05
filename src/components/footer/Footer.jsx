import styled from 'styled-components';

const FooterContainer = styled.footer`
  margin-top: 30px;
  padding: 0px 10px 40px;
  font-size: 14px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-top: 1px solid var(--side-color-2);
`;

const InfoList = styled.ul`
  padding: 40px 20px;
  list-style: none;
`;

const InfoItem = styled.li`
  margin: 4px 0;
  font-family: 'NanumSquareRoundOTFR';
  font-size: 12px;
  color: var(--side-color-4);
  span {
    font-family: 'NanumSquareRoundOTFB';
    font-size: 12px;
    color: var(--side-color-4);
  }
`;

const DocsList = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
  a {
    font-family: 'NanumSquareRoundOTFR';
    font-size: 12px;
    color: var(--side-color-3);
    text-decoration: none;
  }
`;

const CopyRight = styled.div`
  font-size: 12px;
  color: var(--side-color-3);
  margin-bottom: 20px;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <InfoList>
        <InfoItem><span>상호</span> 프렌즈(PRIENZ)</InfoItem>
        <InfoItem><span>대표</span> 김우주</InfoItem>
        <InfoItem><span>사업자등록번호</span> 708-71-00730</InfoItem>
        <InfoItem><span>통신판매업자신고번호</span> 2025-서울광진-1214</InfoItem>
        <InfoItem><span>이메일</span> rladnwntjdbs@naver.com</InfoItem>
        <InfoItem><span>전화번호</span> 010-4141-7301</InfoItem>
        <InfoItem><span>주소</span> 서울특별시 광진구 아차산로 262, B128~131호 건국대학교 캠퍼스타운 사업단 [공유오피스 PRIENZ](자양동,스타시티)</InfoItem>
      </InfoList>
      <DocsList>
        <a href="/docs/terms.html">서비스 이용약관</a>
        <a href="/docs/privacy.html">개인정보 처리방침</a>
      </DocsList>
      <CopyRight>Copyright © 2025 billit. All rights reserved.</CopyRight>
    </FooterContainer>
  );
};

export default Footer;
