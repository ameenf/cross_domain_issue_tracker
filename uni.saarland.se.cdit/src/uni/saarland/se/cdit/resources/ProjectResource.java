package uni.saarland.se.cdit.resources;

import java.util.List;

import javax.annotation.security.RolesAllowed;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import org.glassfish.jersey.server.JSONP;

import uni.saarland.se.cdit.classes.Project;
import uni.saarland.se.cdit.dataaccess.ProjectDAO;

	
	@Path("/projects")
	public class ProjectResource {

		ProjectDAO dao = new ProjectDAO();
		
		@RolesAllowed({"admin"})
		@JSONP(queryParam="jsonpCallback")
		@GET
		@Produces({ MediaType.APPLICATION_JSON, "application/javascript", MediaType.APPLICATION_XML })
		public List<Project> getAll() {
			System.out.println("findAll");
			return dao.findAll();
		}
		
		@RolesAllowed({"admin","user"})
		@JSONP(queryParam="jsonpCallback")
		@GET @Path("searchByUser/{id}")
		@Produces({ MediaType.APPLICATION_JSON, "application/javascript", MediaType.APPLICATION_XML })
		public List<Project> getProjectByUserId(@PathParam("id") String id) {
			System.out.println("findByUser " + id);
			return dao.findByUser(Integer.parseInt(id));
		}
		
		@RolesAllowed({"admin"})
		@JSONP(queryParam="jsonpCallback")
		@POST
		@Consumes({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
		@Produces({ MediaType.APPLICATION_JSON, "application/javascript", MediaType.APPLICATION_XML })
		public Project addProject(Project project) {
			System.out.println("creating project");
			return dao.create(project);
		}
		
		@RolesAllowed({"admin"})
		@JSONP(queryParam="jsonpCallback")
		@PUT @Path("addUsers")
		@Consumes({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
		@Produces({ MediaType.APPLICATION_JSON, "application/javascript", MediaType.APPLICATION_XML })
		public Project addUsersToProject(Project project) {
			System.out.println("adding users to project");
			return dao.addUsers(project);
		}
		
		@RolesAllowed({"admin"})
		@JSONP(queryParam="jsonpCallback")
		@PUT @Path("update")
		@Consumes({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
		@Produces({ MediaType.APPLICATION_JSON, "application/javascript", MediaType.APPLICATION_XML })
		public Project updateProject(Project project) {
			System.out.println("Updating project: " + project.getTitle());
			dao.update(project);
			return project;
		}
		
		@RolesAllowed({"admin"})
		@JSONP(queryParam="jsonpCallback")
		@DELETE @Path("remove/{id}")
		@Produces({ MediaType.APPLICATION_JSON, "application/javascript", MediaType.APPLICATION_XML })
		public boolean deleteProject(@PathParam("id") int id) {
			return dao.remove(id);
		}
		
	}