
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Nav/Navbar.jsx';
import Home from './components/Home/Home.jsx';

function App() {
  return (
    <Router>
      <div className="App bg-red-100">
        <Navbar />
        <main className="p-4">
          <Routes>
            <Route path="/home" element={<Home />} />
            {/* Otras rutas según sea necesario */}
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;

