"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = __importDefault(require("ws"));
const webSocketServer = new ws_1.default.Server({ port: 8080 });
webSocketServer.on('connection', webSocket => {
    webSocket.on('message', function message(data, isBinary) {
        const message = isBinary ? data : data.toString();
        console.log('Received:', message);
        broadcast(message);
    });
});
function broadcast(data) {
    webSocketServer.clients.forEach(client => {
        if (client.readyState === ws_1.default.OPEN) {
            client.send(data);
        }
    });
}
