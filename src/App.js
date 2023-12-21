
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Nav/Navbar.jsx';
import Home from './components/Home/Home.jsx';
import CoinDetail from './components/CoinDetail/CoinDetail.jsx';
import Trending from './components/Trending/Trending.jsx';
import Footer from './components/Footer/Footer.jsx';
function App() {
  return (
    <Router>
      <div className="App bg-rose-200">
        <Navbar />
        <main className="p-4">
          <Routes>
          <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/coinDetail/:id" element={<CoinDetail />} />
            <Route path="/trending" element={<Trending />} />
            {/* Otras rutas según sea necesario */}
          </Routes>
        </main>
      </div>
      <Footer />
    </Router>
  );
}

export default App;

