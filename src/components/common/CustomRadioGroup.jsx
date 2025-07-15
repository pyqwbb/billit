import { useState } from 'react';
import styled from 'styled-components';
import { FaCheck } from 'react-icons/fa';

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

function CustomRadioGroup() {
  const [selected, setSelected] = useState('');

  const options = [
    '더 이상 필요가 없어서',
    '가격이 비싸서',
    '다른 서비스를 찾아서',
    '사용하기 불편해서 (UI/UX 등)',
  ];

  return (
    <Container>
      {options.map((option, idx) => (
        <Option key={idx}>
          <input
            type="radio"
            name="reason"
            value={option}
            checked={selected === option}
            onChange={() => setSelected(option)}
            style={{ display: 'none' }}
          />
          <IconWrapper selected={selected === option}>
            <FaCheck size={8} />
          </IconWrapper>
          {option}
        </Option>
      ))}
    </Container>
  );
}

export default CustomRadioGroup;
