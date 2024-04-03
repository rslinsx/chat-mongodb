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
        <div  className="container">
            <div className="row justify-content-center align-items-center">
                <div className="col-9">
                    <div className="card w-50" >
                        <div className="card-header d-flex justify-content-center bg-dark">
                            <h1 className="card-title text-bg-dark">Cadastre o seu acesso!</h1>
                        </div>
                        <div className="card-body bg-dark">  
                            <div>
                                <label htmlFor='email' className="form-label text-white"> Email: </label>
                                <input onChange={setarEmailCadastro} type="email" placeholder="Digite aqui o seu email válido"id="email" className="form-control"></input>
                            </div>
                            <div>
                                <label htmlFor='senha' className="form-label text-white">Senha: </label>
                                <input onChange={setarSenhaCadastro}type="password" placeholder="Crie uma senha forte"id="senha" className="form-control"></input>
                            </div>
                            <div>
                                <label htmlFor='nome' className="form-label text-white">Primeiro nome:</label>
                                <input onChange={setarNomeCadastro} type="text" placeholder="Digite o seu primeiro nome" id="nome" className="form-control"></input>
                            </div>
                            <div>
                                <label htmlFor='sobrenome'className="form-label text-white">Sobrenome:</label>
                                <input onChange={setarSobreNomeCadastro} type="text" placeholder="Digite o seu sobrenome" id="sobrenome" className="form-control"></input>
                            </div>
                            
                        </div>
                        <div className="card-footer bg-dark d-flex justify-content-center">
                            <div>
                                <button onClick={cadastrarNovoUsuario} className="btn btn-success">Cadastrar</button> 
                            </div>
                            <div>
                                <Link to="/login" className="btn btn-primary">Ir para página de Login</Link>
                            </div>
                        </div>
                    </div>
                </div>  
            </div>        
        </div>
    )
};

export default Register;