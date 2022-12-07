import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import express from 'express';
import expressSession from 'express-session';
import { subscribe, createConnection } from './rabbitmq-service.js';
import router from './router.js';
import getConfiguredPassport from './passport-config.js';

const PORT = process.env.PORT || 3006;
const baseApiPath = 'api';

// global __dirname is only available in CommonJS.
// use this for ES module.
const __dirname = dirname(fileURLToPath(import.meta.url));

// initiate Rabbit MQ
await createConnection()
  .then(() => {
    // continuously consume message (usually put in consumer server)
    subscribe();
  })
  .catch((err) => {
    console.error('Fail connecting to RabbitMQ.', err);
    // throw 'Fail starting server';
  });

// initiate passport
const passport = getConfiguredPassport();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(expressSession({
  name: 'my-user-auth',
  secret: 'my-secret-admirer',
  resave: false,
  saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());

// register router
app.use(`/${baseApiPath}`, router);

// serve static html built from react
app.use(express.static(join(__dirname, '..', 'dist')));

app.use((req, res) => {
  // handle react route
  if (req.path.split('/')[1] !== baseApiPath) {
    return res.sendFile(join(__dirname, '..', 'dist', 'index.html'));

  }
  
  // handle invalid api path
  return res.status(404).json({
    message: 'page not found'
  });
});

// handle error
app.use((err, req, res, next) => {
  console.error(err.stack);
  let status = err.status || 500;
  if (err.message === 'unauthorized') {
    status = 401;
  }

  res.status(status).json({ message: err.message || 'Unexpected error' });
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
