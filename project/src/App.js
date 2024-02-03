
import './App.css';
import Navbar from "./components/Navbar"
import Home from './components/Home';

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Login from './components/Login';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />

        </Routes>
      </Router>
    </div>
  );
}

export default App;
