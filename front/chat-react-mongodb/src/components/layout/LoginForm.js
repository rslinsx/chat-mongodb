import styles from './LoginForm.module.css';


function LoginForm(){
    return(
        <form className={styles.formular} action="">
            <div>
                <label for="email">Email: </label>
                <input
                 className={styles.campoinfo}   
                 type="email"
                 id="email"
                 name="name"
                />
            </div>
            <div>
                <label for="password">Senha: </label>
                <input
                 className={styles.campoinfo}  
                 type="password"
                 id="password"
                 name="password"
                />
            </div>
            <input className={styles.campoBt} type="submit" value="Entrar"/>
        </form>
    )
};

export default LoginForm;

