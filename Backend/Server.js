const express = require('express');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const UserApi = require('./api/UserApi');
const ChatApi = require('./api/ChatApi');
const errorHandler = require('./api/middlewares/GlobalException');

module.exports = class Server {
  app = express();
  port = 4000;

  constructor() {
    this.start();
  }

  start() {
    const options = {
      host: '127.0.0.1',
      port: 3306,
      user: 'root',
      password: 'citaku1',
      database: 'chatapp',
      checkExpirationInterval: 900000, // check for expired sessions every 15 minutes
      expiration: 1800, // expires in 30 min
    };

    const sessionStore = new MySQLStore(options);

    require('dotenv').config({
      path: 'backend/secrets/secrets.env',
      encoding: 'utf8',
    });


    this.app.use(
      session({
        secret: process.env.SECRET,
        store: sessionStore,
        resave: false,
        saveUninitialized: true,
        cookie: {
          path: '/',
          secure: 'auto',
          maxAge: 3600000,
        },
      })
    );

    
    this.app.use(express.json({ limit: '50KB' }));

    this.app.use(express.urlencoded({ extended: false }));

    new UserApi(this.app);
    new ChatApi(this.app);

    this.app.use(errorHandler);
    this.app.listen(this.port, () => {
      console.log(`Backend listening on port ${this.port}`);
    });
  }
};