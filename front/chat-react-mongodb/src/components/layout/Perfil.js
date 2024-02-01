import React, { useEffect, useState, useRef } from "react";
import styles from './Perfil.module.css';


function Perfil() {


  const [primeiroNomePerfil, setPrimeiroNomePerfil] = useState('');
  const [ultimoNomePerfil, setUltimoNomePerfil] = useState('');

  function carregarInfosDoPerfil(){
    fetch('http://localhost:8081/perfil', {
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json',
      },
      body: JSON.stringify({
        email: localStorage.getItem('email')
      })
    }).then((response)=>{
      return response.json();
    }).then((data)=>{
      setPrimeiroNomePerfil(data.firstname);
      setUltimoNomePerfil(data.lastname);
      
    }).catch(err=>{
      console.log(err)
    })
  };

  useEffect(()=>{
    carregarInfosDoPerfil();
  }, []);
  

  return (
    <div>
      <div className={styles.mainScrenPerfil}>
        <h1>Cadastro</h1>
        <h3>Nome: {primeiroNomePerfil}</h3>
        <h3>sobrenome: {ultimoNomePerfil}</h3>
      </div>
    </div>
  );
}

export default Perfil;