import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import Form from './components/SerieForm/Form';
import Lista from './components/Lista/Lista';

// Componentes temporários (Placeholders) para as páginas
const Home = () => <div><h1>Início</h1><p>Página de apresentação básica.</p></div>;
const About = () => <div><h1>Sobre</h1><p>Sobre o projeto.</p></div>;
//const Lista = () => <div><h1>Lista de Séries</h1><p>Tabela de séries virá aqui.</p></div>;
//const Form = () => <div><h1>Formulário de Série</h1><p>Adicionar ou editar séries.</p></div>;

function App() {
    return (
        <Router>
            {/* Aplicação da paleta base para o fundo da tela inteira */}
            <div className="App" style={{ backgroundColor: '#E6D5B8', minHeight: '100vh', color: '#1C1C1C' }}>
                <NavBar />
                
                <main style={{ padding: '2rem' }}>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/lista" element={<Lista />} />
                        <Route path="/form" element={<Form />} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
}

export default App;