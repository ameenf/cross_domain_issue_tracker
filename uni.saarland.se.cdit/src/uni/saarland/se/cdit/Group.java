package uni.saarland.se.cdit;
import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
public class Group {
	private int id;
	private String name;
	private String description;
	private int[] permissions;
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
	/**
	 * @return the description
	 */
	public String getDescription() {
		return description;
	}
	/**
	 * @param description the description to set
	 */
	public void setDescription(String description) {
		this.description = description;
	}
	/**
	 * @return the permissions
	 */
	public int[] getPermissions() {
		return permissions;
	}
	/**
	 * @param permissions the permissions to set
	 */
	public void setPermissions(int[] permissions) {
		this.permissions = permissions;
	}
}
