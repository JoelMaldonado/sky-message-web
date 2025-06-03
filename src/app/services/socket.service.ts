import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  private socket: Socket;

  constructor() {
    this.socket = io('http://localhost:7419', {
      transports: ['websocket'], // más directo
    });
  }

  listenAvailable(): Observable<any> {
    return new Observable((subscriber) => {
      this.socket.on('cellphone.available', (data) => {
        subscriber.next(data);
      });
    });
  }

  getConnected() {
    return new Observable((subscriber) => {
      this.socket.on('cellphone.sync', (data) => {
        subscriber.next(data);
      });
    });
  }
}
