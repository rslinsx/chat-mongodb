import styles from "./TextScren.module.css";
import React, { useState, useEffect } from 'react';
import InputText from "./InputText";


function TextScren(){

    const [messages, setMessages] = useState([]);


    useEffect(()=>{
        fetch('http://localhost:8081/mensagens')
    .then(response => {
        return response.json();
    })
    .then(data => {
       setMessages(data);
    })
    .catch(error => {
        console.error(error);
    })}, []);

   
    return(
        <div className={styles.textScren}>
            {messages.map((message)=>(
                <p>{message.conteudo}</p>
            ))}
            <InputText/>

        </div>
    );
};

export default TextScren;  