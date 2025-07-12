import { useState } from 'react';
import faqData from '../../data/faq.json';
import styled from 'styled-components';
import { FiSearch, FiChevronDown, FiChevronUp } from 'react-icons/fi';

const Container = styled.div`
  padding: 24px;
  max-width: 600px;
  margin: 0 auto;
`;

const SearchWrapper = styled.div`
  position: relative;
  width: 100%;
  margin: 10px 0 25px 0;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 12px 40px 12px 12px; /* 오른쪽에 아이콘 공간 확보 */
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 8px;
`;

const SearchIcon = styled(FiSearch)`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: #333;
  pointer-events: none; /* 아이콘 클릭 시 input이 포커스 유지 */
  font-size: 20px;
`;

const CategoryList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 24px;
  width: 100%;
`;

const CategoryButton = styled.button`
  flex: 1 1 auto;
  padding: 6px 12px;
  border: none;
  border-radius: 20px;
  background-color: ${props => props.active ? '#333' : '#eee'};
  color: ${props => props.active ? '#fff' : '#000'};
  cursor: pointer;
  font-size: 14px;
`;

const QuestionBox = styled.div`
  border-top: 1px solid #ccc;
  padding: 12px 0;
  font-size: 14px;
`;

const QuestionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
`;

const Answer = styled.p`
  margin-top: 8px;
  line-height: 1.6;
  color: #333;
`;

function FaqPage() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [searchText, setSearchText] = useState('');

  const categories = Object.keys(faqData);

  const filteredFaq = Object.entries(faqData)
    .filter(([category]) => !selectedCategory || category === selectedCategory)
    .flatMap(([category, items]) =>
      items.filter(({ question, answer }) =>
        question.includes(searchText) || answer.includes(searchText)
      )
    );

  const toggleExpand = index => {
    setExpandedIndex(index === expandedIndex ? null : index);
  };

  return (
    <Container>
      <span style={{ fontSize: '15px', color: '#333' }}>
        검색
      </span>
      <SearchWrapper>
        <SearchInput
          value={searchText}
          onChange={e => setSearchText(e.target.value)}
        />
        <SearchIcon />
      </SearchWrapper>

      <CategoryList>
        {categories.map(category => (
          <CategoryButton
            key={category}
            active={selectedCategory === category}
            onClick={() => setSelectedCategory(selectedCategory === category ? null : category)} // 같은 카테고리 클릭시 선택 해제
          >
            {category}
          </CategoryButton>
        ))}
      </CategoryList>

      {filteredFaq.map((item, index) => (
        <QuestionBox key={index}>
          <QuestionHeader onClick={() => toggleExpand(index)}>
            <span>Q. {item.question}</span>
            {expandedIndex === index ? <FiChevronUp /> : <FiChevronDown />}
          </QuestionHeader>
          {expandedIndex === index && <Answer>A. {item.answer}</Answer>}
        </QuestionBox>
      ))}
    </Container>
  );
}

export default FaqPage;
