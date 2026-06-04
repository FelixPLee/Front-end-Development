import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import '../../assets/css/SerieForm.css';

const SerieForm = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    
    // Captura qual ID está na URL, seja edit ou view
    const editId = searchParams.get('edit');
    const viewId = searchParams.get('view');
    const activeId = editId || viewId;
    const isViewMode = Boolean(viewId); // Retorna true se estiver no modo de visualização

    const [serie, setSerie] = useState({
        titulo: '',
        numeroTemporadas: 1,
        categoria: '',
    });

    const [temporadas, setTemporadas] = useState([
        { id: Date.now(), numero: 1, dataLancamento: '', diretor: '', produtora: '', dataAssistido: '' }
    ]);

    useEffect(() => {
        if (activeId) {
            const seriesSalvas = JSON.parse(localStorage.getItem('seriesEstrelando')) || [];
            const serieEncontrada = seriesSalvas.find(s => s.id.toString() === activeId);

            if (serieEncontrada) {
                setSerie({
                    id: serieEncontrada.id,
                    titulo: serieEncontrada.titulo,
                    numeroTemporadas: serieEncontrada.numeroTemporadas,
                    categoria: serieEncontrada.categoria
                });
                setTemporadas(serieEncontrada.temporadas);
            }
        }
    }, [activeId]);

    const handleSerieChange = (e) => {
        const { name, value } = e.target;
        setSerie({ ...serie, [name]: value });
    };

    const handleTemporadaChange = (id, field, value) => {
        const novasTemporadas = temporadas.map((temp) => {
            if (temp.id === id) {
                return { ...temp, [field]: value };
            }
            return temp;
        });
        setTemporadas(novasTemporadas);
    };

    const adicionarTemporada = () => {
        const proximoNumero = temporadas.length + 1;
        const novaTemporada = {
            id: Date.now(),
            numero: proximoNumero,
            dataLancamento: '',
            diretor: '',
            produtora: '',
            dataAssistido: ''
        };
        setTemporadas([...temporadas, novaTemporada]);
        setSerie({ ...serie, numeroTemporadas: proximoNumero });
    };

    const removerTemporada = (id) => {
        const novasTemporadas = temporadas.filter(temp => temp.id !== id);
        setTemporadas(novasTemporadas);
        setSerie({ ...serie, numeroTemporadas: novasTemporadas.length });
    };

    // Troca o parâmetro da URL de ?view=id para ?edit=id, destravando o formulário
    const habilitarEdicao = () => {
        setSearchParams({ edit: viewId });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Se estiver em modo de visualização, o botão de submit não deve salvar nada
        if (isViewMode) return;

        const seriesSalvas = JSON.parse(localStorage.getItem('seriesEstrelando')) || [];

        if (editId) {
            const serieAtualizada = { ...serie, temporadas };
            const listaAtualizada = seriesSalvas.map(s => 
                s.id === serie.id ? serieAtualizada : s
            );
            localStorage.setItem('seriesEstrelando', JSON.stringify(listaAtualizada));
            alert('Série atualizada com sucesso!');
        } else {
            const novaSerie = { ...serie, id: Date.now(), temporadas };
            seriesSalvas.push(novaSerie);
            localStorage.setItem('seriesEstrelando', JSON.stringify(seriesSalvas));
            alert('Série salva com sucesso!');
        }

        navigate('/lista');
    };

    // Define o título do formulário com base no estado atual
    let formTitle = 'Registrar Série';
    if (isViewMode) formTitle = 'Visualizar Série';
    else if (editId) formTitle = 'Editar Série';

    return (
        <div className="form-container">
            <h1 className="form-title">{formTitle}</h1>
            
            <form onSubmit={handleSubmit}>
                <div className="form-section">
                    <h2>Dados da Série</h2>
                    <div className="input-group">
                        <label>Título:</label>
                        <input 
                            type="text" 
                            name="titulo" 
                            value={serie.titulo} 
                            onChange={handleSerieChange} 
                            disabled={isViewMode}
                            required 
                        />
                    </div>
                    
                    <div className="input-group-row">
                        <div className="input-group">
                            <label>Categoria/Gênero:</label>
                            <input 
                                type="text" 
                                name="categoria" 
                                value={serie.categoria} 
                                onChange={handleSerieChange} 
                                disabled={isViewMode}
                                required 
                            />
                        </div>
                        <div className="input-group">
                            <label>Nº de Temporadas (Automático):</label>
                            {/* Este campo é sempre desabilitado, não importa o modo */}
                            <input 
                                type="number" 
                                name="numeroTemporadas" 
                                value={serie.numeroTemporadas} 
                                disabled 
                            />
                        </div>
                    </div>
                </div>

                <hr className="divider" />

                <div className="form-section">
                    <h2>Temporadas</h2>
                    {temporadas.map((temp, index) => (
                        <div key={temp.id} className="temporada-card">
                            <div className="temporada-header">
                                <h3>Temporada {index + 1}</h3>
                                {/* Só mostra o botão de remover se NÃO estiver em view mode */}
                                {!isViewMode && temporadas.length > 1 && (
                                    <button 
                                        type="button" 
                                        className="btn-remove" 
                                        onClick={() => removerTemporada(temp.id)}
                                    >
                                        Remover
                                    </button>
                                )}
                            </div>

                            <div className="input-group-row">
                                <div className="input-group">
                                    <label>Data de Lançamento:</label>
                                    <input 
                                        type="date" 
                                        value={temp.dataLancamento} 
                                        onChange={(e) => handleTemporadaChange(temp.id, 'dataLancamento', e.target.value)} 
                                        disabled={isViewMode}
                                        required 
                                    />
                                </div>
                                <div className="input-group">
                                    <label>Data que Assistiu:</label>
                                    <input 
                                        type="date" 
                                        value={temp.dataAssistido} 
                                        onChange={(e) => handleTemporadaChange(temp.id, 'dataAssistido', e.target.value)} 
                                        disabled={isViewMode}
                                    />
                                </div>
                            </div>

                            <div className="input-group-row">
                                <div className="input-group">
                                    <label>Diretor:</label>
                                    <input 
                                        type="text" 
                                        value={temp.diretor} 
                                        onChange={(e) => handleTemporadaChange(temp.id, 'diretor', e.target.value)} 
                                        disabled={isViewMode}
                                    />
                                </div>
                                <div className="input-group">
                                    <label>Produtora:</label>
                                    <input 
                                        type="text" 
                                        value={temp.produtora} 
                                        onChange={(e) => handleTemporadaChange(temp.id, 'produtora', e.target.value)} 
                                        disabled={isViewMode}
                                    />
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* Só mostra o botão de adicionar temporada se NÃO estiver em view mode */}
                    {!isViewMode && (
                        <button type="button" className="btn-add" onClick={adicionarTemporada}>
                            + Adicionar Temporada
                        </button>
                    )}
                </div>

                <div className="form-actions">
                    {/* Renderização Condicional dos Botões Inferiores */}
                    {isViewMode ? (
                        <button type="button" className="btn-submit" onClick={habilitarEdicao}>
                            Habilitar Edição
                        </button>
                    ) : (
                        <button type="submit" className="btn-submit">
                            {editId ? 'Atualizar Série' : 'Salvar Série'}
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
};

export default SerieForm;