import React from 'react';
import imgForm from '../../assets/figures/exemplo_form.png';
import imgLista from '../../assets/figures/exemplo_lista.png';
import '../../assets/css/Sobre.css';

const Sobre = () => {
    return (
        <div className="sobre-container">
            {/* Seção 1: Propósito */}
            <section className="sobre-section intro">
                <h1 className="sobre-title">Sobre o Estrelando</h1>
                <p className="sobre-text">
                    O <strong>Estrelando</strong> nasceu da necessidade de organizar a jornada cinematográfica de cada usuário. 
                    Nosso propósito é oferecer uma plataforma centralizada onde você pode registrar todas as séries que já assistiu, 
                    mantendo um histórico detalhado de cada temporada, diretor e produtora, transformando sua memória em um catálogo digital personalizado.
                </p>
            </section>

            {/* Seção 2: O Formulário (Imagem na Esquerda) */}
            <section className="sobre-section alternate">
                <div className="sobre-image-container">
                    <img src={require('./../../assets/figures/exemplo_form.png')} alt="Exemplo do Formulário" className="sobre-img" />
                </div>
                <div className="sobre-content">
                    <h2>Gestão Detalhada</h2>
                    <p className="sobre-text">
                        Nosso formulário foi projetado para ser dinâmico e intuitivo. Nele, você registra o título principal, 
                        a categoria e, de forma aninhada, cada temporada individualmente. Para cada temporada, é possível 
                        anotar dados técnicos como diretor e produtora, além de datas importantes de lançamento e visualização.
                    </p>
                </div>
            </section>

            {/* Seção 3: A Lista (Imagem na Direita) */}
            <section className="sobre-section">
                <div className="sobre-content">
                    <h2>Sua Coleção Viva</h2>
                    <p className="sobre-text">
                        A página de Lista oferece uma visão macro de toda a sua coleção. Através de uma tabela organizada, 
                        você tem acesso rápido a todas as séries registradas. A interatividade é o ponto chave: você pode 
                        acessar a visualização detalhada, entrar no modo de edição para ajustar informações ou excluir registros 
                        com confirmação de segurança, garantindo controle total sobre seus dados.
                    </p>
                </div>
                <div className="sobre-image-container">
                    <img src={require('./../../assets/figures/exemplo_lista.png')} alt="Exemplo da Lista" className="sobre-img" />
                </div>
            </section>
        </div>
    );
};

export default Sobre;