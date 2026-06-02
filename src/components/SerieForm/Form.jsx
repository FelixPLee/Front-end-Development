import React, { useState } from 'react';
import '../../assets/css/Form.css';

let Form = () => {
    // Estado para os dados principais da série
    const [serie, setSerie] = useState({
        titulo: '',
        numeroTemporadas: 1,
        categoria: '',
    });

    // Estado para a lista de temporadas (elemento filho)
    const [temporadas, setTemporadas] = useState([
        { id: 1, numero: 1, dataLancamento: '', diretor: '', produtora: '', dataAssistido: '' }
    ]);

    // Atualiza os dados principais da série
    const handleSerieChange = (e) => {
        const { name, value } = e.target;
        setSerie({ ...serie, [name]: value });
    };

    // Atualiza os dados de uma temporada específica
    const handleTemporadaChange = (id, field, value) => {
        const novasTemporadas = temporadas.map((temp) => {
            if (temp.id === id) {
                return { ...temp, [field]: value };
            }
            return temp;
        });
        setTemporadas(novasTemporadas);
    };

    // Adiciona uma nova temporada ao array
    const adicionarTemporada = () => {
        const proximoNumero = temporadas.length + 1;
        const novaTemporada = {
            id: Date.now(), // Gera um ID único simples
            numero: proximoNumero,
            dataLancamento: '',
            diretor: '',
            produtora: '',
            dataAssistido: ''
        };
        setTemporadas([...temporadas, novaTemporada]);
        setSerie({ ...serie, numeroTemporadas: proximoNumero });
    };

    // Remove uma temporada específica
    const removerTemporada = (id) => {
        const novasTemporadas = temporadas.filter(temp => temp.id !== id);
        setTemporadas(novasTemporadas);
        setSerie({ ...serie, numeroTemporadas: novasTemporadas.length });
    };
// Lida com o envio do formulário
    const handleSubmit = (e) => {
        e.preventDefault();
        
        // 1. Monta o objeto final com um ID único para a série
        const novaSerie = { 
            ...serie, 
            id: Date.now(), // Gera um ID único baseado na data atual
            temporadas 
        };

        // 2. Busca os dados que já estão no localStorage (ou cria um array vazio se não houver nada)
        const seriesSalvas = JSON.parse(localStorage.getItem('seriesEstrelando')) || [];

        // 3. Adiciona a nova série ao array
        seriesSalvas.push(novaSerie);

        // 4. Salva o array atualizado de volta no localStorage (transformando em texto)
        localStorage.setItem('seriesEstrelando', JSON.stringify(seriesSalvas));

        console.log('Série Registrada e Salva:', novaSerie);
        alert('Série salva com sucesso!');
        
        // Opcional: Limpar o formulário após salvar
        setSerie({ titulo: '', numeroTemporadas: 1, categoria: '' });
        setTemporadas([{ id: Date.now(), numero: 1, dataLancamento: '', diretor: '', produtora: '', dataAssistido: '' }]);
    };

    return (
        <div className="form-container">
            <h1 className="form-title">Registrar Série</h1>
            
            <form onSubmit={handleSubmit}>
                {/* DADOS DA SÉRIE */}
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

                {/* DADOS DAS TEMPORADAS */}
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
                    <button type="submit" className="btn-submit">Salvar Série</button>
                </div>
            </form>
        </div>
    );
};

export default Form;