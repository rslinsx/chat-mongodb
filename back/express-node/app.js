const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const cors = require('cors');
const {newUser, Mensagem, crmSchema, mensagensSchema} = require("./mongodb");
const { default: mongoose } = require('mongoose');



//Config
    // Body Parser(o próprio express agora tem essa função, daí nao precisa importar body-parser)
    app.use(express.urlencoded({extended:false}))
    app.use(express.json()) 
    app.use(cors());
    const io = require('socket.io')(server, {
      cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST']
      },
    });

//Conexão mongodb
    require('./mongodb');    


//logica socket io

io.on('connection', socket => {
  console.log('usuario conectado!', socket.id);

  socket.on('disconnect', reason=>{
      console.log('usuário desconectado!', socket.id);
  })

  socket.on('enviarMensagem', message => {

      const mensagensDeUmaConversa = mongoose.model(message.keyConversation, mensagensSchema);
      
      const novaMes = new mensagensDeUmaConversa({
      emailLogado: message.emailLogado,
      conteudo: message.mensagem
      });

      novaMes.save().then(()=>{
      console.log('salvo com sucesso!')
      }).catch((err)=>{
      console.log(err);
      });

      mensagensDeUmaConversa.find({}).then((data)=>{
        // console.log(data);  
      socket.data.allMessages = data;
      console.log(socket.data.allMessages);
      io.emit(message.keyConversation, socket.data.allMessages);
      }).catch((err)=>{
      console.log(err);
      })
  });

  
    socket.on('clickConversaAtual', action=>{

    const mensagensDeUmaConversa = mongoose.model(action.keyConversation, mensagensSchema);

    mensagensDeUmaConversa.find({}).then((data)=>{
      socket.data.allMessages = data;
      console.log(socket.data.allMessages);
      io.emit(action.keyConversation, socket.data.allMessages);
    }).catch((err)=>{
      console.log(err);
    });
  });

  

});


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

  app.post('/crm/contatos', (req, res)=>{
      const todosUsuariosDeUmEmail = mongoose.model(req.body.crmBuscado, crmSchema);
      todosUsuariosDeUmEmail.find({}).then((data)=>{
        res.json(data);
      }).catch((err)=>{
        console.log(err);
      })
  });

  app.post('/login', (req, res)=>{
    newUser.findOne(req.body).then((data)=>{
      res.json(data);
  }).catch((err)=>{
      console.log('Deu esse erro: '+err);
  });

  });

  app.post("/crm/procurar", (req, res)=>{
      newUser.findOne(req.body).then((data)=>{
        console.log(req.body);
        console.log(data);
        res.json(data);
      }).catch((err)=>{
        console.log(err);
      });
  });


  app.post("/crm/cadastrar", (req, res)=>{
     const novoContato = mongoose.model(`${req.body.emailUserAtual}contact`, crmSchema);
     novoContato.findOne({email: req.body.email}).then((data)=>{

     if(data === null){
     const novoNovoContato = new novoContato({
        email: req.body.email,
        firstname: req.body.nome,
        lastname: req.body.ultimoNome,
     });

     novoNovoContato.save().then(()=>{
        res.json('Usuário cadastrado com sucesso!');
     }).catch((err)=>{
        console.log(err)
     })}else{
       res.json('Esse email já está incluído no seu CRM')
     }})});


  app.post("/registro", (req, res)=>{
    newUser.findOne({email: req.body.email}).then((data)=>{
      if (data === null) {
        const novoRegistro = new newUser({
          email: req.body.email,
          senha: req.body.senha,
          firstname: req.body.nome,
          lastname: req.body.sobrenome,
          chave: true
          });

          novoRegistro.save().then(()=>{
          res.json('Usuário cadastrado com sucesso')
          }).catch((err)=>{
          console.log(err)
          })}else{
            res.json('Já há um cadastro com esse email!')
          }

          }).catch((err)=>{
      console.log(err);
    })});

server.listen(8081, ()=>{
    console.log('Servidor rodando na porta 8081');
});

