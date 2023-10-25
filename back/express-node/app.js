const express = require('express');
const app = express();


//Config
    // Body Parser(o próprio express agora tem essa função, daí nao precisa importar body-parser)
    app.use(express.urlencoded({extended:false}))
    app.use(express.json()) 

//Conexão mongodb
    require('./mongodb');    

//Rotas

  app.get('/', (req, res)=>{
    res.send('Somente um teste');
  });



app.listen(8081, ()=>{
    console.log('Servidor rodando na porta 8081');
});