import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { SlArrowRight, SlArrowUp, SlArrowDown } from "react-icons/sl";

const Container = styled.div`
  padding: 24px;
`;

const Title = styled.div`
  font-size: 24px;
  margin: 16px 0 24px 0;
  line-height: 1.5;
  font-weight: 600;
  span {
    color: #888;
    font-weight: bolder;
  }
`;

const AgreementGroup = styled.div`
  border-bottom: 1px solid #ccc;
  padding: 12px 0;
`;

const AgreementRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
`;

const Checkbox = styled.input.attrs({ type: 'checkbox' })`
  margin-right: 8px;
`;

const Detail = styled.div`
  padding-left: 24px;
  margin-top: 12px;
  font-size: 14px;
  color: #666;
  line-height: 2;
`;

const NextButton = styled.button`
  width: 100%;
  padding: 16px;
  background-color: ${({ disabled }) => (disabled ? '#ddd' : '#000')};
  color: white;
  border: none;
  border-radius: 302px;
  font-size: 16px;
  margin-top: 28px;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
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
    <Container>
      <Title>
        서비스 이용을 위한<br/><span>약관 동의</span>가 필요해요
      </Title>

      <AgreementGroup>
        <AgreementRow onClick={() => handleCheck('terms')}>
          <label>
            <Checkbox checked={agreements.terms} />
            빌릿 서비스 이용약관 (필수)
          </label>
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
          <label>
            <Checkbox checked={agreements.privacy} />
            개인정보 수집 이용 동의 (필수)
          </label>
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
          <label>
            <Checkbox checked={agreements.marketing} onChange={() => handleCheck('marketing')} />
            마케팅 이용에 대한 동의 (선택)
          </label>
          <span>{open.marketing ? <SlArrowUp/> : <SlArrowDown/>}</span>
        </AgreementRow>

        {open.marketing && (
          <Detail>
            <label>
              <Checkbox
                checked={agreements.marketingAd}
                onChange={() => handleCheck('marketingAd')}
              />
              혜택/이벤트 광고 수신
            </label>
            <br />
            <label>
              <Checkbox
                checked={agreements.marketingEvent}
                onChange={() => handleCheck('marketingEvent')}
              />
              이벤트 참여를 위한 개인정보 수집 및 이용 동의
            </label>
          </Detail>
        )}
      </AgreementGroup>

      <NextButton disabled={!requiredAgreed}>다음</NextButton>
    </Container>
  );
}

export default TermsAgreementPage;
