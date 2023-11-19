import { useState } from "react";
import styles from "./Register.module.css";


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
        <div>   
             <div>
                    <label htmlFor='email'>Email: </label>
                    <input onChange={setarEmailCadastro} type="email" id="email"></input>
                </div>
                <div>
                    <label htmlFor='senha'>Senha: </label>
                    <input onChange={setarSenhaCadastro}type="password" id="senha"></input>
                </div>
                <div>
                    <label htmlFor='nome'>Nome: </label>
                    <input onChange={setarNomeCadastro} type="text" id="nome"></input>
                </div>
                <div>
                    <label htmlFor='sobrenome'>Sobrenome: </label>
                    <input onChange={setarSobreNomeCadastro} type="text" id="sobrenome"></input>
                </div>
                <div>
                    <button onClick={cadastrarNovoUsuario}>Cadastrar</button> 
                </div>
        </div>
    )
};

export default Register;