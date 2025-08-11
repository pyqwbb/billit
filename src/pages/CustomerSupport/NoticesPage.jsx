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
  const [page, setPage] = useState(0);
  const size = 10;
  const [hasMore, setHasMore] = useState(true);
  const [sortAsc, setSortAsc] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('전체');

  useEffect(() => {
    fetchNotices(0);
  }, []);

  const fetchNotices = async (pageNumber) => {
    try {
      const response = await api.get(`/api/v1/notices?page=${pageNumber}&size=${size}`);
      const content = response.data?.data?.noticeInfos?.content || [];
      const pageInfo = response.data?.data?.noticeInfos?.page;

      setNotices((prev) => {
        const ids = new Set(prev.map((n) => n.id));
        const newNotices = content.filter((n) => !ids.has(n.id));
        return [...prev, ...newNotices];
      });
      setPage(pageNumber + 1);
      setHasMore(pageNumber + 1 < pageInfo.totalPages);
    } catch (error) {
      console.error('공지사항 불러오기 실패:', error);
    }
  };

  const categories = ['전체', '시스템 점검', '일반', '당첨자 발표'];

  const sortedData = [...notices]
    .filter(n => selectedCategory === '전체' || n.type === selectedCategory)
    .sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      return sortAsc ? dateA - dateB : dateB - dateA;
    });

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
            {categories.map((cat) => (
              <CategoryButton
                key={cat}
                selected={selectedCategory === cat}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </CategoryButton>
            ))}
          </CategoryScroll>

          {sortedData.map((notice) => (
            <NoticeItem key={notice.id} onClick={() => navigate(`/notices/${notice.id}`)}>
              <span>{notice.title}</span>
            </NoticeItem>
          ))}

          {hasMore && (
            <MoreButton onClick={() => fetchNotices(page)}>
              더보기
            </MoreButton>
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
