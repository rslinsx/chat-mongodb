import styles from "./Navbar.module.css";
import React from 'react';
import { Link } from 'react-router-dom';

function Navbar({sair}){
    return(
        <div className={styles.mainNavbar}>
            <p className={styles.emailDoMomento}>{localStorage.getItem('email')}</p>
            <ul>
                <li><Link to="/mensagens" className={styles.optionsMenu}>conversas</Link></li>
                <li><Link to="/crm" className={styles.optionsMenu} >crm</Link></li>
                <li><Link to="/perfil" className={styles.optionsMenu} >perfil</Link></li>
                <li><a href="" className={styles.optionsMenu} onClick={sair}>sair</a></li>
            </ul>
        </div>
    );
};

export default Navbar;