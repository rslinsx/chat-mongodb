import React, {useEffect, useState} from "react";
import styles from "./Crm.module.css";
import { Link } from 'react-router-dom';

function Crm({socket}){ 
    
    const [mostrarJanelaProcurar, setMostarJanelaProcurar] = useState(false);
    const [mostrarJanelaCadastro, setMostrarJanelaCadastro] = useState(false);
    const [mostrarJanelaExcluirContatoEConversa, setMostrarJanelaExcluirContatoEConversa] = useState(false);
    const [emailProcurado, setEmailProcurado] = useState('');
    const [emailContatoEncontrado, setEmailContatoEncontrado] = useState('');
    const [nomeContatoEncontrado, setNomeContatoEncontrado] = useState('');
    const [ultimoNomeContatoEncontrado, setUltimoNomeContatoEncontrado] = useState('');
    const [contatosEncontradosCrm, setcontatosEncontradosCrm] = useState([]);
    const [emailASerExcluido, setEmailASerExcluido] = useState('');
    const [emailParaIniciarConversa, setEmailParaIniciarConversa] = useState('oi');
    const [socketMomento, setSocketmomento] = useState(null);


    function procurarEmail(){

        if (emailProcurado !== '') {

        fetch('http://localhost:8081/crm/procurar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({email: emailProcurado})
        }).then((response)=>{
             return response.json();
        }).then((data)=>{
            if(data === null){
                alert("Email nao encontrado!")
            }else{
             setEmailContatoEncontrado(data.email); 
             setNomeContatoEncontrado(data.firstname);
             setUltimoNomeContatoEncontrado(data.lastname);
             setMostrarJanelaCadastro(true);          
        };
        }).catch((err)=>{
            console.log(err);
        });
        }else{
        alert("Campo vazio!");
    }};


    


    function incluirContatoCrm() {
        fetch('http://localhost:8081/crm/cadastrar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                 emailUserAtual: localStorage.getItem('email'),
                 email: emailContatoEncontrado, 
                 nome: nomeContatoEncontrado,
                 ultimoNome: ultimoNomeContatoEncontrado
                 })
        }).then((response)=>{
             return response.json();
        }).then((data)=>{
            alert(data)
        }).catch((err)=>{
            console.log(err);
        });

        setEmailProcurado('');
        setMostrarJanelaCadastro(false);
        setMostarJanelaProcurar(false);
        window.location.reload(); 
};

     function carregarContatos(){
        fetch('http://localhost:8081/crm/contatos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                crmBuscado: `${localStorage.getItem('email')}contacts`
            })
        })
        .then(response => {
            return response.json();
        })
        .then(data=>{
            setcontatosEncontradosCrm(data);
            // contatosEncontradosCrm.map((c)=>{
            //     console.log(c.email);
            // });
        })
        .catch(error => {
            console.log(error);
        });
     };
    
     useEffect(()=>{
        carregarContatos(); 
      }, []);



    function CadastrarContato(){
      setMostarJanelaProcurar(true); 
    };

    function fecharJanelaCadastro(){
        setEmailProcurado('');
        setMostrarJanelaCadastro(false);
        setMostarJanelaProcurar(false); 
      };

    function setarEmailProcurado(e){
        setEmailProcurado(e.target.value);
    };

    // Lógica socket // iniciar conversa

    function generateConversationKey(email1, email2) {
        const sortedEmails = [email1, email2].sort();
        return `${sortedEmails[0]}_${sortedEmails[1]}`;
    };

    function iniciarConversa(email){
        socket.emit('EmitirInicio', {emailIniciado: email, emailIniciou: localStorage.getItem('email'), keyConversation: generateConversationKey(email, localStorage.getItem('email'))});
        socket.emit("ListaDeConversas", localStorage.getItem('email'));
    };

    function excluirContatoEConversa(){
        socket.emit('excluirContatoEConversa', {emailLogado: localStorage.getItem('email'), emailASerExcluido: emailASerExcluido, keyConversation: generateConversationKey(localStorage.getItem('email'), emailASerExcluido)});
        setMostrarJanelaExcluirContatoEConversa(true);
    };

    function fecharJanelaExcluirContatoEConversa(){
        setMostrarJanelaExcluirContatoEConversa(false);
    }



    return(
        <div className={styles.telaMaiorCrm}>

            {mostrarJanelaProcurar && <div className={styles.overlay}></div>}
            {mostrarJanelaExcluirContatoEConversa && <div className={styles.overlayDois} ></div>}

            <div className={styles.divCrm}>
                <h1>CRM</h1>
                <button onClick={CadastrarContato}>Cadastrar contato</button>
            </div>
            <div className={styles.container}>
                {contatosEncontradosCrm.map((contatoEncontrado)=>(

                <div className={styles.contactUnic} id={contatoEncontrado.email}>
                    <h3>{contatoEncontrado.email}</h3>
                    <p>{contatoEncontrado.firstname} {contatoEncontrado.lastname}</p>
                    <Link to ="/mensagens"><button className={styles.botaoIniciar} onClick={()=> iniciarConversa(contatoEncontrado.email)}>Iniciar conversa</button></Link>
                    <button onClick={()=>setEmailASerExcluido(contatoEncontrado.email)} className={styles.botaoExcluir}>Excluir contato e conversa</button>
                </div>
                ))}
            </div>


            {mostrarJanelaProcurar && (<div className={styles.janelaCadastroContato}>
                <div className={styles.botaoFecharCadastro}>
                    <button onClick={fecharJanelaCadastro}>X</button>
                </div>
                <input id="email"  placeholder="Digite o email completo"onChange={setarEmailProcurado}/>
                <button className={styles.botaoDeProcurarContato} onClick={procurarEmail}>Procurar</button>
            </div>)} 

            {mostrarJanelaCadastro && (<div className={styles.janelaCadastroContatoEncontrado}>
                <div className={styles.botaoFecharCadastro}>
                    <button onClick={fecharJanelaCadastro}>X</button>
                </div>
                <h4>nome: {nomeContatoEncontrado} {ultimoNomeContatoEncontrado}</h4>
                <p>email: {emailContatoEncontrado} </p>
                <button className={styles.botaoDeProcurarContato}onClick={incluirContatoCrm}>Incluir contato no CRM</button>
            </div>)} 

            {mostrarJanelaExcluirContatoEConversa && (<div className={styles.janelaExcluirContatoEConversa}>
                <div className={styles.espaçoCloseExcluir}>
                    <button onClick={()=>fecharJanelaExcluirContatoEConversa()}>X</button>
                </div>
                <div className={styles.avisoExcluir}>
                    <p>Essa ação é irreversível. A conversa será apagada também para contato selecionado. Se desejar pode adicionar novamente o contato no seu CRM e iniciar uma nova conversa.</p>
                </div>
                <button className={styles.buttonExcluir} onClick={()=> excluirContatoEConversa()}>Confirmar</button>    
            </div>)}   


        </div>

          

    )

}


export default Crm;