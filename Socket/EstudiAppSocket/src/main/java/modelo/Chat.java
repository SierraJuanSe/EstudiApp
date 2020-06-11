package modelo;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

import org.java_websocket.WebSocket;

public class Chat {
	private String nombre;
	private ArrayList<Msg> mensajes;
	HashMap<String, WebSocket> conectados;
	
	public Chat(String nombre) {
		this.nombre = nombre;
		this.mensajes = new ArrayList<Msg>();
		this.conectados = new HashMap<String, WebSocket>();
	}
	
	public void addMsg(Msg msg,  WebSocket conn) {
		this.mensajes.add(msg);
		
		this.SendtoAll(msg);
	}
	
	public void addConectado(String nombre, WebSocket conn) {
		if(this.conectados.put(nombre, conn) == null) {
			System.out.println(this.conectados);
		}
	}
	
	public void SendtoAll(Msg msg) {
		
		String info = "{\"type\":\"msg\", \"from\":\""+msg.getFrom()+"\", \"to\":\""+this.nombre+"\""
				+ ", \"msg\":\""+msg.getMensaje()+"\", \"time\":\""+msg.getHora()+"\"}";
		
		System.out.println(this.nombre+" "+ info);
		
		for (String key : this.conectados.keySet()) {
			if(!key.equalsIgnoreCase(msg.getFrom())) {
				this.conectados.get(key).send(info);
			}
		}
		
		
	}
	
	public void sendTodo(WebSocket conn) {
		
		for(Msg msg: this.mensajes) {
			String info = "{\"type\":\"msg\", \"from\":\""+msg.getFrom()+"\", \"to\":\""+this.nombre+"\""
					+ ", \"msg\":\""+msg.getMensaje()+"\", \"time\":\""+msg.getHora()+"\"}";
			
			conn.send(info);
		}
	}
	
	public HashMap<String, WebSocket> getConectados() {
		return conectados;
	}

	public void setConectados(HashMap<String, WebSocket> conectados) {
		this.conectados = conectados;
	}

	public String getNombre() {
		return nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	public ArrayList<Msg> getMensajes() {
		return mensajes;
	}

	public void setMensajes(ArrayList<Msg> mensajes) {
		this.mensajes = mensajes;
	}
	
	
	
	
}
