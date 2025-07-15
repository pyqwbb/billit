import { useState } from 'react';
import faqData from '../../data/faq.json';
import styled from 'styled-components';
import { FiSearch, FiChevronDown, FiChevronUp } from 'react-icons/fi';
import Header from '../../components/header/HeaderMain';

const Container = styled.div`
  padding: 12px;
  max-width: 600px;
  margin: 0 auto;
`;

const Title = styled.div`
  font-family: 'NanumSquareRoundOTFB';
  font-size: 19px;
  margin: 20px;
`;

const SearchWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 12px 40px 12px 12px;
  border: none;
  border-bottom: 1px solid var(--side-color-3);
  border-radius: 0px;
  font-family: 'NanumSquareRoundOTFR';
  font-size: 16px;
`;

const SearchIcon = styled(FiSearch)`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--side-color-3);
  pointer-events: none;
  font-size: 20px;
`;

const CategoryList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: 24px 0;
  width: 100%;
  border-bottom: 1px solid var(--side-color-4);
  padding: 30px 0 10px 0;
`;

const CategoryButton = styled.button`
  flex: 1 1 auto;
  padding: 6px 12px;
  border: none;
  border-radius: 20px;
  background-color: #fff;
  color: ${props => props.active ? 'var(--side-color-4)' : 'var(--side-color-3)'};
  cursor: pointer;
  font-family: 'NanumSquareRoundOTFB';
  font-size: 16px;
`;

const QuestionBoxList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  font-size: 14px;
`;

const QuestionBox = styled.div`
  border-radius: 30px;
  background-color: ${({ expanded }) =>
    expanded ? 'var(--main-color)' : 'none'};
  padding: 5px 0;
`;

const QuestionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  font-family: 'NanumSquareRoundOTFB';
  font-size: 14px;
  background-color: ${({ expanded }) =>
    expanded ? 'none' : 'var(--side-color-2)'};
  height: 54px;
  border-radius: 30px;

  span {
    padding: 0 25px;
  }
`;

const ChevronIcon = styled.div`
  padding: 5px 25px 0 25px;
  font-size: 25px;
  color: #545F71;
`;

const Answer = styled.p`
  margin: 15px 0;
  line-height: 1.6;
  color: #333;
  font-family: 'NanumSquareRoundOTFR';
  font-size: 12px;
  padding: 0 25px;
`;

const Footer = styled.div`
  padding: 12px;
  border: none;
  background: none;
  margin-top: 90px;
  display: flex;
  flex-direction: column;
  justify-content: flex;
  align-items: center;

  p {
    color: var(--side-color-3);
    font-family: 'NanumSquareRoundOTFR';
    font-size: 14px;
    text-decoration: underline;
  }
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
    <>
    <Header/>
    <Title>자주 묻는 질문</Title>
    <Container>
      <SearchWrapper>
        <SearchInput
          placeholder='어떤 문제가 발생했나요?'
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

      <QuestionBoxList>
      {filteredFaq.map((item, index) => (
        <QuestionBox key={index} expanded={expandedIndex === index}>
          <QuestionHeader
            onClick={() => toggleExpand(index)}
            expanded={expandedIndex === index}
          >
            <span>Q. {item.question}</span>
            <ChevronIcon>
              {expandedIndex === index ? <FiChevronUp /> : <FiChevronDown />}
            </ChevronIcon>
          </QuestionHeader>
          {expandedIndex === index && <Answer>{item.answer}</Answer>}
        </QuestionBox>
      ))}
      </QuestionBoxList>

      <Footer><p>1:1 문의 바로가기</p></Footer>
    </Container>
    </>
  );
}

export default FaqPage;
