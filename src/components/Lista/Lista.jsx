// Adicione o useEffect na importação do React
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../assets/css/Lista.css';

const Lista = () => {
    // Começamos com um array vazio em vez dos dados fictícios
    const [series, setSeries] = useState([]);
    const [modalAberto, setModalAberto] = useState(false);
    const [serieParaDeletar, setSerieParaDeletar] = useState(null);

    const navigate = useNavigate();

    // O useEffect roda automaticamente quando a página de Lista é aberta
    useEffect(() => {
        // Busca os dados do localStorage e atualiza o estado da tabela
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
        // Filtra removendo a série da tela
        const novaLista = series.filter(serie => serie.id !== serieParaDeletar.id);
        
        // Atualiza a tela
        setSeries(novaLista);
        
        // Atualiza o localStorage apagando a série definitivamente
        localStorage.setItem('seriesEstrelando', JSON.stringify(novaLista));
        
        fecharModal();
    };

    const handleEditar = (id) => {
        navigate(`/form?edit=${id}`);
    };

    // ... (o restante do return com a tabela e o modal continua exatamente igual)

    return (
        <div className="lista-container">
            <h1 className="lista-title">Minhas Séries</h1>

            <table className="series-table">
                <thead>
                    <tr>
                        <th>Título da Série</th>
                        <th>Editar</th>
                        <th>Excluir</th>
                    </tr>
                </thead>
                <tbody>
                    {series.map((serie) => (
                        <tr key={serie.id}>
                            {/* Coluna 1: Título como âncora para o Form */}
                            <td>
                                <Link to={`/form?view=${serie.id}`} className="serie-link">
                                    {serie.titulo}
                                </Link>
                            </td>
                            
                            {/* Coluna 2: Botão de Edição */}
                            <td>
                                <button 
                                    className="btn-edit" 
                                    onClick={() => handleEditar(serie.id)}
                                >
                                    Editar
                                </button>
                            </td>
                            
                            {/* Coluna 3: Botão de Deleção (Abre Modal) */}
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

                    {/* Última linha: Adicionar Série */}
                    <tr className="row-add">
                        <td colSpan="3">
                            <Link to="/form" className="btn-add-table">
                                + Adicionar Série à Lista
                            </Link>
                        </td>
                    </tr>
                </tbody>
            </table>

            {/* Modal de Confirmação */}
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

export default Lista;