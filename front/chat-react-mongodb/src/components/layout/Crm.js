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
    const [mostrarJanelaProcurarCadastro, setMostrarJanelaProcurarContato] = useState(false);


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

    function procurarContato(){
        setMostrarJanelaProcurarContato(true);
    }

    function fecharJanelaProcurarContato(){
        setMostrarJanelaProcurarContato(false);
    }

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
        setMostrarJanelaExcluirContatoEConversa(true)
        socket.emit('excluirContatoEConversa', {emailLogado: localStorage.getItem('email'), emailASerExcluido: emailASerExcluido, keyConversation: generateConversationKey(localStorage.getItem('email'), emailASerExcluido)});
        window.location.reload();
    };

    function fecharJanelaExcluirContatoEConversa(){
        setMostrarJanelaExcluirContatoEConversa(false);
    };

    function mostrarJanelaConfirmacaoESetarEmailParaSerExcluido(email) {
        setEmailASerExcluido(email);
        setMostrarJanelaExcluirContatoEConversa(true);
    };



    return(
        <div className="container-fluid min-vh-100"  id={styles.image}>
            
            <div className="p-4 d-flex justify-content-center flex-column align-items-center">
                <h1 className="p-3">CRM</h1>
                <button onClick={CadastrarContato} className="btn btn-success">Cadastrar contato</button>
                <button onClick={procurarContato} className="btn btn-success mt-2">Procurar contato</button>
            </div>
                <div className="row">
                {contatosEncontradosCrm.map((contatoEncontrado)=>(
                
                    <div className="col-3 mt-3">
                        <div className="card bg-dark bg-opacity-50 ms-2" id={contatoEncontrado.email} style={{width: "16rem"}}>
                            <img src="https://www.guiaviagensbrasil.com/imagens/Imagem%20do%20mar%20calma%20e%20belo%20da%20Praia%20da%20Engenhoca-Itacar%C3%A9-Bahia-BA.jpg" class="card-img-top" alt="..."></img>
                            <div className="card-body">
                                <div className="card-header">
                                    <h5 class="card-title text-white">{contatoEncontrado.email}</h5>
                                    <p className="card-text text-white">{contatoEncontrado.firstname} {contatoEncontrado.lastname}</p>
                                </div>
                                <div className="card-footer d-flex flex-column align-items-center">    
                                    <Link to ="/mensagens"><button className="btn btn-success" onClick={()=> iniciarConversa(contatoEncontrado.email)}>Iniciar conversa</button></Link>
                                    <button onClick={()=>mostrarJanelaConfirmacaoESetarEmailParaSerExcluido(contatoEncontrado.email)} className="btn mt-1 btn-danger">Deletar</button>
                                </div>
                            </div>
                        </div>
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
            
            
            {mostrarJanelaProcurarCadastro && (<div className="card bg-dark text-bg-dark w-50 h-75 fixed-top" id={styles.procurarContato}>
                <div className="card-body">
                    <div className="card-header d-flex justify-content-end">
                        <button  className="btn btn-danger"onClick={()=>fecharJanelaProcurarContato()}>X</button>
                    </div>
                    <div className="card-title">
                        <h3>Procurar contato</h3>
                    </div>    
                    <input  className="form-control w-75" type="text"/>
                    <button className="btn btn-success">Pesquisar</button>
                </div>    
            </div>)}





        </div>

          

    )

}


export default Crm;