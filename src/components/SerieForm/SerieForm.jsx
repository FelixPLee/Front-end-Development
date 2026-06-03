import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import '../../assets/css/SerieForm.css';

const SerieForm = () => {
    // Hooks de navegação e leitura de URL
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    
    // Captura o ID da URL se ele existir (ex: ?edit=1711234567)
    const editId = searchParams.get('edit');

    const [serie, setSerie] = useState({
        titulo: '',
        numeroTemporadas: 1,
        categoria: '',
    });

    const [temporadas, setTemporadas] = useState([
        { id: Date.now(), numero: 1, dataLancamento: '', diretor: '', produtora: '', dataAssistido: '' }
    ]);

    // EFEITO DE CARREGAMENTO (Modo Edição)
    useEffect(() => {
        // Se existe um ID na URL, significa que o usuário quer editar
        if (editId) {
            const seriesSalvas = JSON.parse(localStorage.getItem('seriesEstrelando')) || [];
            
            // O método .find() procura na lista a série que tem o ID igual ao da URL
            // O editId vem como texto da URL, então transformamos o id da série em texto para comparar
            const serieEncontrada = seriesSalvas.find(s => s.id.toString() === editId);

            if (serieEncontrada) {
                // Se encontrou a série, preenche os estados com os dados dela
                setSerie({
                    id: serieEncontrada.id, // Mantemos o ID original oculto no estado
                    titulo: serieEncontrada.titulo,
                    numeroTemporadas: serieEncontrada.numeroTemporadas,
                    categoria: serieEncontrada.categoria
                });
                setTemporadas(serieEncontrada.temporadas);
            }
        }
    }, [editId]); // O useEffect roda toda vez que o editId mudar

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

    // NOVA LÓGICA DE SALVAR (Criação vs Atualização)
    const handleSubmit = (e) => {
        e.preventDefault();
        const seriesSalvas = JSON.parse(localStorage.getItem('seriesEstrelando')) || [];

        if (serie.id) {
            // MODO EDIÇÃO: A série já tem um ID no estado
            const serieAtualizada = { ...serie, temporadas };
            
            // Usamos .map() para substituir a série antiga pela atualizada na lista
            const listaAtualizada = seriesSalvas.map(s => 
                s.id === serie.id ? serieAtualizada : s
            );
            
            localStorage.setItem('seriesEstrelando', JSON.stringify(listaAtualizada));
            alert('Série atualizada com sucesso!');
        } else {
            // MODO CRIAÇÃO: É uma série nova
            const novaSerie = { ...serie, id: Date.now(), temporadas };
            seriesSalvas.push(novaSerie);
            
            localStorage.setItem('seriesEstrelando', JSON.stringify(seriesSalvas));
            alert('Série salva com sucesso!');
        }

        // Redireciona o usuário de volta para a tabela após salvar
        navigate('/lista');
    };

    return (
        <div className="form-container">
            {/* Muda o título dependendo se está editando ou criando */}
            <h1 className="form-title">{editId ? 'Editar Série' : 'Registrar Série'}</h1>
            
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
                                required 
                            />
                        </div>
                        <div className="input-group">
                            <label>Nº de Temporadas (Automático):</label>
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
                                {temporadas.length > 1 && (
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
                                        required 
                                    />
                                </div>
                                <div className="input-group">
                                    <label>Data que Assistiu:</label>
                                    <input 
                                        type="date" 
                                        value={temp.dataAssistido} 
                                        onChange={(e) => handleTemporadaChange(temp.id, 'dataAssistido', e.target.value)} 
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
                                    />
                                </div>
                                <div className="input-group">
                                    <label>Produtora:</label>
                                    <input 
                                        type="text" 
                                        value={temp.produtora} 
                                        onChange={(e) => handleTemporadaChange(temp.id, 'produtora', e.target.value)} 
                                    />
                                </div>
                            </div>
                        </div>
                    ))}

                    <button type="button" className="btn-add" onClick={adicionarTemporada}>
                        + Adicionar Temporada
                    </button>
                </div>

                <div className="form-actions">
                    {/* Botão também muda de texto dependendo da ação */}
                    <button type="submit" className="btn-submit">
                        {editId ? 'Atualizar Série' : 'Salvar Série'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default SerieForm;