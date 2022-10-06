import path from 'path';
import express from 'express';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { subscribe, createConnection } from './rabbitmq-service.js';
import { publishMessage } from './controller.js';

// global __dirname is only available in CommonJS.
// use this for ES module.
const __dirname = dirname(fileURLToPath(import.meta.url));
const PORT = process.env.PORT || 3006;

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

const app = express();

app.get('/api/meal', (req, res) => {
  res.json({ success: true });
});
app.get('/api/send-message', publishMessage);

// serve static html built from react
app.use(express.static(path.join(__dirname, '..', 'dist')));

// handle react route
app.use((req, res, next) => {
  if (req.path.split('/')[1] === 'api') {
    // handle invalid api path
    return res.status(404).json({ message: 'page not found' });
  }

  res.sendFile(path.join(__dirname, '..', 'dist', 'index.html'));
});

// handle error
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Unexpected error' });
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
