package uni.saarland.se.cdit;

import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement

public class Ticket {

    private int id;
    private String title;
    private String creationDate;
    private String description;    
    private int priorityId;    
    private int typeId;    
    private int statusId;    
    private int projectId;

    private int[] users;
    private int[] labels;

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
	
	public int[] getLabels() {
		return labels;
	}

	public void setLabels(int[] labels) {
		this.labels = labels;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getCreationDate() {
		return creationDate;
	}

	public void setCreationDate(String creation_date) {
		this.creationDate = creation_date;
	}

	public int getPriorityId() {
		return priorityId;
	}

	public void setPriorityId(int id) {
		this.priorityId = id;
	}
	
	public int getTypeId() {
		return typeId;
	}

	public void setTypeId(int id) {
		this.typeId = id;
	}
	
	public int getStatusId() {
		return statusId;
	}

	public void setStatusId(int id) {
		this.statusId = id;
	}
	
	public int getProjectId() {
		return projectId;
	}

	public void setProjectId(int id) {
		this.projectId = id;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}
	
}