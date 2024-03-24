import { EventEmitter } from 'events';
interface Message {
    _id?: string;
    user: string;
    text: string;
}

class Notifier extends EventEmitter {
  sendNotification(notification: string) {
    this.emit('notification', notification);
  }

  sendMessage({ user, text }: Message) {
    this.emit('message', `${user}: ${text}`);
  }
}

export default Notifier;