package uni.saarland.se.cdit;

import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
public class ErrorHandler {
	private String message;

	public ErrorHandler(){
		
	}
	
	public ErrorHandler(String m){
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
