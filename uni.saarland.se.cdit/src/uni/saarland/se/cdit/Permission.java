package uni.saarland.se.cdit;
import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
public class Permission {
	
	private String name;
	
	/**
	 * @return the name
	 */
	public String getName() {
		return name;
	}
	/**
	 * @param name the name to set
	 */
	public void setName(String name) {
		this.name = name;
	}
}
