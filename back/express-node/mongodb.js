const mongoose = require('mongoose');

const mongoUrl = 'mongodb://127.0.0.1:27017/chatmongodb';

mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true }).then(()=>{
    console.log('Conectado com sucesso ao mongodb');
}).catch((err)=>{
    console.log('Erro ao conectar ao mongodb: '+ err);
});

const userSchema = new mongoose.Schema({
    email: String,
    firstname: String,
    lastname: String,
    senha: String,
    chave: Boolean
});

const crmSchema = new mongoose.Schema({
    email: String,
    firstname: String,
    lastname: String,
})

const mensagensSchema = new mongoose.Schema({
    email: String,
    conteudo: String
}, {
    versionKey: false
});


const newUser = mongoose.model('Users', userSchema);
// const newTest = mongoose.model('Users', userSchema);
const Mensagem = mongoose.model('Mensagens', mensagensSchema);
//teste contaot crm usando schema
// var Contacts = mongoose.model('Contact', crmSchema);


// newContactTest.save().then(()=>{
//   console.log('Usuário cadastrado com sucesso!');
// }).catch((err)=>{
//     console.log('Deu esse erro aqui: '+err);
// });

// newContact.find({}).then((data)=>{
//     console.log(data)
// }).catch((err)=>{
//     console.log(err)
// });

// const newMessage = new Mensagem ({
//     conteudo: 'Esse é um pequeno teste'
// });

// const novoUsuarioTeste = new newTest({
//     email: 'lethicia@gmail.com',
//     senha: '1234',
//     firstname: "Lethicia",
//     lastname: "Pinho",
//     chave: true
// });

const novoUsuario = new newUser({
    email: 'rafael@gmail.com',
    senha: '1234',
    firstname: "Rafael",
    lastname: "Lins",
    chave: true
});

// newUser.findOne({ email: 'rafael@gmail.com', senha: 'teste123456' }).then((data)=>{
//    console.log(data);
// }).catch((err)=>{
//     console.log('Deu esse erro: '+err);
// }); 

// novoUsuarioTeste.save().then(()=>{
//    console.log('novo usuario cadastrado')
// }).catch((err)=>{
//     console.log('deu esse erro: '+err)
// });

// newMessage.save().then(()=>{
//     console.log('Mensagem enviada com sucesso!');
// }).catch((err)=>{
//      console.error('deu esse erro aqui, pai vei: '+err);
// });

module.exports =  {
     Mensagem: Mensagem,
     newUser: newUser,
     crmSchema: crmSchema
}


