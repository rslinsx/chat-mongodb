const mongoose = require('mongoose');

const mongoUrl = 'mongodb://127.0.0.1:27017/chatmongodb';

mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true }).then(()=>{
    console.log('Conectado com sucesso ao mongodb');
}).catch((err)=>{
    console.log('Erro ao conectar ao mongodb: '+ err);
});

const userSchema = new mongoose.Schema({
    email: String,
    senha: String,
    chave: Boolean
});

const mensagensSchema = new mongoose.Schema({
    conteudo: String
}, {
    versionKey: false
});

const newUser = mongoose.model('Users', userSchema);
const Mensagem = mongoose.model('Mensagens', mensagensSchema);

const newMessage = new Mensagem ({
    conteudo: 'Esse é um pequeno teste'
});

const novoUsuario = new newUser({
    email: 'rafael@gmail.com',
    senha: 'teste123456',
    chave: true
});




// novoUsuario.save().then(()=>{
//     console.log('novo usuario cadastrado')
// }).catch((err)=>{
//     console.log('deu esse erro: '+err)
// });


// newMessage.save().then(()=>{
//     console.log('Mensagem enviada com sucesso!');
// }).catch((err)=>{
//      console.error('deu esse erro aqui, pai vei: '+err);
// });

module.exports =  Mensagem ;



