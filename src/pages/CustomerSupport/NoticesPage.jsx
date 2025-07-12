import { useState } from 'react';
import noticeData from '../../data/mock/notices.json';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  display: flex;
  gap: 32px;
  padding: 24px;
  flex-wrap: wrap;
`;

const ListContainer = styled.div`
  flex: 1;
  min-width: 300px;
`;

const NoticeItem = styled.div`
  padding: 12px 0;
  border-bottom: 1px solid #ccc;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
`;

const MoreButton = styled.button`
  width: 100%;
  margin-top: 20px;
  padding: 12px;
  border-radius: 12px;
  border: none;
  background-color: #ddd;
  font-weight: bold;
  cursor: pointer;
`;

const SortButton = styled.button`
  background: none;
  border: none;
  color: #333;
  font-size: 14px;
  cursor: pointer;
`;

function NoticesPage() {
  const navigate = useNavigate();
  const [limit, setLimit] = useState(10);
  const [sortAsc, setSortAsc] = useState(false);

  const handleClick = (id) => {
    navigate(`/notices/${id}`);
  };

  const sortedData = [...noticeData].sort((a, b) => {
    const dateA = new Date(`${a.createdAt}`);
    const dateB = new Date(`${b.createdAt}`);
    return sortAsc ? dateA - dateB : dateB - dateA;
  });

  return (
    <Container>
      <ListContainer>
        <div style={{ textAlign: 'right', marginBottom: '8px' }}>
          <SortButton onClick={() => setSortAsc(prev => !prev)}>
            정렬 기준: 생성일자 {sortAsc ? '▲' : '▼'}
          </SortButton>
        </div>
        {sortedData.slice(0, limit).map((notice) => (
          <NoticeItem key={notice.id} onClick={() => handleClick(notice.id)}>
            <span>{notice.title}</span>
            <span>{notice.createdAt}</span>
          </NoticeItem>
        ))}
        {limit < sortedData.length && (
          <MoreButton onClick={() => setLimit(prev => prev + 10)}>더보기</MoreButton>
        )}
      </ListContainer>
    </Container>
  );
}

export default NoticesPage;
