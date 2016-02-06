package uni.saarland.se.cdit;
import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
public class NodeExp {

	private int id ;
	private int projectId ;
	private int sourceNodeId; 
	private int targetNodeId ;
	private int positionX;
	private int positionY;
	private int ticketsCount;
	/**
	 * @return the id
	 */
	public int getId() {
		return id;
	}
	/**
	 * @param workflowId the id to set
	 */
	public void setId(int workflowId) {
		this.id = workflowId;
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
	 * @return the sourceNodeId
	 */
	public int getSourceNodeId() {
		return sourceNodeId;
	}
	/**
	 * @param sourceNodeId the sourceNodeId to set
	 */
	public void setSourceNodeId(int sourceNodeId) {
		this.sourceNodeId = sourceNodeId;
	}
	/**
	 * @return the targetNodeId
	 */
	public int getTargetNodeId() {
		return targetNodeId;
	}
	/**
	 * @param targetNodeId the targetNodeId to set
	 */
	public void setTargetNodeId(int targetNodeId) {
		this.targetNodeId = targetNodeId;
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
	 * @return the ticketsCount
	 */
	public int getTicketsCount() {
		return ticketsCount;
	}
	/**
	 * @param ticketsCount the ticketsCount to set
	 */
	public void setTicketsCount(int ticketsCount) {
		this.ticketsCount = ticketsCount;
	}


}
