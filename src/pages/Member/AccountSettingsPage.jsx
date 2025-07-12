import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  padding: 24px;
  max-width: 480px;
  margin: 0 auto;
`;

const Section = styled.div`
  margin-bottom: 32px;
`;

const Label = styled.label`
  display: block;
  margin: 8px;
  color: #333;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 8px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const Button = styled.button`
  padding: 8px 16px;
  background-color:rgb(210, 210, 210);
  border: none;
  border-radius: 30px;
  cursor: pointer;
`;

const ProfileImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 36px;
`;

const ProfileImage = styled.div`
  width: 140px;
  height: 140px;
  background-color: #eee;
  border-radius: 50%;
`;

const DeleteButton = styled(Button)`
  color: #888;
  text-decoration: underline;
  background-color: #fff;
  border: none;
  display: block;
  width: 100%;
  margin-top: 16px;
  &:hover {
    color: #333;
  }
`;

function AccountSettingsPage() {
  const navigator = useNavigate();

  return (
    <Container>
      <Section>
        <ProfileImageWrapper>
          <ProfileImage />
        </ProfileImageWrapper>

        <Label htmlFor="nickname">닉네임</Label>
        <Input id="nickname" placeholder="기존 닉네임" />      
        <ButtonWrapper>
          <Button>적용</Button>
        </ButtonWrapper>
      </Section>

      <Section>
        <Label>계정 연동</Label>
      </Section>
      
      <DeleteButton onClick={() => navigator('/account-delete-survey')}>회원 탈퇴</DeleteButton>
    </Container>
  );
}

export default AccountSettingsPage;
