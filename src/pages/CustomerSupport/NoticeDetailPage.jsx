import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../../components/header/HeaderGradient';
import api from '../../api/axiosInstance';

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
  const [fetchedNotice, setFetchedNotice] = useState({});

  useEffect(() => {
    const fetchNotice = async () => {
      try {
        const response = await api.get(`api/v1/notices/${id}`);
        setFetchedNotice(response.data.data);
      } catch (error) {
        console.error('Error fetching notice:', error);
      }
    }
    fetchNotice();
  }, [id]);

  return (
    <>
    <Header title="공지사항"/>
    <Container>
      <NoticeTitle>{fetchedNotice.title}</NoticeTitle>
      <NoticeContent>{fetchedNotice.content}</NoticeContent>
      <NoticeDate>{fetchedNotice.createdAt}</NoticeDate>
    </Container>
    </>
  );
}

export default NoticeDetailPage;
