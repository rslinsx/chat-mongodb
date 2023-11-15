import styles from "./Crm.module.css";

function Crm(){

    function CadastrarContato(){
      console.log("Em construção!") 
    };

    return(
        <div>
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
        </div>
    )

}


export default Crm;