import { useState } from "react";
import styles from "./Register.module.css";
import { Link } from 'react-router-dom';

function Register(){



    const [emailNovoCadastro, setEmailNovoCadastro] = useState();
    const [senhaNovoCadastro, setSenhaNovoCadastro] = useState();
    const [nomeNovoCadastro, setNomeNovoCadastro] = useState();
    const [sobrenomeNovoCadastro, setSobrenomeNovoCadastro] = useState();

    function cadastrarNovoUsuario(){
        fetch('http://localhost:8081/registro', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                    email: emailNovoCadastro,
                    senha: senhaNovoCadastro,
                    nome: nomeNovoCadastro,
                    sobrenome: sobrenomeNovoCadastro    
            })
        }).then((response)=>{
            return response.json();
        }).then((data)=>{
            console.log(data);
            alert(data);
        }).catch((err)=>{
            console.log(err);
        })
    };


    function setarEmailCadastro (e){
        setEmailNovoCadastro(e.target.value)
    };

    function setarSenhaCadastro (e){
        setSenhaNovoCadastro(e.target.value)
    };

    function setarNomeCadastro (e){
        setNomeNovoCadastro(e.target.value)
    };

    function setarSobreNomeCadastro (e){
        setSobrenomeNovoCadastro(e.target.value)
    };


    return(
        <div  className={styles.mainScrenRegister}>   
              
            <div className={styles.ScrenRegister} >
                <h1>Cadastre o seu acesso!</h1>  
                <div className={styles.ScrenCampos}>  
                    <div>
                        <label htmlFor='email'></label>
                        <input onChange={setarEmailCadastro} type="email" placeholder="Digite aqui o seu email válido"id="email"></input>
                    </div>
                    <div>
                        <label htmlFor='senha'></label>
                        <input onChange={setarSenhaCadastro}type="password" placeholder="Crie uma senha forte"id="senha"></input>
                    </div>
                    <div>
                        <label htmlFor='nome'></label>
                        <input onChange={setarNomeCadastro} type="text" placeholder="Digite o seu primeiro nome" id="nome"></input>
                    </div>
                    <div>
                        <label htmlFor='sobrenome'></label>
                        <input onChange={setarSobreNomeCadastro} type="text" placeholder="Digite o seu sobrenome" id="sobrenome"></input>
                    </div>
                    <div>
                        <button onClick={cadastrarNovoUsuario}>Cadastrar</button> 
                    </div>
                    <div>
                        <Link to="/login" className={styles.botaoHome}>Ir para página de Login</Link>
                    </div>
                </div>
             </div>    
        </div>
    )
};

export default Register;