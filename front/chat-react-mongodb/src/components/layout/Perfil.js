import React, { useEffect, useState, useRef } from "react";

function Perfil() {

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
      console.log(data);
    }).catch(err=>{
      console.log(err)
    })
  };

  useEffect(()=>{
    carregarInfosDoPerfil();
  }, []);
  

  return (
    <div>
      <h1>Perfil</h1>
    </div>
  );
}

export default Perfil;