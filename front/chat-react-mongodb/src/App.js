import { useState } from 'react';
import MainScren from './components/layout/MainScren';
import Navbar from './components/layout/Navbar';
import TextScren from './components/layout/TextScren';
import InputText from './components/layout/InputText';
import Crm from './components/layout/Crm';
import Perfil from './components/layout/Perfil';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import './App.css';
import LoginForm from './components/layout/LoginForm';

function App() {

  //Função de printar messagem
  const [inputValue, setInputValue] = useState('');
  const [inputMessage, setMessage] = useState('');


  const sendMessage = () =>{
    //Enviar nova mensagem para o servidor
    fetch('http://localhost:8081/mensagens', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ conteudo: inputMessage, teste: "fechou" })
    }).then(()=>{
      console.log('ok');
    }).catch((err)=>{
      console.log('Deu esse erro aqui, pai vei: '+err);
    });
};


  function ochInputValue(event){
    setInputValue(event.target.value);
    setMessage(inputValue);
  };

  const currentPath = window.location.pathname;
  
  

  return (
    <div className="App">
          
            <MainScren>
            <Router>
              
              {currentPath!== '/login' && <Navbar />}
              <Routes>
                <Route path="/mensagens" element={<TextScren/>}/>
                <Route path="/crm" element={<Crm/>}/>
                <Route path="/perfil" element={<Perfil/>}/>
                <Route path="/login" element={<LoginForm/>}/>
              </Routes>
            </Router>  
            </MainScren>
          
      
    </div>
  )
};








export default App;
