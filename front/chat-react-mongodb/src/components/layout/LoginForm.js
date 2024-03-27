/* global location */

import { useState } from 'react';
import styles from './LoginForm.module.css';
import { Link } from 'react-router-dom';


function LoginForm(){
    
    const [emailDigitado,setEmailDigitado] = useState('');
    const [senhadigitada, setSenhaDigitada] = useState('');
    

    function setarEmail(e){
        setEmailDigitado(e.target.value);
    };

    function setarSenha(e){
        setSenhaDigitada(e.target.value);
    };

    function getEnterKey(e){
        if(e.key === 'Enter')
        {loginEnviar()};
    };

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
        
    }; 

    
    return(
            <div className="container-fluid">
                        <div className="row justify-content-center align-items-center min-vh-100" id={styles.image}>
                            <div className="col-9 col-sm-9 col-xl-4">
                                <div className="card bg-dark bg-opacity-50">
                                    <div className="card-body">
                                            <h1 className="card-title text-white justify-content-center text-center">Full-Chat!</h1>
                                            <div>
                                                <div className="mb-3">
                                                    <label htmlFor='email' className="form-label text-white">Email</label>
                                                    <input type="email" id="email" placeholder='email' className="form-control" onChange={setarEmail}></input>
                                                </div>
                                                <div className="mb-3">
                                                    <label htmlFor='senha' className="form-label text-white">Senha </label>
                                                    <input type="password" id="senha" placeholder='senha' className="form-control" onChange={setarSenha} onKeyDown={(e)=>getEnterKey(e)}></input>
                                                </div>
                                            </div>
                                            <div className="d-grid gap-2">
                                                <button onClick={loginEnviar} className="btn btn-success">Entrar</button>
                                                <button className="btn btn-dark">
                                                    <Link to="/cadastro" className="text-white text-decoration-none">Registrar-se</Link>
                                                </button>  
                                            </div>
                                    </div>
                                </div>
                            </div>
                        </div>          
            </div>

            
    )
};

export default LoginForm;

