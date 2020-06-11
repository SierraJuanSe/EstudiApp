package modelo;

public class Msg {
	private String from;
	private String mensaje;
	private String hora;
	
	public Msg(String from, String mensaje, String hora) {
		this.from = from;
		this.mensaje = mensaje;
		this.hora = hora;
	}

	public String getFrom() {
		return from;
	}

	public void setFrom(String from) {
		this.from = from;
	}

	public String getMensaje() {
		return mensaje;
	}

	public void setMensaje(String mensaje) {
		this.mensaje = mensaje;
	}

	public String getHora() {
		return hora;
	}

	public void setHora(String hora) {
		this.hora = hora;
	}

	@Override
	public String toString() {
		return "Msg [from=" + from + ", mensaje=" + mensaje + ", hora=" + hora + "]";
	}
	
	
}
