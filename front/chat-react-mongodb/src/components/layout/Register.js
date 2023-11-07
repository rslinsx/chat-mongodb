import styles from "./Register.module.css";

function Register(){

    return(
        <div>   
             <div>
                    <label htmlFor='email'>Email: </label>
                    <input type="email"></input>
                </div>
                <div>
                    <label htmlFor='senha'>Senha: </label>
                    <input type="password"></input>
                </div>
                <div>
                    <button>Entrar</button> 
                </div>
                <div>
                    <button>Registrar-se</button> 
                </div>
        </div>
    )
};

export default Register;