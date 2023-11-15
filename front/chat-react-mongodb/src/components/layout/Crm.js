import React, {useState} from "react";
import styles from "./Crm.module.css";

function Crm(){ 
    
    const [mostrarJanelaCadastro, setMostarJanelaCadastro] = useState(false);

    function CadastrarContato(){
      setMostarJanelaCadastro(true); 
    };

    return(
        <div className={styles.telaMaiorCrm}>
            <div className={styles.divCrm}>
                <h1>CRM</h1>
                <button onClick={CadastrarContato}>Cadastrar contato</button>
            </div>
            <container>
                <div className={styles.contactUnic}>
                    <h3>contato@exemplo.com</h3>
                    <p>Nome teste exemplo</p>
                    <button>Iniciar conversa</button>
                </div>
            </container>


            {mostrarJanelaCadastro && (<div className={styles.janelaCadastroContato}>
                <label htmlFor="email">Email: </label>
                <input id="email"/>
                <button>Procurar</button>
            </div>)} 
        </div>

          

    )

}


export default Crm;