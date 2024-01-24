const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const cors = require('cors');
const {newUser, Mensagem, crmSchema, mensagensSchema, listConversas} = require("./mongodb");
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
    console.log('usuário desconectado!', socket.id)});

  socket.on('teste', message=>{
    console.log(message);
  });

  socket.on('EmitirInicio', response=>{

    const novaConversaDeIniciado = mongoose.model(`${response.emailIniciado}ListaDeConversa`, listConversas);
    const novaConversaDeIniciou = mongoose.model(`${response.emailIniciou}ListaDeConversa`, listConversas);

    const newConversa = new novaConversaDeIniciado({
      emailConversaAtual: response.emailIniciou,
    });
    
    const newOutraConversa = new novaConversaDeIniciou({
      emailConversaAtual: response.emailIniciado
    });

    novaConversaDeIniciado.find({emailConversaAtual: response.emailIniciou}).then((data)=>{
      if (data.length === 0) {
          newConversa.save().then(()=>{
            novaConversaDeIniciado.find({}).then((dataAll)=>{
                io.emit(`${response.emailIniciado}ListaDeConversaAtual`, dataAll);
            }).catch((err)=>{
              console.log(err);
            })}).catch((err)=>{
            console.log(err)
          });
      }else{
        console.log("oi " + response.emailIniciado + 'Você já possui uma conversa com esse email: ' + response.emailIniciou);
      };
    });
    
    novaConversaDeIniciou.find({emailConversaAtual: response.emailIniciado}).then((data)=>{
      if (data.length === 0) {
        newOutraConversa.save().then(()=>{
          novaConversaDeIniciou.find({}).then((dataAll)=>{
              io.emit(`${response.emailIniciou}ListaDeConversaAtual`, dataAll);
          }).catch((err)=>{
            console.log(err);
          })}).catch((err)=>{
          console.log(err)
        });
      }else{
        console.log("oi " + response.emailIniciou + 'Você já possui uma conversa com esse email: ' + response.emailIniciado);
      }
    })

  });


  socket.on('listaDeConversaAtual', response=>{
      const listDeConversas = mongoose.model(`${response}ListaDeConversa`, listConversas);
    
      listDeConversas.find({}).then((data)=>{
        socket.emit(`${response}ListaDeConversaAtual`, data);
      }).catch((err)=>{
        console.log(err);
       });
  });


  socket.on('cliqueiNessaConversa', response=>{
    const newMessageModel = mongoose.model(`${response}Mensagen`, mensagensSchema);
    newMessageModel.find({}).then((data)=>{
      io.emit(`${response}conversaemsi`, data);
    })
    
  });

  socket.on('enviarMensagem', response=>{
    const newMessageModel = mongoose.model(`${response.keyMomentChat}Mensagen`, mensagensSchema);
    
    const newMessage = new newMessageModel({
      emailLogado: response.emailQueEnviou,
      conteudo: response.mensagem
    }); 

    newMessage.save().then(()=>{
      newMessageModel.find({}).then((data)=>{
        io.emit(`${response.keyMomentChat}conversaemsi`, data);
      })
    }).catch((err)=>{
      console.log(err);
    });

  })




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


  //Rota que verifica login e senha
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

  //rota de cadastro de usuario
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

