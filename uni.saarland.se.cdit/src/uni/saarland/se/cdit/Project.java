package uni.saarland.se.cdit;

import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
public class Project {
	private int id;
	private String description;
    private String title;
    private int[] users;
    
    public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}
	
	public int[] getUsers() {
		return users;
	}

	public void setUsers(int[] users) {
		this.users = users;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}
	
	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}
}