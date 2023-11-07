import styles from "./Navbar.module.css";
import React from 'react';
import { Link } from 'react-router-dom';

function Navbar({sair}){
    return(
        <div className={styles.mainNavbar}>
            <ul>
                <li><Link to="/mensagens">conversas</Link></li>
                <li><Link to="/crm">crm</Link></li>
                <li><Link to="/perfil">perfil</Link></li>
                <li><a href="" onClick={sair}>sair</a></li>
            </ul>
        </div>
    );
};

export default Navbar;