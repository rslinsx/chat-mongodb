import styles from "./TextScren.module.css";
import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';

function TextScren(){

    const [messages, setMessages] = useState([]);
    const [ochmessage, setOchMessage] = useState('');
    const [newMessages, setNewMessages] = useState('');
    const messageRef = useRef();
    const socketRef = useRef();
    const [keyMomentChat, setKeyMomentChat] = useState('');    
    
    useEffect(()=>{

        socketRef.current = io.connect('http://localhost:8081');
        return () => {
            socketRef.current.disconnect();
        };
    }, []);

    useEffect(()=>{
        socketRef.current.on(keyMomentChat, allMessages =>{
            setMessages(allMessages);
        });
    }, [keyMomentChat]);


    async function handleSubmit(){
        const messageTest = {mensagem: messageRef.current.value, emailLogado: localStorage.getItem('email'), keyConversation: keyMomentChat};
        if (!messageTest.mensagem.trim()) return

        await socketRef.current.emit('enviarMensagem', messageTest);

        socketRef.current.emit('clickConversaAtual', { keyConversation: keyMomentChat });
    };

    function setarEmailConversa (email){

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
                        <p>{message.conteudo}</p>
                    ))}
                </div>
                <div>
                    <div className={styles.inputScren}>
                        <input id="send"type="text" ref={messageRef}/>
                        <button id="buttonSend" onClick={handleSubmit}>Enviar</button>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default TextScren;  