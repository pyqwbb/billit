import styled from 'styled-components';
import { FaCheck } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import api from '../../api/axiosInstance';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 7px;
`;

const Option = styled.label`
  display: flex;
  align-items: center;
  gap: 9px;
  font-size: 16px;
  font-family: 'NanumSquareRoundOTFR';
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
  background-color: ${props => (props.selected ? '#85FF6A' : 'transparent')};
  color: ${props => (props.selected ? '#000' : '#555')};
`;

function CustomReasonGroup({ selected, setSelected }) {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    const fetchReasons = async () => {
      try {
        const response = await api.get('/api/v1/users/withdrawal-reasons');
        if (response.data.data.reasons) {
          setOptions(response.data.data.reasons);
        }
      } catch (error) {
        console.error('탈퇴 사유 목록 조회 중 오류 발생', error);
      }
    };

    fetchReasons();
  }, []);

  const toggleReason = (code) => {
    if (selected.includes(code)) {
      setSelected(selected.filter(item => item !== code));
    } else {
      setSelected([...selected, code]);
    }
  };

  return (
    <Container>
      {options.map((option) => (
        <Option key={option.code} onClick={() => toggleReason(option.code)}>
          <IconWrapper selected={selected.includes(option.code)}>
            <FaCheck size={8} />
          </IconWrapper>
          {option.description}
        </Option>
      ))}

      <Option key="OTHER" onClick={() => toggleReason('OTHER')}>
        <IconWrapper selected={selected.includes('OTHER')}>
          <FaCheck size={8} />
        </IconWrapper>
        기타
      </Option>
    </Container>
  );
}

export default CustomReasonGroup;
