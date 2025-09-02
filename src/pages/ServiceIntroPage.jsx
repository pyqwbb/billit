import { useEffect, useRef, useState } from 'react';
import styled, { keyframes, css } from 'styled-components';
import Header from '../components/header/HeaderGradient';
import billitLogo from '../assets/billit.svg';

const fadeInUp = keyframes`
  0% { opacity: 0; transform: translateY(20px); }
  100% { opacity: 1; transform: translateY(0); }
`;

const fadeInCss = css`
  opacity: 0;
  transform: translateY(20px);
  &.visible {
    animation: ${fadeInUp} 0.8s forwards;
  }
`;

const PageWrapper = styled.div`
  color: #333;
  line-height: 1.6;
`;

const HeroSection = styled.section`
  text-align: center;
  padding: 110px 30px;
`;

const Logo = styled.img`
  width: 160px;
  margin-bottom: 32px;
`;

const HeroTitle = styled.h1`
  font-family: 'NanumSquareRoundOTFEB';
  font-size: 30px;
  font-weight: bold;
`;

const Section = styled.section`
  max-width: 1000px;
  margin: 0 auto;
  padding: 64px 32px;
  ${fadeInCss}
`;

const ProblemSection = styled(Section)`
  font-family: 'NanumSquareRoundOTFR';
  font-size: 16px;
  line-height: 1.8;
  span {
    font-family: 'NanumSquareRoundOTFEB';
    font-size: 18px;
  }
`;

const SolutionHeader = styled.h2`
  font-family: 'NanumSquareRoundOTFEB';
  font-size: 24px;
  margin-bottom: 32px;
  text-align: center;
`;

const SolutionGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 32px;
  justify-content: center;
  margin-top: 32px;
`;

const SolutionCard = styled.div`
  background: white;
  padding: 32px;
  border-radius: 30px;
  box-shadow: 0px 4px 12px rgba(0,0,0,0.1);
  flex: 1 1 250px;
  max-width: 300px;
  text-align: center;
  p {
    font-family: 'NanumSquareRoundOTFR';
    font-size: 16px;
  }
`;

const SolutionTitle = styled.h3`
  font-family: 'NanumSquareRoundOTFB';
  font-size: 20px;
  margin-bottom: 8px;
`;

const PrivacyTitle = styled.h2`
  font-family: 'NanumSquareRoundOTFEB';
  font-size: 18px;
  margin-bottom: 32px;
`;

const PrivacySubTitle = styled.h3`
  font-family: 'NanumSquareRoundOTFB';
  font-size: 16px;
  margin-bottom: 8px;
`;

const PrivacyParagraph = styled.p`
  font-family: 'NanumSquareRoundOTFR';
  font-size: 14px;
  margin-bottom: 16px;
`;

const PrivacyLink = styled.a`
  color: #4f9aff;
  text-decoration: underline;
