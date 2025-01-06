import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Parts/Header';
import Footer from './components/Parts/Footer';
import Home from './components/Home/Home';
import MinhasCartelas from './components/Cartela/MinhasCartelas'
import NovaCartela from './components/Cartela/NovaCartela'
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
            <Route path="/novoJogo" element={<Home/>} />
            <Route path="/continuarJogo" element={<Home/>} />
            <Route path="/minhasCartelas/:id" element={<MinhasCartelas editar={true} />} />
            <Route path="/minhasCartelas/editar/:id" element={<MinhasCartelas editar={false} />} />
            <Route path="/minhasCartelas/nova" element={<NovaCartela />} />
          </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
