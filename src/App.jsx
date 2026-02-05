import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { CabinetProvider } from './contexts/CabinetContext'
import PartyList from './pages/PartyList'
import PartyMemberList from './pages/PartyMemberList'
import PoliticianDetail from './pages/PoliticianDetail'
import MyCabinet from './pages/MyCabinet'
import ScrollToTop from './components/ScrollToTop'
import CabinetFab from './components/CabinetFab'
import PositionSelectModal from './components/PositionSelectModal'
import Terms from './pages/Terms'
import Privacy from './pages/Privacy'
import Footer from './components/Footer'
import Header from './components/Header' // 新規追加
import Login from './pages/Login' // 新規追加
import MyPage from './pages/MyPage' // 新規追加
import { AuthProvider } from './contexts/AuthContext' // 新規追加

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CabinetProvider>
          <ScrollToTop />
          <Header />
          <Routes>
            <Route path="/" element={<PartyList />} />
            <Route path="/party/:partyId" element={<PartyMemberList />} />
            <Route path="/politician/:id" element={<PoliticianDetail />} />
            <Route path="/my-cabinet" element={<MyCabinet />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/login" element={<Login />} />
            <Route path="/mypage" element={<MyPage />} />
          </Routes>
          <CabinetFab />
          <PositionSelectModal />
          <Footer />
        </CabinetProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
