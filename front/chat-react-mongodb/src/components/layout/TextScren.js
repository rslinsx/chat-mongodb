import styles from "./TextScren.module.css";
import React, { useState, useEffect, useRef } from 'react';

function TextScren(){

    const [messages, setMessages] = useState([]);
    const [ochmessage, setOchMessage] = useState('');
    const [newMessages, setNewMessages] = useState('');
    const messageRef = useRef();

    return(
        <div className={styles.textScren}>
            <div className={styles.telaContatos}>
                <div className={styles.contactUnic}>
                    <h5>teste</h5>
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
                        <button id="buttonSend">Enviar</button>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default TextScren;  