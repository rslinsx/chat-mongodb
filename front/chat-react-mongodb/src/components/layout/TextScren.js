import styles from "./TextScren.module.css";
import React, { useState, useEffect, useRef } from 'react';
import moment from 'moment';

function TextScren({socketUnic, listDeConversas, setListDeConversas}){

    const [messages, setMessages] = useState([]);
    const messageRef = useRef();
    const rolagemRef = useRef();
    const [keyMomentChat, setKeyMomentChat] = useState(''); 
    const [lastMessages, setLastMessages] = useState({});   
    const [lastTimeMessage, setLastTimeMessage] = useState({});
    
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

                setLastTimeMessage((prevLastTimeMessage) => {
                    return { ...prevLastTimeMessage, [response.keyMomentChat] : response.hora };
                    
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
        
    }, [messages]);

    //alterando ordem das conversas de acordo com a última mensagem, o horário
    useEffect(()=>{
        
        if (lastTimeMessage && listDeConversas) {
        // Convertendo o primeiro objeto para um array de objetos
        const listDeLastMessagesTransformandoEmArray = Object.entries(lastTimeMessage).map(([key, value]) => ({ key, value }));

        // Ordenando o array de objetos com base nos valores 
        listDeLastMessagesTransformandoEmArray.sort((a, b) => new Date(b.value) - new Date(a.value));

        // Ordenando o segundo array de acordo com a ordem das chaves no array ordenado
        const listDeConversasOrdenadas = listDeConversas.sort((a, b) => {
            const indexA = listDeLastMessagesTransformandoEmArray.findIndex(item => item.key === a.keyConversation);
            const indexB = listDeLastMessagesTransformandoEmArray.findIndex(item => item.key === b.keyConversation);
            return indexA - indexB;
        });

        setListDeConversas(listDeConversasOrdenadas);
        console.log('aqui é o lastMessages: ' + JSON.stringify(listDeLastMessagesTransformandoEmArray));
        }else{
            return;
        }
    }, [lastMessages])

     
   

    return(
        <div className={styles.allScrenMessage}>
            <div className={styles.campoLateral}>

                {listDeConversas && listDeConversas.map((cadaConversa)=>(
                    <div className={`${styles.conversaUnica} ${cadaConversa.keyConversation === keyMomentChat ? styles.conversaClicadaNoMomento : ''}`} onClick={()=>setarConversaAtualGerarChave(cadaConversa.emailConversaAtual, localStorage.getItem('email'))}>
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