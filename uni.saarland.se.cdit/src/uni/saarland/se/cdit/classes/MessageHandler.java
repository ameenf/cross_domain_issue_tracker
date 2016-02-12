package uni.saarland.se.cdit.classes;

import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
public class MessageHandler {
	private String message;

	public MessageHandler(){
		
	}
	
	public MessageHandler(String m){
		message = m;
	}
	/**
	 * @return the message
	 */
	public String getMessage() {
		return message;
	}

	/**
	 * @param message the message to set
	 */
	public void setMessage(String message) {
		this.message = message;
	}
}
