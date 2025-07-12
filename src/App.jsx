import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import MainPage from './pages/MainPage';
import MenuPage from './pages/MenuPage';
import MyPage from './pages/Member/MyPage';
import ServiceInfoPage from './pages/CustomerSupport/service/ServiceInfoPage';
import TermsPage from './pages/CustomerSupport/service/TermsPage';
import PrivacyPage from './pages/CustomerSupport/service/PrivacyPage';
import LicensePage from './pages/CustomerSupport/service/LicensePage';
import VersionPage from './pages/CustomerSupport/service/VersionPage';
import HistoryPage from './pages/Rental/HistoryPage';
import HistoryDetailPage from './pages/Rental/HistoryDetailPage';
import ReturnPage from './pages/Rental/ReturnPage';
import AccountSettingsPage from './pages/Member/AccountSettingsPage';
import AccountDeleteSurveyPage from './pages/Member/AccountDeleteSurveyPage';
import FaqPage from './pages/CustomerSupport/FaqPage';
import InquiryPage from './pages/CustomerSupport/InquiryPage';
import NoticesPage from './pages/CustomerSupport/NoticesPage';
import NoticeDetailPage from './pages/CustomerSupport/NoticeDetailPage';
import EventsPage from './pages/CustomerSupport/EventsPage';
import StationMapPage from './pages/RentalStations/StationMapPage';
import RentalItemsPage from './pages/RentalItems/RentalItemsPage';
import QrScanPage from './pages/Rental/QrScanPage';
import RentalOrReturn from './pages/Rental/RentalOrReturn';

function AppWrapper() {
  const location = useLocation();
  
  const hideHeaderPaths = [
    '/menu',
    '/rental-or-return',
    '/service-info',
    '/service-info/terms',
    '/service-info/privacy',
    '/service-info/license',
    '/service-info/version',
  ];

  return (
    <>
      {!hideHeaderPaths.includes(location.pathname) && <Header />}
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/service-info" element={<ServiceInfoPage />} />
        <Route path="/service-info/terms" element={<TermsPage />} />
        <Route path="/service-info/privacy" element={<PrivacyPage />} />
        <Route path="/service-info/license" element={<LicensePage />} />
        <Route path="/service-info/version" element={<VersionPage />} />
        <Route path="/history" element={<HistoryPage />} />
        <Route path="/history/:id" element={<HistoryDetailPage />} />
        <Route path="/return/:id" element={<ReturnPage />} />
        <Route path="/account-settings" element={<AccountSettingsPage />} />
        <Route path="/account-delete-survey" element={<AccountDeleteSurveyPage />} />
        <Route path="/faq" element={<FaqPage />} />
        <Route path="/inquiry" element={<InquiryPage />} />
        <Route path="/notices" element={<NoticesPage />} />
        <Route path="/notices/:id" element={<NoticeDetailPage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/station-map" element={<StationMapPage />} />
        <Route path="/rental-items" element={<RentalItemsPage />} />
        <Route path="/qr-scan" element={<QrScanPage />} />
        <Route path="/rental-or-return" element={<RentalOrReturn />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}

export default App;
