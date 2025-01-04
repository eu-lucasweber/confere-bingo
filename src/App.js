import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Parts/Header';
import Footer from './components/Parts/Footer';
import Home from './components/Home/Home';
import MinhasCartelas from './components/Cartela/MinhasCartelas'
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <div className='backgraund'>
          <img src="/capa.png" alt="capa" className='img'/>
        </div>
        <Header />
          <Routes>
            <Route exact path="/" element={<Home/>} />
            <Route path="/minhasCartelas" element={<MinhasCartelas/>} />
            <Route path="/novoJogo" element={<Home/>} />
            <Route path="/continuarJogo" element={<Home/>} />
          </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
