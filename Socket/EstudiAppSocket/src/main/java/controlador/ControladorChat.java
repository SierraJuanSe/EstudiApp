package controlador;

import java.net.InetSocketAddress;
import java.util.HashMap;

import org.java_websocket.WebSocket;
import org.java_websocket.handshake.ClientHandshake;
import org.java_websocket.server.WebSocketServer;

import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

import modelo.Chat;
import modelo.Msg;

public class ControladorChat extends WebSocketServer{
	private final static int port = 30000;
	private HashMap<String, WebSocket> clientes;
	private HashMap<String, Chat> chats;
	
	public ControladorChat(){
		super(new InetSocketAddress(port));
		this.clientes =  new HashMap<String, WebSocket>();
		this.chats = new HashMap<String, Chat>();
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
		desconectar(conn);
	}

	@Override
	public void onMessage(WebSocket conn, String message) {
		decodeMensaje(message, conn);
	}

	@Override
	public void onError(WebSocket conn, Exception ex) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void onStart() {
		System.out.println("El servidor ha iniciado");
	}
	
	public void decodeMensaje(String mensaje, WebSocket conn) {
		JsonElement jsonElement = new JsonParser().parse(mensaje);
        JsonObject jsonObject = jsonElement.getAsJsonObject();
        
        String type = jsonObject.get("type").toString();
        type = type.replace("\"", "");
        
        if(type.equalsIgnoreCase("msg")) {
        	String grupo = jsonObject.get("to").toString();
        	grupo = grupo.replace("\"", "");
        	Chat chat;
        	if(this.chats.containsKey(grupo)) {
        		chat = this.chats.get(grupo);
        	}else {
        		chat = new Chat(grupo);
        		this.chats.put(grupo, chat);
        	}
        	
        	Msg msg = leerMsg(jsonObject);
        	
        	chat.addMsg(msg, conn);
        }else if(type.equalsIgnoreCase("new")) {
        	String nombre = jsonObject.get("from").toString();
        	nombre = nombre.replace("\"", "");
        	
        	String grupo = jsonObject.get("to").toString();
        	grupo = grupo.replace("\"", "");
        	Chat chat;
        	if(this.chats.containsKey(grupo)) {
        		chat = this.chats.get(grupo);
        	}else {
        		chat = new Chat(grupo);
        		this.chats.put(grupo, chat);
        	}
        	
        	chat.addConectado(nombre, conn);
        	chat.sendTodo(conn);
        }else if(type.equalsIgnoreCase("close")) {
        	System.out.println(jsonObject.toString());
        }
	}
	
	public Msg leerMsg(JsonObject jsonObject) {
		String from = jsonObject.get("from").toString();
		from = from.replace("\"", "");
		String mesagge = jsonObject.get("msg").toString();
		mesagge = mesagge.replace("\"", "");
		String time = jsonObject.get("time").toString();
		time = time.replace("\"", "");
		
		return new Msg(from, mesagge, time);
	}
	
	public void desconectar(WebSocket conn){
		
		for(String key1: this.chats.keySet()) {
			Chat chat = this.chats.get(key1);
			
			if(chat.getConectados().containsValue(conn)) {
				for(String key: chat.getConectados().keySet()){
					WebSocket ws = chat.getConectados().get(key);
					if(conn.equals(ws)) {
						chat.getConectados().remove(key);
					}
				}
			}
		}
	}
	
}
