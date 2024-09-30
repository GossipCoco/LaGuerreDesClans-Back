const fs = require('fs');
const https = require('https');
const bodyParser = require('body-parser')
const express = require("express");
const cors = require("cors");
require('dotenv').config();
const PORT = process.env.PORT || 4047;
const http = require('http')
const app = express();
const helmet = require("helmet")
const SocketIOController = require('./app/controllers/socketIOController')



const Home = require('./app/routes/home')
const User = require('./app/routes/user')
const Character = require('./app/routes/character')
const Clan = require('./app/routes/clan')
const Grade = require('./app/routes/grade')
const Image = require('./app/routes/image')
const Game = require('./app/routes/Game')
const Fiction = require('./app/routes/fiction')
const chatgptRouter = require('./app/routes/chatgpt');
const Event = require('./app/routes/event')
const Quest = require('./app/routes/quest')
const imagegenRouter  = require('./app/routes/imagegen');
const ArcBook = require('./app/routes/ArcBook')
const Rating = require('./app/routes/Rating')
const Chapter = require('./app/routes/Chapter')
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60, // 15 minutes * 1000
  max: 500, // limite chaque IP à 100 requêtes par windowMs
  message: 'Trop de requêtes créées à partir de cette IP, veuillez réessayer après 15 minutes'
});

const corsOptions = {
  // origin: '*',
  origin: [
    'http://localhost:8081',
    "http://192.168.1.14:8081",
    "http://172.20.1.151:8081",
    "http://192.168.1.14:8081",
    'http://10.20.0.22:8081',
    'http://192.168.253.153:8081',
    'http://192.168.62.223:8081',
    'http://10.117.60.254:8081'
  ],
  cors: {
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
  }
}
app
  .use('*',cors(corsOptions))
  .use(bodyParser.urlencoded({ limit: '50mb', extended: true }))
  .use(bodyParser.json({ limit: '50mb', extended: true }))
  .use(helmet())
  .use(limiter)
  .use('/Home', Home)
  .use('/quest', Quest)
  .use('/character', Character)
  .use('/clan', Clan)
  .use('/grade', Grade)
  .use('/image', Image)
  .use('/game', Game)
  .use('/fiction', Fiction)
  .use('/api', chatgptRouter)
  .use('/api', imagegenRouter)
  .use('/event', Event)
  .use('/user', User)
  .use('/ArcBook', ArcBook)
  .use('/chapter', Chapter)
  .use('/rating', Rating)
  .use(function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.status(404).send({ result: 'error' });
  })
  const options = {
    key: fs.readFileSync('./key.pem'),
    cert: fs.readFileSync('./cert.pem'),
    minVersion: 'TLSv1.2',  // Force l'utilisation de TLS 1.2 et supérieur
    ciphers: [
      'ECDHE-RSA-AES256-GCM-SHA384',
      'ECDHE-RSA-AES128-GCM-SHA256',
      'AES256-GCM-SHA384',
      'AES128-GCM-SHA256'
    ].join(':'),
    honorCipherOrder: true
  };
  

//sk-proj-FnVZLiN8rhhkaOaV6wtvT3BlbkFJjHwbQkQlDBTdlHVIlJhW <- API Key ChatGPT
const serv = http.createServer( app);
serv.listen(PORT, (err) => {
  if (err) {
    console.error('Failed to start server:', err);
  } else {
    console.log(`Server is running securely on port ${PORT}.`);
  }
  SocketIOController(serv, corsOptions)
  console.log(`Server is running on port ${PORT}.`);
});
// app.get('/', (req, res) => {
//   res.send('Hello, HTTPS World!');
//   console.log(`${req.method} request for '${req.url}'`);
//   next();
// });