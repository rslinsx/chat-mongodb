import { useState } from "react";
import styles from "./InputText.module.css";

function InputText({ochInputValue, printMessage}) {


    
    
    return (

        <div className={styles.inputScren}>
            <input id="send" onChange={ochInputValue} type="text"/>
            <button id="buttonSend" onClick={printMessage}>Enviar</button>

        </div>
    )
};

export default InputText;