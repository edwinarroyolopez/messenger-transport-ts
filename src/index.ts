import express from 'express';
import bodyParser from 'body-parser'; // Import body-parser
import { v4 as uuidv4 } from 'uuid'; // Importamos uuid para generar IDs únicos
import Notifier from './notifier';
import { messageReceiver, messageReceiverMessage } from './messageReceiver';


interface Message {
  _id: string | null;
  user: string;
  text: string;
}

const app = express();
const port = 3000;

const myNotifier = new Notifier();

// Use body-parser middleware
app.use(bodyParser.json());

// Endpoint to send notifications
app.get('/notify', (req, res) => {
  const notification = 'New notification: Hello World!';
  myNotifier.sendNotification(notification);
  res.send('Notification sent');
});

// Endpoint to send messages (Changed to POST)
app.post('/message', (req, res) => {  
  const { body } = req
  const { _id, user, text  }:{ _id:string, user:string, text:string } = req.body  
  
  if (text && user) {
    myNotifier.sendMessage({ user, text });
    res.send(`
      user: ${user}  - ${_id}
      message: "${text}" sent`);
  } else {
    res.status(400).send('Bad Request: Message text is missing');
  }
});

// SSE endpoint to listen for messages
app.get('/listen-messages', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  const messageHandler = (message: string) => {
    res.write(`data: ${message}\n\n`);
  };

  myNotifier.on('message', messageHandler);

  req.on('close', () => {
    myNotifier.off('message', messageHandler);
  });
});

// Subscribe message receivers
myNotifier.on('notification', messageReceiver);
myNotifier.on('message', messageReceiverMessage);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
