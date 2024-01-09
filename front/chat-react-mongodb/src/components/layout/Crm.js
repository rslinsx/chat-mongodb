import React, {useEffect, useState} from "react";
import styles from "./Crm.module.css";
import { Link } from 'react-router-dom';
import io, { Socket } from 'socket.io-client';

function Crm(){ 
    
    const [mostrarJanelaProcurar, setMostarJanelaProcurar] = useState(false);
    const [mostrarJanelaCadastro, setMostrarJanelaCadastro] = useState(false);
    const [emailProcurado, setEmailProcurado] = useState('');
    const [emailContatoEncontrado, setEmailContatoEncontrado] = useState('');
    const [nomeContatoEncontrado, setNomeContatoEncontrado] = useState('');
    const [ultimoNomeContatoEncontrado, setUltimoNomeContatoEncontrado] = useState('');
    const [contatosEncontradosCrm, setcontatosEncontradosCrm] = useState([]);
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
            console.log(data);
            setcontatosEncontradosCrm(data);
            contatosEncontradosCrm.map((c)=>{
                console.log(c.email);
            });
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

    function setarEmailIniciarConversa(email){
        socketMomento.emit('iniciarConversaEmail', email);
        setEmailParaIniciarConversa(email);

        
    };

    // Lógica socket // iniciar conversa

    useEffect(() => {
        const socket = io.connect('http://localhost:8081');
    
        // Escuta o evento 'connect' que é disparado quando a conexão é estabelecida
        socket.on('connect', () => {
            setSocketmomento(socket);
        });
    
        return () => {
            socket.disconnect();
        };
    }, []);

    return(
        <div className={styles.telaMaiorCrm}>

            {mostrarJanelaProcurar && <div className={styles.overlay}></div>}

            <div className={styles.divCrm}>
                <h1>CRM</h1>
                <button onClick={CadastrarContato}>Cadastrar contato</button>
            </div>
            <div className={styles.container}>
                {contatosEncontradosCrm.map((contatoEncontrado)=>(

                <div className={styles.contactUnic} id={contatoEncontrado.email}>
                    <h3>{contatoEncontrado.email}</h3>
                    <p>{contatoEncontrado.firstname} {contatoEncontrado.lastname}</p>
                    <Link to ="/mensagens"><button onClick={()=> setarEmailIniciarConversa(contatoEncontrado.email)}>Iniciar conversa</button></Link>
                    
                </div>
                ))}
            </div>


            {mostrarJanelaProcurar && (<div className={styles.janelaCadastroContato}>
                <div className={styles.botaoFecharCadastro}>
                    <button onClick={fecharJanelaCadastro}>X</button>
                </div>
                <hr/>
                <label htmlFor="email">Email: </label>
                <input id="email" onChange={setarEmailProcurado}/>
                <button onClick={procurarEmail}>Procurar</button>
            </div>)} 

            {mostrarJanelaCadastro && (<div className={styles.janelaCadastroContatoEncontrado}>
                <h4>nome: {nomeContatoEncontrado} {ultimoNomeContatoEncontrado}</h4>
                <p>email: {emailContatoEncontrado} </p>
                <button onClick={incluirContatoCrm}>Incluir contato no CRM</button>
            </div>)}    


        </div>

          

    )

}


export default Crm;