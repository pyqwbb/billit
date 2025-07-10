import styled from 'styled-components';

const Container = styled.div`
  padding: 24px;
  max-width: 480px;
  margin: 0 auto;
`;

const RadioGroup = styled.div`
  margin-top: 25px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 100px;
  margin-top: 20px;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #ccc;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 30px;
`;

const Button = styled.button`
  padding: 12px;
  background-color: #ddd;
  border: none;
  border-radius: 30px;
  cursor: pointer;
`;

function AccountDeleteSurveyPage() {
  return (
    <Container>
      <h2>회원 탈퇴</h2><br />
      <p>회원 탈퇴를 원하시는 이유를 선택해 주세요.</p>
      <p>선택하신 사유는 서비스 개선에만 사용됩니다.</p>
      <RadioGroup>
        <label><input type="radio" name="reason" /> 사용 빈도가 낮아서 </label>
        <label><input type="radio" name="reason" /> 원하는 기능이나 물품이 부족해서 </label>
        <label><input type="radio" name="reason" /> 사용하기 불편해서 (UI/UX 등) </label>
        <label><input type="radio" name="reason" /> 다른 서비스를 이용하기 위해 </label>
        <label><input type="radio" name="reason" /> 기타 (직접 작성) </label>
      </RadioGroup>
      <TextArea placeholder="기타 사유를 입력하세요" />
      <ButtonWrapper>
        <Button>회원 탈퇴</Button>
      </ButtonWrapper>
    </Container>
  );
}

export default AccountDeleteSurveyPage;
