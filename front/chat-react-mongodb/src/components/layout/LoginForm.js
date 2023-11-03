import { useState } from 'react';
import styles from './LoginForm.module.css';


function LoginForm(){
    
    const [emailDigitado,setEmailDigitado] = useState('');
    const [senhadigitada, setSenhaDigitada] = useState('');

    function setarEmail(e){
        setEmailDigitado(e.target.value);
    };

    function setarSenha(e){
        setSenhaDigitada(e.target.value);
    }

    function loginEnviar(){

        fetch('http://localhost:8081/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({email: emailDigitado, senha: senhadigitada})
        }).then((response)=>{
             return JSON.parse(response);
        }).then((data)=>{
            console.log(data);
        }).catch((err)=>{
            console.log(err);
        });
        
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
                    <button>Registrar-se</button> 
                </div>
                
            </div>             
            
    )
};

export default LoginForm;

