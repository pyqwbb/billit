import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import GlobalStyles from './styles/GlobalStyles';
import MainPage from './pages/MainPage';
import LoginPage from './pages/Member/LoginPage';
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
import EditAccountPage from './pages/Member/EditAccountPage';
import AccountDeleteSurveyPage from './pages/Member/AccountDeleteSurveyPage';
import CompleteDeleteAccountPage from './pages/Member/CompleteDeleteAccountPage';
import FaqPage from './pages/CustomerSupport/FaqPage';
import InquiryPage from './pages/CustomerSupport/InquiryPage';
import NoticesPage from './pages/CustomerSupport/NoticesPage';
import NoticeDetailPage from './pages/CustomerSupport/NoticeDetailPage';
import EventsPage from './pages/CustomerSupport/EventsPage';
import EventDetailPage from './pages/CustomerSupport/EventDetailPage';
import StationMapPage from './pages/RentalStations/StationMapPage';
import AvailableListPage from './pages/RentalStations/AvailableListPage';
import AvailableStationPage from './pages/RentalStations/AvailableStationPage';
import RentalItemsPage from './pages/RentalItems/RentalItemsPage';
import ItemDetailPage from './pages/RentalItems/ItemDetailPage';
import QrScanPage from './pages/Rental/QrScanPage';
import RentalOrReturn from './pages/Rental/RentalOrReturn';
import RentalTimePage from './pages/Rental/RentalTimePage';
import OrderConfirmPage from './pages/Rental/OrderConfirmPage';
import RentalCompletePage from './pages/Rental/RentalCompletePage';
import ReturnCompletePage from './pages/Rental/ReturnCompletePage';
import TermsAgreementPage from './pages/Member/TermsAgreementPage';

function AppWrapper() {
  return (
    <>
      <GlobalStyles />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginPage />} />
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
        <Route path="/account-settings/edit" element={<EditAccountPage />} />
        <Route path="/account-delete-survey" element={<AccountDeleteSurveyPage />} />
        <Route path="/complete-delete-account" element={<CompleteDeleteAccountPage />} />
        <Route path="/faq" element={<FaqPage />} />
        <Route path="/inquiry" element={<InquiryPage />} />
        <Route path="/notices" element={<NoticesPage />} />
        <Route path="/notices/:id" element={<NoticeDetailPage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/events/:id" element={<EventDetailPage />} />
        <Route path="/station-map" element={<StationMapPage />} />
        <Route path="/available-list" element={<AvailableListPage />} />
        <Route path="/available-station" element={<AvailableStationPage />} />
        <Route path="/rental-items" element={<RentalItemsPage />} />
        <Route path="/rental-items/:productName" element={<ItemDetailPage />} />
        <Route path="/qr-scan" element={<QrScanPage />} />
        <Route path="/rental-or-return" element={<RentalOrReturn />} />
        <Route path="/rental-time" element={<RentalTimePage />} />
        <Route path="/order-confirm" element={<OrderConfirmPage />} />
        <Route path="/rental-complete" element={<RentalCompletePage />} />
        <Route path="/return-complete" element={<ReturnCompletePage />} />
        <Route path="/terms-agreement" element={<TermsAgreementPage />} />
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
