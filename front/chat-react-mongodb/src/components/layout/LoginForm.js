/* global location */

import { useState } from 'react';
import styles from './LoginForm.module.css';
import { Link, Navigate } from 'react-router-dom';
import io from 'socket.io-client';


function LoginForm({setSocket}){
    
    const [emailDigitado,setEmailDigitado] = useState('');
    const [senhadigitada, setSenhaDigitada] = useState('');

    function setarEmail(e){
        setEmailDigitado(e.target.value);
    };

    function setarSenha(e){
        setSenhaDigitada(e.target.value);
    };


    //function criar socket
    async function logarCriarSocket(){
        const username = localStorage.getItem('email');
        const socket = await io.connect('http://localhost:8081')
        socket.emit('set_username', username);
        setSocket(socket)
        ;}


    function loginEnviar(){

        fetch('http://localhost:8081/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({email: emailDigitado, senha: senhadigitada})
        }).then((response)=>{
             return response.json();
        }).then((data)=>{
            if(data === null){
                alert("usuário ou senha incorretos!")
            }else{
            localStorage.setItem('email', data.email);        
            localStorage.setItem('key',true);
            window.location.reload();  
        };
        }).catch((err)=>{
            console.log(err);
        });

        logarCriarSocket();
        
    }; 

    

   

    return(
            <div className={styles.telaMaior}>
                <div className={styles.campoEmail}>
                    <label htmlFor='email'>Email: </label>
                    <input type="email" id="email" onChange={setarEmail}></input>
                </div>
                <div className={styles.campoSenha}>
                    <label htmlFor='senha'>Senha: </label>
                    <input type="password" id="senha" onChange={setarSenha}></input>
                </div>
                <div className={styles.campoBotaoEntrar}>
                    <button onClick={loginEnviar}>Entrar</button> 
                </div>
                <div className={styles.campoBotaoRegistrar}>
                    <button><Link to="/cadastro">Registrar-se</Link></button> 
                </div>
                
            </div>             
            
    )
};

export default LoginForm;

