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
  a {
    text-decoration: none;
  }
`;

function ServiceInfoPage() {
  return (
    <div>
      <ListMenu>
        <ListItem>
          <a href="/docs/terms.html"><strong>서비스 이용 약관</strong></a>  
        </ListItem>
        <ListItem>
          <a href="/docs/privacy.html"><strong>개인정보 처리방침</strong></a>
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
