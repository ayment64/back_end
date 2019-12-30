const express = require('express'),
  app = express(),
  bodyParser = require('body-parser');
  port = process.env.PORT || 3000;
  const multer = require('multer');
const io = require('socket.io').listen(server);
app.get('/', (req, res) => {

res.send('Chat Server is running on port 3000')
});

const mysql = require('mysql');
// connection configurations
const mc = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'mydb'
});
// connect to database
mc.connect();

app.listen(port);

console.log('API server started on: ' + port);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


io.on('connection', (socket) => {

  console.log('user connected')
  
  socket.on('join', function(userNickname) {
  
          console.log(userNickname +" : has joined the chat "  );
  
          socket.broadcast.emit('userjoinedthechat',userNickname +" : has joined the chat ");
      })
  
  
  socket.on('messagedetection', (senderNickname,messageContent) => {
  
         //log the message in console 
  
         console.log(senderNickname+" : " +messageContent)
  
        //create a message object 
  
        let  message = {"message":messageContent, "senderNickname":senderNickname}
  
         // send the message to all users including the sender  using io.emit() 
  
        io.emit('message', message )
  
        })
  
  socket.on('disconnect', function() {
  
          console.log(userNickname +' has left ')
  
          socket.broadcast.emit( "userdisconnect" ,' user has left')
  
  
  
  
      })
  
  
  
  
  })

var routes = require('./app/routes/approutes'); //importing route
routes(app); //register the route