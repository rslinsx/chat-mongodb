import styles from "./TextScren.module.css";
import React, { useState, useEffect, useRef } from 'react';

function TextScren({socket}){

    const [messages, setMessages] = useState([]);
    const messageRef = useRef();
    const socketRef = useRef();
    const rolagemRef = useRef();
    const [keyMomentChat, setKeyMomentChat] = useState('');    
    
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
        return;
    };

    function rolagemScren(){
        rolagemRef.current.scrollIntoView({behavior: 'smooth'})
    };


    //logica socket
   

    return(
        <div className={styles.textScren}>
            <div className={styles.telaContatos}>
            </div>
            <div className={styles.textScrenMess}>
                <div className={styles.textMensagens}>
                    <div ref={rolagemRef}></div>
                </div>
                <div>
                    <div className={styles.inputScren}>
                        <input id="send"type="text" ref={messageRef} onKeyDown={(e)=>getEnterKey(e)}/>
                        <button id="buttonSend">Enviar</button>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default TextScren;  