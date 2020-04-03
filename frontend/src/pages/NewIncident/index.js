import React, { useState } from 'react';
import { Link, useHistory} from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import './styles.css';

import api from '../../services/api';

import logoImg from '../../assets/logo.svg';

export default function NewIncident(){
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');

    const history = useHistory();
    const ongId = localStorage.getItem('ongId');

    async function handleNewIncident(e){
        e.preventDefault();

        const data = {
            title,
            description,
            value,
        };

        history.push('/profile');
        try {
            await api.post('incidents', data, {
                headers: {
                    Authorization: ongId
                }
            });
        } catch (err) {
            alert("Erro ao cadastrar caso, tente novamente.");
        }

    }

    return ( 
    <div className="new-incident-container">
        <div className="content">
            <section>
                <img src={logoImg} alt="Be the Hero" />

                <h1>Cadastrar Novo Caso</h1>
                <p>Descreve o caso detalhadamente para encontrar um Heroi e resolver isso.</p>

                <Link className="back-link" to="/profile" >
                    <FiArrowLeft size={16} color="#e02061"/>
                    Voltar para Home
                </Link>
            </section>

            <form onSubmit={handleNewIncident}>
                <input placeholder="Titulo do caso" />
                <textarea placeholder="Descricao" />
                <input placeholder="Valor em Reais" />

                <button className="button" type="submit">Cadastrar</button>
            </form>
        </div>
    </div>
    );
}