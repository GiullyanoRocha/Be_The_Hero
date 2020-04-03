/*  Login/index.js */ 
import React, {useState} from 'react';
import { Link, useHistory} from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';
import './styles.css';

import api from '../../services/api';

import logoImg from '../../assets/logo.svg';
import HeroesImg from '../../assets/heroes.png';


export default function Login(){
    const [id, setId] = useState('');
    const history = useHistory();

    async function handleLogin(e){
        e.preventDefault();

        try {
            const response = await api.post('/sessions', {id});

            localStorage.setItem('ongID', id);
            localStorage.setItem('ongName', response.date.name);
            history.push('/profile');
        } catch (err) {
            alert("Falha no Login, tente novamente");
        }
    }

    return (
        <div className= "login-container">
            <section className="form">
                <img src={logoImg} alt="Be the Hero"/>
                <form onSubmit={handleLogin}>
                    <h1>Faca seu Login</h1>

                    <input
                    placeholder="Sua ID"
                    value={id}
                    onChange={e => setId(e.target.value)}
                    />
                    <button className="button" type="submit">Login</button>

                    <Link className="back-link" to="/register" >
                        <FiLogIn size={16} color="#e02061"/>
                        Nao tenho Cadastro
                    </Link>
                </form>
            </section>
            <img src={HeroesImg} alt="heroes"/>
        </div>
    );
} 