`;

const useFadeIn = () => {
  const ref = useRef();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if(entry.isIntersecting){
          setVisible(true);
          observer.disconnect();
        }
      }, { threshold: 0.2 }
    );
    if(ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return [ref, visible];
};

const ServiceIntroPage = () => {
  const [problemRef, problemVisible] = useFadeIn();
  const [solutionRef, solutionVisible] = useFadeIn();
  const [privacyRef, privacyVisible] = useFadeIn();

  return (
    <PageWrapper>
      <Header title={"서비스 소개"} backPath={"/"} />

      <HeroSection>
        <Logo src={billitLogo} alt="Billit 로고" />
        <HeroTitle>
            내게 필요한 책상을,<br/>
            내가 원하는 시간에
        </HeroTitle>
      </HeroSection>

      <ProblemSection ref={problemRef} className={problemVisible ? 'visible' : ''}>
        <span>"노트북이랑 충전기, 케이블, 마우스까지… 매일 들고 다니기 번거롭지 않으세요?"</span>
        <p>강의실이나 카페에 가면 꼭 필요한 액세서리를 깜빡하고 안 가져온 적, 한 번쯤은 있으실 거예요.</p>
        <p>게다가 하나하나 사려니 돈도 많이 들고, 쓰다 보면 고장 나거나 잃어버리기 쉽죠.</p>
        <p>결국 무겁게 짐을 챙기느라 불편하고, 불필요한 소비까지 이어집니다.</p>
        <p>Billit은 바로 이 문제에서 출발했습니다.</p>
        <p>필요한 순간, 가까운 공간에서 언제든 전자기기 액세서리를 빌려 쓸 수 있다면 어떨까요?</p>
        <p>이제는 들고 다니지 않아도, 사지 않아도 됩니다. Billit이 대신 준비해 드릴게요.</p>
      </ProblemSection>

      <Section ref={solutionRef} className={solutionVisible ? 'visible' : ''} style={{backgroundColor:'#f8f8f8'}}>
        <SolutionHeader>
            그래서 Billit은 이런 불편함을<br/>
            이렇게 풀어가요
        </SolutionHeader>
        <SolutionGrid>
          <SolutionCard>
            <SolutionTitle>내 근처 스테이션 찾기</SolutionTitle>
            <p>앱 지도를 켜면 지금 내가 있는 곳에서 가장 가까운 Billit 스테이션을 바로 확인할 수 있어요.</p>
          </SolutionCard>
          <SolutionCard>
            <SolutionTitle>다양한 액세서리 바로 사용</SolutionTitle>
            <p>충전기, 거치대, 마우스 같은 전자기기 액세서리를 실시간으로 빌려 쓸 수 있죠.</p>
          </SolutionCard>
          <SolutionCard>
            <SolutionTitle>QR 찍고 바로 대여·반납</SolutionTitle>
            <p>앱에서 QR만 찍으면 몇 초 만에 대여부터 반납까지 끝! 복잡한 절차는 전혀 없어요.</p>
          </SolutionCard>
        </SolutionGrid>
      </Section>

      <Section ref={privacyRef} className={privacyVisible ? 'visible' : ''}>
        <PrivacyTitle>
            Billit은 여러분이 안심하고 서비스를 이용할 수 있도록,
            꼭 필요한 최소한의 정보만 수집하고 있습니다.
        </PrivacyTitle>

        <PrivacySubTitle>서비스 제공을 위해 필요한 정보</PrivacySubTitle>
        <PrivacyParagraph>
          카카오계정 또는 구글계정 (이메일, 이름, 프로필 이미지)<br/>
          가입 서비스 현황, 이용·구매 내역, 로그인 토큰<br/>
          위치 정보 (단, 사용자가 동의한 경우에만 수집)
        </PrivacyParagraph>
        <PrivacyParagraph>👉 이 정보들은 서비스 이용과 계약 이행, 상담·불만 처리, 공지 전달에 사용돼요.</PrivacyParagraph>

        <PrivacySubTitle>간편 가입을 위한 정보</PrivacySubTitle>
        <PrivacyParagraph>
          카카오계정 또는 구글계정 (이메일, 이름, 프로필 이미지)<br/>
          👉 SNS 계정을 통해 간편하게 회원가입이 가능해집니다.
        </PrivacyParagraph>

        <PrivacySubTitle>권리침해 신고가 필요한 경우</PrivacySubTitle>
        <PrivacyParagraph>
          본인 신고 : 이름, 생년월일, 휴대전화번호, 이메일 등<br/>
          대리 신고 : 위임인 및 사업자 등록 관련 정보<br/>
          👉 신고 접수와 조치 과정에서만 사용됩니다.
        </PrivacyParagraph>

        <PrivacyParagraph>
          보관 기간 : 회원 탈퇴 시 즉시 파기하며, 단 법령상 보존 의무가 있는 경우에만 정해진 기간 동안 보관합니다.<br/>
          <PrivacyLink href="/docs/privacy.html">개인정보 처리방침 보기</PrivacyLink>
        </PrivacyParagraph>
      </Section>
    </PageWrapper>
  );
};

export default ServiceIntroPage;