import styles from "./TextScren.module.css";
import React, { useState, useEffect, useRef } from 'react';
import io, { Socket } from 'socket.io-client';

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


    //logica socket
    useEffect(()=>{
        const socket = io.connect('http://localhost:8081');

        // Escuta o evento 'connect' que é disparado quando a conexão é estabelecida
        socket.on('connect', () => {
            setSocketAtual(socket);
        });

        socket.on('listaDeConversas', lista=>{
            console.log(lista)
        })
    
        return () => {
            socket.disconnect();
        };

    },[])
   

    return(
        <div className={styles.allScrenMessage}>
            <div className={styles.campoLateral}> separação </div>

        </div>
    );
};

export default TextScren;  