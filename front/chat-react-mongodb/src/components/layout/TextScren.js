import styles from "./TextScren.module.css";
import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';

function TextScren(){

    const [messages, setMessages] = useState([]);
    const [ochmessage, setOchMessage] = useState('');
    const [newMessages, setNewMessages] = useState('');
    const messageRef = useRef();
    const socketRef = useRef();
    const rolagemRef = useRef();
    const [keyMomentChat, setKeyMomentChat] = useState('');    
    
    useEffect(()=>{

        socketRef.current = io.connect('http://localhost:8081');
        return () => {
            socketRef.current.disconnect();
        };
    }, []);

    useEffect(()=>{
        roalgemScren();
    }, [messages]);

    useEffect(()=>{

        if (keyMomentChat === generateConversationKey(localStorage.getItem('email'), localStorage.getItem('emailConversaAtual'))) {
        socketRef.current.on(keyMomentChat, allMessages =>{
            setMessages(allMessages);
        });}else{
            return
        }

    }, [keyMomentChat]);


    async function handleSubmit(){
        const messageTest = {mensagem: messageRef.current.value, emailLogado: localStorage.getItem('email'), keyConversation: keyMomentChat};
        if (!messageTest.mensagem.trim()) return

        await socketRef.current.emit('enviarMensagem', messageTest);

        socketRef.current.emit('clickConversaAtual', { keyConversation: keyMomentChat });

        clearInput();
        focusInput();
    };

    function setarEmailConversa (email){

        socketRef.current.off(keyMomentChat);

        localStorage.setItem('emailConversaAtual', email);
        const newKeyMomentChat = generateConversationKey(localStorage.getItem('email'), localStorage.getItem('emailConversaAtual'));

        socketRef.current.emit('clickConversaAtual', {
            keyConversation: newKeyMomentChat
        });

        setKeyMomentChat(newKeyMomentChat);
    };

    function generateConversationKey(email1, email2) {
        const sortedEmails = [email1, email2].sort();
        return `${sortedEmails[0]}_${sortedEmails[1]}`;
    };

    function clearInput(){
        messageRef.current.value = '';
    }

    function focusInput(){
        messageRef.current.focus();
    }

    function getEnterKey(e){
        if(e.key === 'Enter')
            handleSubmit();
        ;
    };

    function roalgemScren(){
        rolagemRef.current.scrollIntoView({behavior: 'smooth'})
    };

    return(
        <div className={styles.textScren}>
            <div className={styles.telaContatos}>
                <div className={styles.contactUnic} onClick={() => setarEmailConversa('teste@gmail.com')}>
                    <h5>teste@gmail.com</h5>
                </div>
                <div className={styles.contactUnic} onClick={() => setarEmailConversa('lethicia@gmail.com')}>
                    <h5>lethicia@gmail.com</h5>
                </div>
                <div className={styles.contactUnic} onClick={() => setarEmailConversa('rafael@gmail.com')}>
                    <h5>rafael@gmail.com</h5>
                </div>
            </div>
            <div className={styles.textScrenMess}>
                <div className={styles.textMensagens}>
                    {messages.map((message)=>(
                        <p>{message.emailLogado === localStorage.getItem('email') ? 'eu' : message.emailLogado}: {message.conteudo}</p>
                    ))}

                    <div ref={rolagemRef}></div>
                </div>
                <div>
                    <div className={styles.inputScren}>
                        <input id="send"type="text" ref={messageRef} onKeyDown={(e)=>getEnterKey(e)}/>
                        <button id="buttonSend" onClick={handleSubmit}>Enviar</button>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default TextScren;  