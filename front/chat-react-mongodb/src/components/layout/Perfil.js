import React, { useEffect, useState, useRef } from "react";

function Perfil() {
  const [testeObj, setTesteObj] = useState({});
  const testeRef = useRef();

  function teste() {
    const print = testeRef.current.value;
    // Instead of modifying the existing state directly, create a new object
    setTesteObj((prevTesteObj) => {
      return { ...prevTesteObj, outroTeste: print };
    });
    console.log('aqui é o teste obj do set: ' + JSON.stringify(testeObj));
    console.log(print);
  }

  return (
    <div>
      <h1>Perfil</h1>
      <input ref={testeRef}></input>
      <button onClick={() => teste()}>Teste</button>
    </div>
  );
}

export default Perfil;