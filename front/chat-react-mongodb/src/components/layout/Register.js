import styles from "./Register.module.css";

function Register(){

    return(
        <div>   
             <div>
                    <label htmlFor='email'>Email: </label>
                    <input type="email" id="email"></input>
                </div>
                <div>
                    <label htmlFor='senha'>Senha: </label>
                    <input type="password" id="senha"></input>
                </div>
                <div>
                    <label htmlFor='nome'>Nome: </label>
                    <input type="text" id="nome"></input>
                </div>
                <div>
                    <label htmlFor='sobrenome'>Sobrenome: </label>
                    <input type="text" id="sobrenome"></input>
                </div>
                <div>
                    <button>Cadastrar</button> 
                </div>
        </div>
    )
};

export default Register;