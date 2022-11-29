const io = require('socket.io')(3000, {
  cors: {
    origin: '*'
  }
})


io.on('connection',(socket)=>{
  console.log('client connected: ',socket.id)

  socket.on('disconnect',(reason)=>{
    console.log(reason)
  })
  
  socket.on('sent', (data) => {
      io.emit('sending-to-front', data)
  })
})



