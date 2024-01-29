import styles from "./TextScren.module.css";
import React, { useState, useEffect, useRef } from 'react';
import moment from 'moment';

function TextScren({socketUnic, listDeConversas}){

    const [messages, setMessages] = useState([]);
    const messageRef = useRef();
    const rolagemRef = useRef();
    const [keyMomentChat, setKeyMomentChat] = useState(''); 
    const [lastMessages, setLastMessages] = useState({});   
    
    function generateConversationKey(email1, email2) {
        const sortedEmails = [email1, email2].sort();
        return `${sortedEmails[0]}_${sortedEmails[1]}`;
    };

    function setarConversaAtualGerarChave(email1 , email2) {
        const keyActual = generateConversationKey(email1, email2);
        setKeyMomentChat(keyActual);
    };

    function clearInput(){
        messageRef.current.value = '';
    }

    function focusInput(){
        messageRef.current.focus();
    }

    function getEnterKey(e){
        if(e.key === 'Enter'){
            e.preventDefault(); // Isso impede que a quebra de linha seja inserida no input
            enviarMensagem();
        }
        return;
    };

    function rolagemScren(){
        rolagemRef.current.scrollIntoView({behavior: 'smooth'})
    };

    //logica sockettttt

    useEffect(()=>{
        rolagemScren();
    }, [messages]);
    
    
    useEffect(() => {

    if (socketUnic) {
        
        socketUnic.emit('cliqueiNessaConversa', keyMomentChat);
        socketUnic.on(`${keyMomentChat}conversaemsi`, response=>{
            setMessages(response);
            
        });
    };

    const desligarEscutaAtual = `${keyMomentChat}conversaemsi`

    return () => {
        if (socketUnic) {
            socketUnic.off(desligarEscutaAtual);
        }
    };
}, [keyMomentChat]);


    //enviar mensagem 
    function enviarMensagem(){
        if (messageRef.current.value.trim() !== '' && keyMomentChat !== ''){
        socketUnic.emit('enviarMensagem', {keyMomentChat: keyMomentChat, emailQueEnviou: localStorage.getItem('email'), mensagem: messageRef.current.value});
        clearInput();
        focusInput();
        rolagemScren();}else{
            return
        }
    };



    //escutando última mensagem socket, com um map para criar um socket on para cada key de cada conversa 
     useEffect(()=>{
         if (listDeConversas) {
         listDeConversas.forEach((cadaConversaUnica)=>{
             socketUnic.on(`${cadaConversaUnica.keyConversation}LastMessage`, response=>{

                if(response && response.keyMomentChat) {
                setLastMessages((prevLastMessage) => {
                    return { ...prevLastMessage, [response.keyMomentChat] : {conteudo: response.conteudo, emailLogado: response.emailLogado}};
                  });

                }   
             });
         });
        }else{
            console.log('nao há list')
        }
     },[]);

     
    useEffect(()=>{
        if (listDeConversas !== null && listDeConversas !== undefined) {
        listDeConversas.forEach(element => {
            socketUnic.emit('LastMessage', element.keyConversation);
        });}else{
            return;
        }
        
    }, [messages])

     
   

    return(
        <div className={styles.allScrenMessage}>
            <div className={styles.campoLateral}>

                {listDeConversas && listDeConversas.map((cadaConversa)=>(
                    <div className={styles.conversaUnica} onClick={()=>setarConversaAtualGerarChave(cadaConversa.emailConversaAtual, localStorage.getItem('email'))}>
                        <p>{cadaConversa.emailConversaAtual}</p>
                        {lastMessages[cadaConversa.keyConversation] && (
                         <p className={lastMessages[cadaConversa.keyConversation].emailLogado !== localStorage.getItem('email') ? styles.mensagemQueRecebiNova : styles.mensagemQueEnvieiNova}>{lastMessages[cadaConversa.keyConversation].conteudo}</p>
                        )}
                       
                    </div>
                ))}
            </div>

            <div className={styles.telaDeConversas}>
                    <div className={styles.telaComMensagens}>
                       {messages.map((message)=>(
                        
                            <div className={message.emailLogado === localStorage.getItem('email') ? styles.mensagemEnviada : styles.mensagemRecebida}>
                                <p>{message.conteudo}</p>

                                <p>{moment(message.hora).format('HH:mm')}</p>
                            </div>
                            ))}
                        
                        <div ref={rolagemRef}></div>
                    </div>
                    
                    <div className={styles.campoDeDigitacao}>
                        <input type="text" className = {styles.campoDeDigitacaoFinal} ref={messageRef} onKeyDown={(e)=>getEnterKey(e)}></input>
                        <button onClick={()=> enviarMensagem()}>Enviar</button>
                    </div>
            </div>

        </div>
    );
};

export default TextScren;  