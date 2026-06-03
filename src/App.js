import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import Home from './components/Home/Home';
import Sobre from './components/Sobre/Sobre';
import Form from './components/SerieForm/Form';
import Lista from './components/Lista/Lista';


function App() {
    return (
        <Router>
            {/* Aplicação da paleta base para o fundo da tela inteira */}
            <div className="App" style={{ backgroundColor: '#E6D5B8', minHeight: '100vh', color: '#1C1C1C' }}>
                <NavBar />
                
                <main style={{ padding: '2rem' }}>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/about" element={<Sobre />} />
                        <Route path="/lista" element={<Lista />} />
                        <Route path="/form" element={<Form />} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
}

export default App;