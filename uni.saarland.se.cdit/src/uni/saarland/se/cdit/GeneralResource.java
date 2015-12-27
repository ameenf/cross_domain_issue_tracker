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

@Path("/general")
public class GeneralResource {

	GeneralDAO dao = new GeneralDAO();
	
	@GET @Path("/status")
	@Produces({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
	public List<Status> getAllStatus() {
		System.out.println("findAllStatus");
		return dao.getAllStatus();
	}
	
	@GET @Path("/type")
	@Produces({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
	public List<Type> getAllType() {
		System.out.println("findAllTypes");
		return dao.getAllTypes();
	}

	@GET @Path("/priority")
	@Produces({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
	public List<Priority> getAllPriority() {
		System.out.println("findAllPriority");
		return dao.getAllPriority();
	}
	
}