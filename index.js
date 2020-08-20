const express = require('express');
const path = require('path');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'public'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');



app.use('/', (req,res) =>{
    res.render('index.html');
})

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
        console.log('rom open' + data.nomeproduto)
        //let json = JSON.parse(data)
        data.valorunitario = parseFloat(data.valorunitario).toFixed(2)
        
       io.sockets.in(data.room).emit('receive', data);
   })


})

console.log('carregado...')

server.listen(process.env.PORT || 3000);