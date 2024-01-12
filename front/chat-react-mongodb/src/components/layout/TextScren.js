import styles from "./TextScren.module.css";
import React, { useState, useEffect, useRef } from 'react';

function TextScren({socket}){

    const [messages, setMessages] = useState([]);
    const messageRef = useRef();
    const socketRef = useRef();
    const rolagemRef = useRef();
    const [keyMomentChat, setKeyMomentChat] = useState('');   
    const [socketAtual, setSocketAtual] = useState(null); 
    
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
   

    return(
        <div className={styles.allScrenMessage}>
            <div className={styles.campoLateral}> separação </div>

        </div>
    );
};

export default TextScren;  