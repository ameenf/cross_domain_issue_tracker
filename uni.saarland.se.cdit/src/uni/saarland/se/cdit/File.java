package uni.saarland.se.cdit;

import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
public class File {

	private int id;
	private String type;
	private String url;
	private int ticketID;
	
	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}
	
	public int getTicketId() {
		return ticketID;
	}

	public void setTicketId(int ticketID) {
		this.ticketID = ticketID;
	}
	
	public String getType() {
		return type;
	}

	public void setTypee(String type) {
		this.type = type;
	}
	
	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}
}
