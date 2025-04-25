import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import Navigation from './components/Navigation'
// getting an include error here - will fix or get rid of
import AddProfilePage from './pages/AddProfilePage';
import BestMatch from './pages/BestMatch';
import AllProfiles from './pages/AllProfiles.jsx'

// import './App.css';

function App() {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/add-profile" element={<AddProfilePage />} />
        { /* make homepage the default path */ }
        <Route path = '/' element={<Home />} />
        <Route path="/best-match" element={<BestMatch />} />
        <Route path="/all-profiles" element={<AllProfiles />} />
      </Routes>
    </Router>
  );
}

export default App; 