package uni.saarland.se.cdit;
import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
public class Arrow {
	private int id;
	private int sourceNode;
	private int targetNode;
	private String label;
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
	 * @return the sourceNode
	 */
	public int getSourceNode() {
		return sourceNode;
	}
	/**
	 * @param sourceNode the sourceNode to set
	 */
	public void setSourceNode(int sourceNode) {
		this.sourceNode = sourceNode;
	}
	/**
	 * @return the targetNode
	 */
	public int getTargetNode() {
		return targetNode;
	}
	/**
	 * @param targetNode the targetNode to set
	 */
	public void setTargetNode(int targetNode) {
		this.targetNode = targetNode;
	}
	/**
	 * @return the label
	 */
	public String getLabel() {
		return label;
	}
	/**
	 * @param label the label to set
	 */
	public void setLabel(String label) {
		this.label = label;
	}
}
