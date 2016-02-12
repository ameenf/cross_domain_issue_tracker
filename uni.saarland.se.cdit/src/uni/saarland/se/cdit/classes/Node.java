package uni.saarland.se.cdit.classes;
import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
public class Node {
	private int id;
	private int projectId;
	private int userId;
	private int statusId;
	private int positionX;
	private int positionY;
	private int ticketsCount;
	private Arrow[] arrows;
	/**
	 * @return the id
	 */
	public int getId() {
		return id;
	}
	/**
	 * @param id the id to set
	 */
	public void setId(int id) {
		this.id = id;
	}
	/**
	 * @return the projectId
	 */
	public int getProjectId() {
		return projectId;
	}
	/**
	 * @param projectId the projectId to set
	 */
	public void setProjectId(int projectId) {
		this.projectId = projectId;
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
	/**
	 * @return the statusId
	 */
	public int getStatusId() {
		return statusId;
	}
	/**
	 * @param statusId the statusId to set
	 */
	public void setStatusId(int statusId) {
		this.statusId = statusId;
	}
	/**
	 * @return the positionX
	 */
	public int getPositionX() {
		return positionX;
	}
	/**
	 * @param positionX the positionX to set
	 */
	public void setPositionX(int positionX) {
		this.positionX = positionX;
	}
	/**
	 * @return the positionY
	 */
	public int getPositionY() {
		return positionY;
	}
	/**
	 * @param positionY the positionY to set
	 */
	public void setPositionY(int positionY) {
		this.positionY = positionY;
	}
	/**
	 * @return the arrows
	 */
	public Arrow[] getArrows() {
		return arrows;
	}
	/**
	 * @param arrows the arrows to set
	 */
	public void setArrows(Arrow[] arrows) {
		this.arrows = arrows;
	}
	/**
	 * @return the ticketCount
	 */
	public int getTicketsCount() {
		return ticketsCount;
	}
	/**
	 * @param ticketCount the ticketCount to set
	 */
	public void setTicketsCount(int ticketCount) {
		this.ticketsCount = ticketCount;
	}
}
