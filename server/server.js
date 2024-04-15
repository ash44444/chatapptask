const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const dotenv = require('dotenv');
const path = require('path');

const PORT = process.env.PORT || 4000;

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('message', (message) => {
    console.log('New message:', message);
    io.emit('message', message);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});
const __dirname1=path.resolve();
if(process.env.NODE_ENV===production){
  app.use(express.static(path.join(__dirname1,'/frontend/build')))

  app.get('*',(req,res)=> {
    res.sendFile(path.resolve(__dirname1,'frontend','build','index.html'))
  })
}
else{

}





server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});