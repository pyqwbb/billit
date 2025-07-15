import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../../components/header/HeaderSub';
import { SlArrowRight, SlArrowUp, SlArrowDown } from "react-icons/sl";
import { FaCheck } from 'react-icons/fa';

const Container = styled.div`
  padding: 20px;
`;

const Title = styled.div`
  font-size: 32px;
  font-family: 'NanumSquareRoundOTFEB';
  margin: 16px 0 24px 0;
  line-height: 1.5;
  span {
    color: #9BA5B7;
  }
`;

const AgreementGroup = styled.div`
  padding: 12px 0;
  font-size: 14px;
  font-family: 'NanumSquareRoundOTFR';
`;

const AgreementRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
`;

const Detail = styled.div`
  margin-top: 12px;
  line-height: 2;
  opacity: 0.5;
`;

const NextButton = styled.button`
  width: 100%;
  height: 52px;
  padding: 16px;
  background-color: ${({ disabled }) => (disabled ? '#ddd' : 'var(--main-color)')};
  font-size: 19px;
  font-family: 'NanumSquareRoundOTFB';
  color: black;
  border: none;
  border-radius: 302px;
  font-size: 16px;
  margin-top: 28px;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
`;

const Option = styled.div`
  display: flex;
  align-items: center;
  gap: 9px;
  cursor: pointer;
`;

const IconWrapper = styled.span`
  width: 18px;
  height: 18px;
  border: 2.3px solid #555;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${props => (props.checked ? '#85FF6A' : 'transparent')};
  color: ${props => (props.selected ? '#000' : '#555')};
`;

function TermsAgreementPage() {
  const navigate = useNavigate();

  const [agreements, setAgreements] = useState({
    terms: false,
    privacy: false,
    marketing: false,
    marketingAd: false,
    marketingEvent: false,
  });

  const [open, setOpen] = useState({
    marketing: true,
  });

  const handleCheck = (key) => {
    setAgreements((prev) => {
      if (key === 'marketing') {
        const checked = !prev.marketing;
        return {
          ...prev,
          marketing: checked,
          marketingAd: checked,
          marketingEvent: checked,
        };
      }

      if (key === 'marketingAd' || key === 'marketingEvent') {
        const newValue = !prev[key];
        const otherKey = key === 'marketingAd' ? 'marketingEvent' : 'marketingAd';
        const newMarketing = newValue && prev[otherKey];

        return {
          ...prev,
          [key]: newValue,
          marketing: newMarketing,
        };
      }

      return { ...prev, [key]: !prev[key] };
    });
  };

  const requiredAgreed = agreements.terms && agreements.privacy;

  return (
    <>
      <Header />
      <Container>
        <Title>
          빌릿<br /><span>약관 동의</span>가 필요해요
        </Title>

        <AgreementGroup>
          <AgreementRow onClick={() => handleCheck('terms')}>
            <Option>
              <IconWrapper checked={agreements.terms}><FaCheck size={10} /></IconWrapper>
              빌릿 서비스 이용약관 (필수)
            </Option>
            <SlArrowRight
              onClick={(e) => {
                e.stopPropagation();
                navigate('/service-info/terms');
              }}
            />
          </AgreementRow>
        </AgreementGroup>

        <AgreementGroup>
          <AgreementRow onClick={() => handleCheck('privacy')}>
            <Option>
              <IconWrapper checked={agreements.privacy}><FaCheck size={10} /></IconWrapper>
              개인정보 수집 이용 동의 (필수)
            </Option>
            <SlArrowRight
              onClick={(e) => {
                e.stopPropagation();
                navigate('/service-info/privacy');
              }}
            />
          </AgreementRow>
        </AgreementGroup>

        <AgreementGroup>
          <AgreementRow onClick={() => setOpen((o) => ({ ...o, marketing: !o.marketing }))}>
            <Option onClick={(e) => { e.stopPropagation(); handleCheck('marketing'); }}>
              <IconWrapper checked={agreements.marketing}><FaCheck size={10} /></IconWrapper>
              마케팅 이용에 대한 동의 (선택)
            </Option>
            <span>{open.marketing ? <SlArrowUp /> : <SlArrowDown />}</span>
          </AgreementRow>

          {open.marketing && (
            <Detail>
              <Option onClick={() => handleCheck('marketingAd')}>
                <IconWrapper checked={agreements.marketingAd}><FaCheck size={10} /></IconWrapper>
                혜택/이벤트 광고 수신
              </Option>
              <Option onClick={() => handleCheck('marketingEvent')}>
                <IconWrapper checked={agreements.marketingEvent}><FaCheck size={10} /></IconWrapper>
                이벤트 참여를 위한 개인정보 수집 및 이용
              </Option>
            </Detail>
          )}
        </AgreementGroup>

        <NextButton disabled={!requiredAgreed}>다음</NextButton>
      </Container>
    </>
  );
}

export default TermsAgreementPage;
