import { useParams } from 'react-router-dom';
import noticeData from '../../data/mock/notices.json';
import styled from 'styled-components';
import Header from '../../components/header/HeaderGradient';

const Container = styled.div`
  padding: 24px;
`;

const NoticeTitle = styled.span`
  display: flex;
  font-family: 'NanumSquareRoundOTFB';
  font-size: 19px;
`;

const NoticeContent = styled.div`
  padding: 45px 0 45px 0;
  margin: 16px 0 11px 0;
  line-height: 1.6;
  border-top: 1px solid var(--side-color-4);
  border-bottom: 1px solid var(--side-color-4);
  font-family: 'NanumSquareRoundOTFR';
  font-size: 16px;
`;

const NoticeDate = styled.span`
  display: flex;
  flex-direction: column;
  text-align: right;
  font-family: 'NanumSquareRoundOTFR';
  font-size: 12px;
`;

function NoticeDetailPage() {
  const { id } = useParams();
  const notice = noticeData.find(n => n.id === parseInt(id));

  return (
    <>
    <Header title="공지사항"/>
    <Container>
      <NoticeTitle>{notice.title}</NoticeTitle>
      <NoticeContent>{notice.content}</NoticeContent>
      <NoticeDate>{notice.createdAt}</NoticeDate>
    </Container>
    </>
  );
}

export default NoticeDetailPage;
