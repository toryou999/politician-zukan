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
        </Routes>
        <CabinetFab />
        <PositionSelectModal />
      </CabinetProvider>
    </BrowserRouter>
  )
}

export default App
