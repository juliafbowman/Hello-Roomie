import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import Navigation from './components/Navigation'
import AddProfilePage from './pages/AddProfilePage'; // getting an include error here - will fix or get rid of
// import './App.css';

function App() {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/add-profile" element={<AddProfilePage />} />
        { /* make homepage the default path */ }
        <Route path = '/' element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App; 