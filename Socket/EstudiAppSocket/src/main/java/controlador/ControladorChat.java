package controlador;

import java.net.InetSocketAddress;
import java.util.HashMap;

import org.java_websocket.WebSocket;
import org.java_websocket.handshake.ClientHandshake;
import org.java_websocket.server.WebSocketServer;

public class ControladorChat extends WebSocketServer{
	private final static int port = 30000;
	private HashMap<String, WebSocket> clientes;
	
	public ControladorChat(){
		super(new InetSocketAddress(port));
		this.clientes =  new HashMap<String, WebSocket>();
	}

	@Override
	public void onOpen(WebSocket conn, ClientHandshake handshake) {
		// TODO Auto-generated method stub
		this.clientes.put(conn.getRemoteSocketAddress().toString(), conn);
		System.out.println(this.clientes);
	}

	@Override
	public void onClose(WebSocket conn, int code, String reason, boolean remote) {
		this.clientes.remove(conn.getRemoteSocketAddress().toString());
	}

	@Override
	public void onMessage(WebSocket conn, String message) {
		// TODO Auto-generated method stub
		conn.send(message);
	}

	@Override
	public void onError(WebSocket conn, Exception ex) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void onStart() {
		System.out.println("El servidor ha iniciado");
	}
	
}
