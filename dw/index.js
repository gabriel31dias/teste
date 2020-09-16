const express = require('express');
const path = require('path');
const app = express();
const servex = express();
const bodyparser = require('body-parser');
const { urlencoded } = require('body-parser');
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const router = express.Router()
const porthttp = 3400;
const portsocket = 3000;

let express2 = require('express'),
    appx = express();
var bodyParser = require('body-parser');

appx.use(express2.static(__dirname + '/public'));

appx.use(bodyParser.urlencoded({
   extended: false
}));

appx.use(bodyParser.json());

appx.get('/', function(req, res){
    
    
});


appx.post('/comunica',function(req,res){
    let respons = JSON.stringify(req.body)
    res.send(respons);
});




let messages = [];

io.on('connection', socket =>{
    console.log(`Socket connected:  ${socket.id}`);
    
    socket.emit('previousMessages', 'dwadawdwada');

    socket.on('sendMessage', data =>{
        console.log(data);
        messages.push(data);
        socket.broadcast.emit('receivedMessage', data);
    })

    socket.on('createroom', function(room) {
        socket.join(room);
    });


    socket.on('canalcomunica',function(data){
         console.log(data.room)
         io.sockets.in(data.room).emit('receive', data);
    })

    socket.on('enviajson',function(data){
       // console.log('rom open' + data.nomeproduto)
        //let json = JSON.parse(data)

        try {

            let aux = data.valorunitario.replace(",", ".")
            data.valorunitario = parseFloat(aux).toFixed(2)
         }
         catch (e) {
           
         }

         try {

            let aux = data.preco_custo.replace(",", ".")
            data.preco_custo = parseFloat(aux).toFixed(4)
         }
         
         catch (e) {
           
         }

         try {

            let aux = data.valorcusto.replace(",", ".")
            data.valorcusto = parseFloat(aux).toFixed(2)
         }
         
         catch (e) {
           
         }


       io.sockets.in(data.room).emit('receive', data);
   })


})


server.listen(process.env.PORT || portsocket);
console.log('->>> Executando socket porta' + portsocket )
appx.listen( process.env.PORT || porthttp);
console.log('->>> Executando http porta' + porthttp )








