import { useParams } from 'react-router-dom';
import noticeData from '../../data/mock/notices.json';
import styled from 'styled-components';

const Container = styled.div`
  padding: 24px;
`;

const Title = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  border-bottom: 1px solid #ccc;
  padding-bottom: 12px;
`;

const Content = styled.div`
  margin-top: 24px;
  background: #f5f5f5;
  padding: 20px;
  line-height: 1.6;
  min-height: 300px;
`;

function NoticeDetailPage() {
  const { id } = useParams();
  const notice = noticeData.find(n => n.id === parseInt(id));

  return (
    <Container>
      <Title>
        <h2>{notice.title}</h2>
        <span>{notice.createdAt}</span>
      </Title>
      <Content>{notice.content}</Content>
    </Container>
  );
}

export default NoticeDetailPage;
