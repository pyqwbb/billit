import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import api from '../../api/axiosInstance';
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
  margin-left: 30px;
  line-height: 2;
  opacity: 0.5;
`;

const NextButton = styled.button`
  width: 100%;
  height: 52px;
  padding: 16px;
  background-color: ${({ disabled }) => (disabled ? '#ddd' : 'var(--main-color)')};
  font-size: 16px;
  font-family: 'NanumSquareRoundOTFB';
  color: black;
  border: none;
  border-radius: 302px;
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
  const location = useLocation();
  const userInfoKey = location.state?.userInfoKey;

  const [agreements, setAgreements] = useState({
    terms: false,
    privacy: false,
    marketing: false,
  });

  const [open, setOpen] = useState({
    marketing: true,
  });

  const handleCheck = (key) => {
    setAgreements((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const requiredAgreed = agreements.terms && agreements.privacy;

  const handleSubmit = async () => {
    try {
      const response = await api.post(
        '/api/v1/auth/register',
        {
          userInfoKey,
          thirdPartyDataSharingConsent: agreements.privacy,
          marketingConsent: agreements.marketing,
        },
        { withCredentials: true }
      );

      if (response.data.type === 'LOGIN_SUCCESS') {
        localStorage.setItem('accessToken', response.data.accessToken);
        alert('회원가입이 완료되었습니다. 로그인합니다.');
        navigate('/');
      } else {
        alert('예상치 못한 응답입니다. 다시 시도해주세요.');
      }
    } catch (err) {
      console.error('회원가입 요청 실패:', err);
      alert('회원가입에 실패했습니다. 다시 시도해주세요.');
    }
  };

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
              <Option>혜택/이벤트 광고 수신</Option>
              <Option>이벤트 참여를 위한 개인정보 수집 및 이용</Option>
            </Detail>
          )}
        </AgreementGroup>

        <NextButton disabled={!requiredAgreed} onClick={handleSubmit}>다음</NextButton>
      </Container>
    </>
  );
}

export default TermsAgreementPage;
