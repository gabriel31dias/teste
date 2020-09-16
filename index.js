const express = require('express');
const path = require('path');
const app = express();
const bodyparser = require('body-parser');
const { urlencoded } = require('body-parser');
const server = require('http').createServer(app);
const io = require('socket.io')(server);

app.use(bodyparser.json)
app.use(bodyparser.urlencoded({extended:false}))




app.use('/', (req,res) =>{
    //res.render('index.html');
})


app.post('/notifica', function (req, res) {

  let  bb = req.body
 /// gg = JSON.parse(req)
  
 
 return res.send('fesfes')


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

console.log('carregado...')

server.listen(process.env.PORT || 3000);