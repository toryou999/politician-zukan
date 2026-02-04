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

function App() {
  return (
    <BrowserRouter>
      <CabinetProvider>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<PartyList />} />
          <Route path="/party/:partyId" element={<PartyMemberList />} />
          <Route path="/politician/:id" element={<PoliticianDetail />} />
          <Route path="/my-cabinet" element={<MyCabinet />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
        </Routes>
        <CabinetFab />
        <PositionSelectModal />
        <Footer />
      </CabinetProvider>
    </BrowserRouter>
  )
}

export default App
