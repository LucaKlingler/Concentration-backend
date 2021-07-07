const path = require('path');
require('dotenv').config({path: path.join(__dirname, '..', '.env')})
const express = require('express');
const cors = require('cors');
const http = require('http');
const mongoose = require('mongoose');

if (!process.env.MONGO_USER || !process.env.MONGO_PWD || !process.env.MONGO_URL || !process.env.MONGO_DB || !process.env.JWT_SECRET) return console.error('Please set all the required env vars: MONGO_USER MONGO_PWD MONGO_URL MONGO_DB JWT_SECRET');

require('app-module-path').addPath(path.join(`${__dirname}`, './models'));
require('app-module-path').addPath(path.join(`${__dirname}`, './middleware'));
require('app-module-path').addPath(path.join(`${__dirname}`, '../res/'));

const routes = require('./routes');

// Erstellt Express Anwendung
const app = express();
app.use(express.json());
app.use(cors());
app.use('/', routes);

// verbindet datenbank
const mongoUrl = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PWD}@${process.env.MONGO_URL}/${process.env.MONGO_DB}?retryWrites=true&w=majority`;
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => console.log('db connected')).catch((err) => console.error(err));

// startet Server
const server = http.createServer(app);
server.listen(3000);
// eslint-disable-next-line no-console
console.log(Date.now(), 'Server gestartet @ 3000');
// MONGO_USER MONGO_PWD MONGO_URL MONGO_DB JWT_SECRET
