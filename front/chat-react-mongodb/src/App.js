import { useEffect, useState} from 'react';
import MainScren from './components/layout/MainScren';
import Navbar from './components/layout/Navbar';
import TextScren from './components/layout/TextScren';
import Crm from './components/layout/Crm';
import Perfil from './components/layout/Perfil';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import LoginForm from './components/layout/LoginForm';
import Register from './components/layout/Register';
import HomeHome from './components/layout/HomeHome';
import io, { Socket } from 'socket.io-client';

function App() {


  //marcador de login que será alterado para true quando usuario logar
  //o JSON.parse tranforma de string para valor boolenano da variável localstorage key
  const [estaLogado, setEstaLogado] = useState(JSON.parse(localStorage.getItem('key')));
  const [socketUnic, setSocketUnic] = useState(null);
  const [listDeConversas, setListDeConversas] = useState(null);

  function logOut(){
    localStorage.setItem('key', false);
  };



  //lógicaSocketConexão
  useEffect(()=>{
    const socket = io.connect('http://localhost:8081');

    // Escuta o evento 'connect' que é disparado quando a conexão é estabelecida
    socket.on('connect', () => {
        setSocketUnic(socket);
        socket.emit('listaDeConversaAtual', localStorage.getItem('email'));
    });

    socket.on(`${localStorage.getItem('email')}ListaDeConversa`, response=>{
      console.log(response);
    })
    
    socket.on(`${localStorage.getItem('email')}ListaDeConversaAtual`, response=>{
      setListDeConversas(response);
    })
    ;



  }, []);

  return (
    <div className="App">
          
            <MainScren>
            <Router>
              {estaLogado && <Navbar sair={logOut}/>}
              <Routes>
                <Route path='/' element={ estaLogado ? <HomeHome/> : <Navigate to="/login"/> }/>
                <Route path="/mensagens" element={estaLogado ? <TextScren listDeConversas={listDeConversas} socketUnic={socketUnic}/> : <Navigate to="/login"/>}/>
                <Route path="/crm" element={estaLogado ? <Crm socket={socketUnic}/> : <Navigate to="/login"/>}/>
                <Route path="/perfil" element={estaLogado ? <Perfil/> : <Navigate to="/login"/>}/>
                <Route path="/login" element={estaLogado ? <Navigate to="/"/> : <LoginForm/>}/>
                <Route path="/cadastro" element={estaLogado ? <Navigate to="/"/> : <Register/>}/>
              </Routes>
            </Router>  
            </MainScren>
          
      
    </div>
  )
};






export default App;