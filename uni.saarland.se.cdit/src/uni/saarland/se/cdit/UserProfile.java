package uni.saarland.se.cdit;
import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
public class UserProfile {
	private int userId;
	private String firstName;
	private String lastName;
	private String field;
	private String experience;
	private String links;
	
	/**
	 * @return the users_id
	 */
	public int getUserId() {
		return userId;
	}
	/**
	 * @param users_id the users_id to set
	 */
	public void setUserId(int users_id) {
		this.userId = users_id;
	}
	/**
	 * @return the firstName
	 */
	public String getFirstName() {
		return firstName;
	}
	/**
	 * @param firstName the firstName to set
	 */
	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}
	/**
	 * @return the lastName
	 */
	public String getLastName() {
		return lastName;
	}
	/**
	 * @param lastName the lastName to set
	 */
	public void setLastName(String lastName) {
		this.lastName = lastName;
	}
	/**
	 * @return the field
	 */
	public String getField() {
		return field;
	}
	/**
	 * @param field the field to set
	 */
	public void setField(String field) {
		this.field = field;
	}
	/**
	 * @return the experience
	 */
	public String getExperience() {
		return experience;
	}
	/**
	 * @param experience the experience to set
	 */
	public void setExperience(String experience) {
		this.experience = experience;
	}
	/**
	 * @return the links
	 */
	public String getLinks() {
		return links;
	}
	/**
	 * @param links the links to set
	 */
	public void setLinks(String links) {
		this.links = links;
	}
}
