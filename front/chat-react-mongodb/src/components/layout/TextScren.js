import styles from "./TextScren.module.css";
import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';

function TextScren(){

    const [messages, setMessages] = useState([]);
    const [ochmessage, setOchMessage] = useState('');
    const [newMessages, setNewMessages] = useState('');
    const messageRef = useRef();
    const socketRef = useRef();

    useEffect(()=>{

        socketRef.current = io.connect('http://localhost:8081');

        return () => {
            socketRef.current.disconnect();
        };
    }, []);


    async function handleSubmit(){
        const messageTest = {mensagem: messageRef.current.value, emailConversaAtual: localStorage.getItem('emailConversaAtual'), emailLogado: localStorage.getItem('email')};
        if (!messageTest.mensagem.trim()) return
        socketRef.current.emit('messageTest', messageTest);
    };

    function setarEmailConversa (email){
        localStorage.setItem('emailConversaAtual', email);
    }

    return(
        <div className={styles.textScren}>
            <div className={styles.telaContatos}>
                <div className={styles.contactUnic} onClick={() => setarEmailConversa('teste@gmail.com')}>
                    <h5>teste@gmail.com</h5>
                </div>
                <div className={styles.contactUnic} onClick={() => setarEmailConversa('lethi@gmail.com')}>
                    <h5>lethi@gmail.com</h5>
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