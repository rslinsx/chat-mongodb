import logo from './logo.svg';
import { useState } from 'react';
import MainScren from './components/layout/MainScren';
import Navbar from './components/layout/Navbar';
import TextScren from './components/layout/TextScren';
import InputText from './components/layout/InputText';
import './App.css';




function App() {

  //Função de printar messagem
  const [inputValue, setInputValue] = useState('');
  const [inputMessage, setMessage] = useState('');

  function ochInputValue(event){
    setInputValue(event.target.value);
  };

  function printMessage(){
    setMessage(inputValue);
  }



  return (
    <div className="App">
      <MainScren>
        <Navbar/>
        <TextScren text={inputMessage}/>
        <InputText ochInputValue={ochInputValue} printMessage={printMessage}/>
      </MainScren>
    </div>
  )
};








export default App;
