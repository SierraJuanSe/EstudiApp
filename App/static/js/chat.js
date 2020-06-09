const url = 'ws://localhost:30000';
const websocket = new WebSocket(url);

websocket.onopen = function(evt) {
  alert('Conectado')
}

