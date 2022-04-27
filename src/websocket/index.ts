import express from 'express';
import socketlization from 'express-ws';

const websocketApp: any = express();
socketlization(websocketApp);

websocketApp.ws('/', (websocket, req) => {
    websocket.on('open', function () {
        console.log('newConnection');
    });
    websocket.on('open', () => {
        console.log('close');
    });
    websocket.on('close', () => {
        console.log('close');
    });
});

export default websocketApp;
