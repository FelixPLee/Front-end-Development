import React from 'react';
import { Link } from 'react-router-dom';
import '../../assets/css/Home.css';

const Home = () => {
    return (
        <div className="home-container">
            <div className="home-content">
                <h1 className="home-title">
                    Bem-vindo ao <span className="highlight">Estrelando</span>!
                </h1>
                
                <p className="home-description">
                    Seu catálogo pessoal para registrar, organizar e acompanhar o progresso de todas as suas séries favoritas. O que vamos assistir hoje?
                </p>
                
                <div className="home-actions">
                    <Link to="/lista" className="btn-home">
                        Minha SerieList
                    </Link>
                    
                    <Link to="/form" className="btn-home">
                        Adicionar Nova Série
                    </Link>
                    
                    <Link to="/about" className="btn-home">
                        Sobre o Projeto
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Home;