import { useState } from 'react';
import MainScren from './components/layout/MainScren';
import Navbar from './components/layout/Navbar';
import TextScren from './components/layout/TextScren';
import Crm from './components/layout/Crm';
import Perfil from './components/layout/Perfil';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import LoginForm from './components/layout/LoginForm';
import Register from './components/layout/Register';

function App() {


  //marcador de login que será alterado para true quando usuario logar
  //o JSON.parse tranforma de string para valor boolenano da variável localstorage key
  const [estaLogado, setEstaLogado] = useState(JSON.parse(localStorage.getItem('key')));

  function logOut(){
    localStorage.setItem('key', false);
  };

  return (
    <div className="App">
          
            <MainScren>
            <Router>
              {!estaLogado && <Navigate to="/login" replace/>}
              {estaLogado && <Navbar sair={logOut}/>}
              <Routes>
                <Route path="/mensagens" element={<TextScren/>}/>
                <Route path="/crm" element={<Crm/>}/>
                <Route path="/perfil" element={<Perfil/>}/>
                <Route path="/login" element={estaLogado ? <Navigate to="/mensagens" replace/> : <LoginForm alterarEstadoDeLogin={setEstaLogado}/>}/>
                <Route path="/cadastro" element={<Register/>}/>
              </Routes>
            </Router>  
            </MainScren>
          
      
    </div>
  )
};






export default App;