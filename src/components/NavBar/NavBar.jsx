import React from 'react';
import { Link } from 'react-router-dom';
import '../../assets/css/NavBar.css';

const NavBar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-brand">
                {<img src={require('./../../assets/figures/estrelaLogo.png')} alt="Logo Estrelando" />}
                <h2><Link to="/">Estrelando</Link></h2>
            </div>
            <ul className="navbar-links">
                <li>
                    <Link to="/">Início</Link>
                </li>
                <li>
                    <Link to="/about">Sobre</Link>
                </li>
                <li>
                    <Link to="/lista">Minha Lista</Link>
                </li>
                <li>
                    <Link to="/form">Adicionar Série</Link>
                </li>
            </ul>
        </nav>
    );
};

export default NavBar;