import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/header/HeaderMain';
import api from '../../api/axiosInstance';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 24px;
`;

const Title = styled.span`
  font-family: 'NanumSquareRoundOTFB';
  font-size: 19px;
`;

const CategoryScroll = styled.div`
  display: flex;
  overflow-x: auto;
  border: none;
  gap: 5px;
  margin-bottom: 14px;
  border-bottom: 1px solid var(--side-color-4);
`;

const CategoryButton = styled.button`
  padding: 6px 12px;
  border: none;
  background-color: #fff;
  white-space: nowrap;
  cursor: pointer;
  width: 100%;
  font-size: 16px;
  font-family: 'NanumSquareRoundOTFB';
  color: ${({ selected }) => (selected ? 'var(--side-color-4)' : 'var(--side-color-3)')};
  margin-bottom: 8px;
`;

const ListContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const NoticeItem = styled.div`
  width: 100%;
  height: 54px;
  padding: 18px;
  align-items: center;
  cursor: pointer;
  display: flex;
  font-family: 'NanumSquareRoundOTFB';
  font-size: 14px;
  background-color: var(--side-color-2);
  border-radius: 30px;
  justify-content: space-between;
`;

const MoreButton = styled.button`
  width: 100%;
  height: 54px;
  margin-top: 20px;
  padding: 12px;
  border-radius: 30px;
  border: none;
  background-color: var(--side-color-3);
  color: white;
  cursor: pointer;
  font-family: 'NanumSquareRoundOTFB';
  font-size: 14px;
`;

const SortButton = styled.button`
  background: none;
  border: none;
  color: #333;
  font-size: 14px;
  cursor: pointer;
`;

const Footer = styled.div`
  width: 100%;
  padding: 12px;
  background: none;
  margin-top: 90px;
  display: flex;
  flex-direction: column;
  align-items: center;

  p {
    color: var(--side-color-3);
    font-family: 'NanumSquareRoundOTFR';
    font-size: 14px;
    text-decoration: underline;
  }
`;

function NoticesPage() {
  const navigate = useNavigate();
  const [notices, setNotices] = useState([]);
  const [limit, setLimit] = useState(10);
  const [sortAsc, setSortAsc] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('전체');

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const response = await api.get('/api/v1/notices');
        const data = response.data?.data?.noticeInfos?.content || [];
        setNotices(data);
      } catch (error) {
        console.error('Failed to fetch notices:', error);
      }
    }
    fetchNotices();
  }, []);

  const categories = ['전체', ...new Set(notices.map(n => n.type))];

  const sortedData = [...notices]
    .filter(n => selectedCategory === '전체' || n.type === selectedCategory)
    .sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      return sortAsc ? dateA - dateB : dateB - dateA;
    });

  const handleClick = (id) => {
    navigate(`/notices/${id}`);
  };

  return (
    <>
      <Header />
      <Container>
        <Title>공지사항</Title>

        <ListContainer>
          <div style={{ textAlign: 'right', marginBottom: '8px' }}>
            <SortButton onClick={() => setSortAsc(prev => !prev)}>
              정렬 기준: 생성일자 {sortAsc ? '▲' : '▼'}
            </SortButton>
          </div>

          <CategoryScroll>
            {categories.map((cat, i) => (
              <CategoryButton
                key={i}
                selected={selectedCategory === cat}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </CategoryButton>
            ))}
          </CategoryScroll>

          {sortedData.slice(0, limit).map((notice) => (
            <NoticeItem key={notice.id} onClick={() => handleClick(notice.id)}>
              <span>{notice.title}</span>
            </NoticeItem>
          ))}

          {limit < sortedData.length && (
            <MoreButton onClick={() => setLimit(prev => prev + 10)}>더보기</MoreButton>
          )}
        </ListContainer>

        <Footer>
          <p>1:1 문의 바로가기</p>
        </Footer>
      </Container>
    </>
  );
}

export default NoticesPage;
