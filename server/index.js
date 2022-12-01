const cors = require('cors');
const app = require('express')();
const httpServer = require('http').createServer(app);
const options = { cors: { origin: '*' }}
const io = require('socket.io')(httpServer, options);
app.use(cors());


console.log(io)

io.on('connection',(socket)=>{
  console.log('client connected: ',socket.id)

  socket.on('disconnect',(reason)=>{
    console.log(reason)
  })

  socket.on('sent', (data) => {

    io.emit('sending-to-front', data)
  })
})

httpServer.listen(8080, () => {
console.log(`Server running at http://localhost:8080`);
});


app.get('/', (req, res) => {
  res.send('<h1>YES IT FUCKING WORKED OMG</h1>');
})

