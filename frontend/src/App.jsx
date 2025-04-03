import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import Navigation from './components/Navigation'

function App() {
  return (
    <Router>
      <Navigation />
      <Routes>
        { /* make homepage the default path */ }
        <Route path = '/' element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App; 