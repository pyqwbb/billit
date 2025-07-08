import styled from 'styled-components';

const ListMenu = styled.ul`
  list-style: none;
  padding: 10px 0 0 10px;
`;

const ListItem = styled.li`
  display: flex;
  align-items: center;
  padding: 3px 0;
  font-size: 15px;
`;

function ServiceInfoPage() {
  return (
    <div>
      <ListMenu>
        <ListItem>
          <strong> 이용 약관 </strong>
        </ListItem>
        <ListItem>
          <strong> 개인정보 처리방침 </strong>
        </ListItem>
        <ListItem>
         <strong> 오픈소스 라이선스 </strong>
        </ListItem>
      </ListMenu>
    </div>
  );
}

export default ServiceInfoPage;
