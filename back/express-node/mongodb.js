const mongoose = require('mongoose');

const mongoUrl = 'mongodb://127.0.0.1:27017/chatmongodb';

mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true }).then(()=>{
    console.log('Conectado com sucesso ao mongodb');
}).catch((err)=>{
    console.log('Erro ao conectar ao mongodb: '+ err);
});

const mensagensSchema = new mongoose.Schema({
    conteudo: String
}, {
    versionKey: false
});

const Mensagem = mongoose.model('Mensagens', mensagensSchema);

const newMessage = new Mensagem ({
    conteudo: 'Esse é um pequeno teste'
});

// newMessage.save().then(()=>{
//     console.log('Mensagem enviada com sucesso!');
// }).catch((err)=>{
//     console.error('deu esse erro aqui, pai vei: '+err);
// });

Mensagem.find({}).then((data) => {
    data.forEach((documento) => {
      console.log(documento.conteudo);
    });
  }).catch((err) => {
    console.log(err);
  });



