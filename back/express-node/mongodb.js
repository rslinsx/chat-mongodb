const mongoose = require('mongoose');

const mongoUrl = 'mongodb://127.0.0.1:27017/';

mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true }).then(()=>{
    console.log('Conectado com sucesso ao mongodb');
}).catch((err)=>{
    console.log('Erro ao conectar ao mongodb: '+ err);
});