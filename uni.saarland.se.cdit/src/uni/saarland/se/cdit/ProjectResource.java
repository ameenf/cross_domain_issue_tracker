package uni.saarland.se.cdit;

import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

	
	@Path("/projects")
	public class ProjectResource {

		ProjectDAO dao = new ProjectDAO();
		
		@GET
		@Produces({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
		public List<Project> findAll() {
			System.out.println("findAll");
			return dao.findAll();
		}
		
		@GET @Path("searchByUser/{id}")
		@Produces({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
		public List<Project> findById(@PathParam("id") String id) {
			System.out.println("findByUser " + id);
			return dao.findByUser(Integer.parseInt(id));
		}
		
		@POST
		@Consumes({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
		@Produces({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
		public Project create(Project project) {
			System.out.println("creating project");
			return dao.create(project);
		}
		
		@PUT @Path("update")
		@Consumes({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
		@Produces({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
		public Project update(Project project) {
			System.out.println("Updating project: " + project.getTitle());
			dao.update(project);
			return project;
		}
		
		@DELETE @Path("remove/{id}")
		@Produces({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
		public boolean remove(@PathParam("id") int id) {
			return dao.remove(id);
		}
		
	}