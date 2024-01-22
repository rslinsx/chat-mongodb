import styles from "./TextScren.module.css";
import React, { useState, useEffect, useRef } from 'react';

function TextScren({socketUnic, listDeConversas}){

    const [messages, setMessages] = useState([]);
    const messageRef = useRef();
    const rolagemRef = useRef();
    const [keyMomentChat, setKeyMomentChat] = useState('');     
    
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
    //logica sockettttt

    useEffect(()=>{
        rolagemScren();
    }, [messages]);
    
    
    useEffect(() => {

    if (socketUnic) {
        
        socketUnic.emit('cliqueiNessaConversa', keyMomentChat);
        socketUnic.on(`${keyMomentChat}conversaemsi`, response=>{
            console.log(response);
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

    function enviarMensagem(){
        socketUnic.emit('enviarMensagem', {keyMomentChat: keyMomentChat, emailQueEnviou: localStorage.getItem('email'), mensagem: messageRef.current.value});
        clearInput();
        focusInput();
        rolagemScren();
    };
   

    return(
        <div className={styles.allScrenMessage}>
            <div className={styles.campoLateral}>

                {listDeConversas && listDeConversas.map((cadaConversa)=>(
                    <div className={styles.conversaUnica} onClick={()=>setarConversaAtualGerarChave(cadaConversa.emailConversaAtual, localStorage.getItem('email'))}>
                        <p>{cadaConversa.emailConversaAtual}</p>
                    </div>
                ))}
            </div>

            <div className={styles.telaDeConversas}>
                    <div className={styles.telaComMensagens}>
                       {messages.map((message)=>(
                            <div className={styles.cadaMensagem}>
                                <p>{message.conteudo}</p>
                            </div>
                            ))}
                        
                        <div ref={rolagemRef}></div>
                    </div>
                    
                    <div className={styles.campoDeDigitacao}>
                        <input type="text" ref={messageRef} onKeyDown={(e)=>getEnterKey(e)}></input>
                        <button onClick={()=> enviarMensagem()}>Enviar</button>
                    </div>
            </div>

        </div>
    );
};

export default TextScren;  