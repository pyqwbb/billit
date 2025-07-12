import { useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();

  return (
    <div>
      <ListMenu>
        <ListItem onClick={() => window.location.href = '/service-info/terms'}>
          <strong> 이용 약관 </strong>
        </ListItem>
        <ListItem onClick={() => window.location.href = '/service-info/privacy'}>
          <strong> 개인정보 처리방침 </strong>
        </ListItem>
        <ListItem onClick={() => window.location.href = '/service-info/license'}>
         <strong> 오픈소스 라이선스 </strong>
        </ListItem>
        <ListItem onClick={() => window.location.href = '/service-info/version'}>
         <strong> 서비스 버전 정보 </strong>
        </ListItem>
      </ListMenu>
    </div>
  );
}

export default ServiceInfoPage;
