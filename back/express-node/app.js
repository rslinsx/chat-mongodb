const express = require('express');
const app = express();
const cors = require('cors');
const {newUser, Mensagem, crmSchema} = require("./mongodb");



//Config
    // Body Parser(o próprio express agora tem essa função, daí nao precisa importar body-parser)
    app.use(express.urlencoded({extended:false}))
    app.use(express.json()) 
    app.use(cors());

//Conexão mongodb
    require('./mongodb');    

//Rotas

  app.get('/', (req, res)=>{
    res.send('Somente um teste');
  });

  app.get('/mensagens', (req, res)=>{ 
    Mensagem.find({}).then((data) => {
        res.json(data);
      }).catch((err) => {
      console.log(err);
})});

  app.post('/mensagens', (req, res)=>{
    const novaMensagem = new Mensagem(req.body);

    novaMensagem.save().then((mensagem)=>{
      res.status(201).json(mensagem);
    }).catch((err)=>{
      console.log(err);
      res.status(500).json({ error: 'Erro ao criar mensagem'});
    })
  });

  app.get("/crm", (req, res)=>{
    
  })

  app.post('/login', (req, res)=>{
    newUser.findOne(req.body).then((data)=>{
      console.log(req.body);
      console.log(data);
      res.json(data);
  }).catch((err)=>{
      console.log('Deu esse erro: '+err);
  });

  });

  app.post("/crm", (req, res)=>{
      console.log(req.body);
  });

app.listen(8081, ()=>{
    console.log('Servidor rodando na porta 8081');
});

