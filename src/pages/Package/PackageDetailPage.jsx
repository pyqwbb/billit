import {useEffect, useState} from 'react';
import {useLocation, useNavigate, useParams} from 'react-router-dom';
import api from '../../api/axiosInstance';
import styled from 'styled-components';
import HeaderBack from '../../components/header/HeaderBack';
import Cookies from 'js-cookie';
import ClipLoader from "react-spinners/ClipLoader";

const Container = styled.div`
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Image = styled.img`
  width: 330px;
  aspect-ratio: 1 / 1;
  border-radius: 8px;
  background-color: var(--side-color-1);
`;

const Title = styled.h2`
  margin-top: 16px;
  margin-left: 45px;
  font-size: 24px;
  font-family: 'NanumSquareRoundOTFEB';
  width: 360px;
`;

const Price = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  font-size: 32px;
  padding-top: 40px;
  padding-bottom: 23px;
  padding-right: 20px;
  border-bottom: solid 1px #545F71;
  width: 360px;
`;

const Price1 = styled.div`
  margin-top: 16px;
  font-family: 'NanumSquareRoundOTFB';
`;

const Price2 = styled.div`
  margin-top: 16px;
  font-family: 'NanumSquareRoundOTFR';
`;

const SelectBox = styled.select`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 32px;
  width: 100%;
  text-align: center;
  font-size: 16px;
  margin: 21px 42px;
  padding: 12px;
  border-radius: 15px;
  border: 1px solid #CCCCCC;

  p {
    font-family: 'NanumSquareRoundOTFR';
    margin-left: -30px;
  }

  span {
    font-family: 'NanumSquareRoundOTFB';
    color: var(--main-color);
  }
`;

const RentButton = styled.button`
  width: 100%;
  margin-top: 20px;
  padding: 16px;
  font-family: 'NanumSquareRoundOTFB';
  font-size: 16px;
  border-radius: 30px;
  background-color: var(--main-color);
  border: none;
`;

function PackageDetailPage() {
  const [selectedPack, setSelectedPack] = useState('');
  const navigate = useNavigate();
  const [itemData, setItemData] = useState(null);
  const [avilablePackages, setAvilablePackages] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await api.get(`/api/v1/rentals/products/packages`);
        setItemData(response.data.data);
        const avilablePackagesRes = await api.get(`/api/v1/rentals/products/packages/available`);
        setAvilablePackages(avilablePackagesRes.data.data.availables);
      } catch {
        setError('상품 정보를 불러오는 데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    }
    fetchItem();
  }, []);

  const handleRentalButton = () => {
    if (!selectedPack) {
      alert('대여할 번호를 선택해주세요.');
      return;
    }
    sessionStorage.setItem('selectedPackage', selectedPack);
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '230px 0' }}>
        <ClipLoader size={50} color='var(--main-color)' />
        <p style={{ marginTop: '5px' }}>
          불러오는 중...
        </p>
      </div>
    );
  }
  if (error) {
    return <div>{error}</div>;
  }
  if (!itemData) {
    return null;
  }

  return (
      <>
        <HeaderBack/>
        <Container>
          <Image src={itemData.image} alt={itemData.name}/>
          <Title>{itemData.name}</Title>
          <Price>
            <Price1><span
                style={{color: '#53CF38'}}>{itemData.pricePerHour.toLocaleString()}</span>원</Price1>
            <Price2>/ 시간</Price2>
          </Price>

          <SelectBox
            value={selectedPack}
            onChange={(e) => setSelectedPack(e.target.value)}
          >
            <option value="">대여 가능한 번호 선택</option>
            {avilablePackages.map((pkg, index) => (
              <option key={index} value={pkg.serialNumber}>
                {pkg.serialNumber.slice(-2)}
              </option>
            ))}
          </SelectBox>

          <RentButton onClick={() => {
            handleRentalButton();
            navigate('/order-package-newAPI');
          }}>
            대여시작
          </RentButton>
        </Container>
      </>
  );
}

export default PackageDetailPage;