import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import MainPage from './pages/MainPage';
import MenuPage from './pages/MenuPage';
import MyPage from './pages/MyPage';
import ServiceInfoPage from './pages/ServiceInfoPage';
import HistoryPage from './pages/HistoryPage';
import AccountSettingsPage from './pages/AccountSettingsPage';
import AccountDeleteSurveyPage from './pages/AccountDeleteSurveyPage';
import FaqPage from './pages/FaqPage';
import InquiryPage from './pages/InquiryPage';
import NoticesPage from './pages/NoticesPage';
import NoticeDetailPage from './pages/NoticeDetailPage';
import EventsPage from './pages/EventsPage';
import StationMapPage from './pages/StationMapPage';
import RentalItemsPage from './pages/RentalItemsPage';
import QrScanPage from './pages/QrScanPage';

function AppWrapper() {
  const location = useLocation();
  const hideHeaderPaths = ['/service-info', '/menu'];

  return (
    <>
      {!hideHeaderPaths.includes(location.pathname) && <Header />}
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/service-info" element={<ServiceInfoPage />} />
        <Route path="/history" element={<HistoryPage />} />
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
