
package uni.saarland.se.cdit.classes;
import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
public class Feedback {

    private int id;
    private int ticketId;
    private int userId;
    private String feedbackDate;
    private String feedbackText;  
    
    public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}
	
    /**
     * @return feedbackDate
     */
    public String getFeedbackDate() {
		return feedbackDate;
	}

	/**
	 * @param feedbackDate
	 */
	public void setFeedbackDate(String feedbackDate) {
		this.feedbackDate = feedbackDate;
	}
	
	/**
	 * @return feedbackText
	 */
	public String getFeedbackText() {
		return feedbackText;
	}

	/**
	 * @param feedbackText
	 */
	public void setFeedbackText(String feedbackText) {
		this.feedbackText = feedbackText;
	}
	
	public int getTicketId() {
		return ticketId;
	}

	/**
	 * @param ticketId
	 */
	public void setTicketId(int ticketId) {
		this.ticketId = ticketId;
	}

	/**
	 * @return the userId
	 */
	public int getUserId() {
		return userId;
	}

	/**
	 * @param userId the userId to set
	 */
	public void setUserId(int userId) {
		this.userId = userId;
	}
}
