

const app = require('express')();
const httpServer = require('http').createServer(app);
const options = { cors: { origin: '*' }}
const io = require('socket.io')(httpServer, options);


io.on('connection',(socket)=>{
  console.log('client connected: ',socket.id)

  socket.on('disconnect',(reason)=>{
    console.log(reason)
  })

  socket.on('sent', (data) => {
    io.emit('sending-to-front', data)
  })
})

httpServer.listen(3000, () => {
console.log(`Server running at http://localhost:3000`);
});
