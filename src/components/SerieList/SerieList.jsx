import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../assets/css/SerieList.css';

const SerieList = () => {
    const [series, setSeries] = useState([]);
    const [modalAberto, setModalAberto] = useState(false);
    const [serieParaDeletar, setSerieParaDeletar] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        const seriesSalvas = JSON.parse(localStorage.getItem('seriesEstrelando')) || [];
        setSeries(seriesSalvas);
    }, []);

    const abrirModal = (serie) => {
        setSerieParaDeletar(serie);
        setModalAberto(true);
    };

    const fecharModal = () => {
        setModalAberto(false);
        setSerieParaDeletar(null);
    };

    const confirmarDelecao = () => {
        const novaLista = series.filter(serie => serie.id !== serieParaDeletar.id);
        setSeries(novaLista);
        localStorage.setItem('seriesEstrelando', JSON.stringify(novaLista));
        fecharModal();
    };

    // Novas funções de navegação
    const handleVisualizar = (id) => {
        navigate(`/form?view=${id}`); // Mantive a rota /form, ajuste se tiver alterado no App.js
    };

    const handleEditar = (id) => {
        navigate(`/form?edit=${id}`);
    };

    return (
        <div className="lista-container">
            <h1 className="lista-title">Minhas Séries</h1>

            <table className="series-table">
                <thead>
                    <tr>
                        <th>Título da Série</th>
                        <th>Visualizar</th>
                        <th>Editar</th>
                        <th>Excluir</th>
                    </tr>
                </thead>
                <tbody>
                    {series.map((serie) => (
                        <tr key={serie.id}>
                            <td className="serie-titulo-texto">{serie.titulo}</td>
                            
                            {/* Coluna Visualizar */}
                            <td>
                                <button 
                                    className="btn-view" 
                                    onClick={() => handleVisualizar(serie.id)}
                                >
                                    Ver Detalhes
                                </button>
                            </td>
                            
                            {/* Coluna Editar */}
                            <td>
                                <button 
                                    className="btn-edit" 
                                    onClick={() => handleEditar(serie.id)}
                                >
                                    Editar
                                </button>
                            </td>
                            
                            {/* Coluna Excluir */}
                            <td>
                                <button 
                                    className="btn-delete" 
                                    onClick={() => abrirModal(serie)}
                                >
                                    Deletar
                                </button>
                            </td>
                        </tr>
                    ))}

                    <tr className="row-add">
                        <td colSpan="4">
                            <Link to="/form" className="btn-add-table">
                                + Adicionar Série à Lista
                            </Link>
                        </td>
                    </tr>
                </tbody>
            </table>

            {modalAberto && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h2>Atenção!</h2>
                        <p>
                            Tem certeza que deseja deletar a série <strong>{serieParaDeletar?.titulo}</strong> da sua lista?
                        </p>
                        <div className="modal-actions">
                            <button className="btn-cancel" onClick={fecharModal}>Cancelar</button>
                            <button className="btn-confirm" onClick={confirmarDelecao}>Sim, Deletar</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SerieList;