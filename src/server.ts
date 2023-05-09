import WebSocket from 'ws'

const webSocketServer = new WebSocket.Server({ port: 8080 });

webSocketServer.on('connection', webSocket => {
  webSocket.on('message', function message(data, isBinary) {
    console.log('isBinary: ', isBinary)
    const message = isBinary ? data : data.toString() 
    const messageString: string = message.toString()
    broadcast(messageString);
  });
});

function broadcast(data: string) {
  webSocketServer.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  });
}