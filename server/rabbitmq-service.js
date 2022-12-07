import amqplib from 'amqplib';

const rabbitHost = 'amqp://localhost';
const myQueue = 'queue1';

/** @type amqplib.Connection */
let connection = null;

export const createConnection = async () => {
  return (connection = await amqplib.connect(rabbitHost));
};

const checkConnection = () => {
  if (!connection) {
    throw new Error('RabbitMQ is not connected')
  }
}

export const sendMessage = (content) => {
  // Create a channel
  checkConnection();
  connection.createChannel().then(async (channel) => {
    // Makes the queue available to the client
    await channel.assertQueue(myQueue, { durable: true });
    channel.sendToQueue(myQueue, Buffer.from(content), {
      persistent: true
    });

    console.log(' [x] Sent %s', content);
  });
};

export const subscribe = () => {
  // Create a channel
  checkConnection();
  connection.createChannel().then(async (channel) => {
    // Makes the queue available to the client
    await channel.assertQueue(myQueue, { durable: true });
    channel.consume(myQueue, (msg) => {
      console.log(' [x] Received %s', msg.content.toString());

      // pretend to do heavy task that last 5 seconds
      setTimeout(() => console.log(" [x] Done"), 5000);

      // if manual acknowledgment mode, tell rabbitMQ that consumer has acked the message 
      // channel.ack(msg);
    }, {
      // automatic acknowledgment mode
      noAck: true
    });
  });
};
