const express = require('express');
const cors = require('cors');
const http = require('http');
const mongoose = require('mongoose');

const config = require('../res/config.json');
const routes = require('./routes');

// Erstellt Express Anwendung
const app = express();
app.use(express.json());
app.use(cors());
app.use('/', routes);

// Erstellt Webserver und SocketIo server
const server = http.createServer(app);
const io = require('socket.io')(server);

io.on('connection', function(socket) {
  // Use socket to communicate with this particular client only, sending it it's own id
  socket.emit('welcome', { message: 'Welcome!', id: socket.id });

  socket.on('i am client', console.log);
});

// verbindet datenbank
const mongoUrl = `mongodb+srv://${config.mongoUsr}:${config.mongoPwd}@${config.mongoUrl}/${config.mongoDbName}?retryWrites=true&w=majority`;
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => console.log('db connected')).catch(() => console.error('error db'));

// startet Server
server.listen(3011);
// eslint-disable-next-line no-console
console.log('Server gestartet @ 3010');