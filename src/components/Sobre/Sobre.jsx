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

            {/* Seção 2: O Formulário (SerieForm) */}
            <section className="sobre-section alternate">
                <div className="sobre-image-container">
                    <img src={imgForm} alt="Exemplo do Formulário" className="sobre-img" />
                </div>
                <div className="sobre-content">
                    <h2>Gestão Detalhada com SerieForm</h2>
                    <p className="sobre-text">
                        O componente <strong>SerieForm</strong> foi projetado para ser dinâmico e seguro. Nele, você registra os dados principais 
                        e aninha cada temporada individualmente. Para proteger seus registros contra alterações acidentais, ele conta com um 
                        <strong> Modo de Visualização</strong> (somente leitura). Caso precise alterar algo, basta um clique em "Habilitar Edição" 
                        para destravar os campos e atualizar sua série.
                    </p>
                </div>
            </section>

            {/* Seção 3: A Lista (SerieList) */}
            <section className="sobre-section">
                <div className="sobre-content">
                    <h2>Sua Coleção Viva no SerieList</h2>
                    <p className="sobre-text">
                        O <strong>SerieList</strong> oferece uma visão macro de toda a sua coleção. Através de uma tabela organizada, 
                        você tem acesso rápido a todas as séries registradas. A interatividade é o ponto chave: você pode abrir os detalhes 
                        completos de uma série no modo de visualização, entrar diretamente no modo de edição rápida, ou excluir registros 
                        com um modal de confirmação de segurança.
                    </p>
                </div>
                <div className="sobre-image-container">
                    <img src={imgLista} alt="Exemplo da Lista" className="sobre-img" />
                </div>
            </section>
        </div>
    );
};

export default Sobre;