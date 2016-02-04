package uni.saarland.se.cdit;

import java.util.List;

import javax.annotation.security.PermitAll;
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

@Path("/general")
public class GeneralResource {

	GeneralDAO dao = new GeneralDAO();
	
	@JSONP(queryParam = "jsonpCallback")
	@GET @Path("/status")
	@Produces({ MediaType.APPLICATION_JSON, "application/javascript", MediaType.APPLICATION_XML })
	public List<Status> getAllStatus() {
		System.out.println("findAllStatus");
		return dao.getAllStatus();
	}
	
	@JSONP(queryParam = "jsonpCallback")
	@GET @Path("/type")
	@Produces({ MediaType.APPLICATION_JSON, "application/javascript", MediaType.APPLICATION_XML })
	public List<Type> getAllType() {
		System.out.println("findAllTypes");
		return dao.getAllTypes();
	}

	@JSONP(queryParam = "jsonpCallback")
	@GET @Path("/priority")
	@Produces({ MediaType.APPLICATION_JSON, "application/javascript", MediaType.APPLICATION_XML })
	public List<Priority> getAllPriority() {
		System.out.println("findAllPriority");
		return dao.getAllPriority();
	}
	
	@JSONP(queryParam = "jsonpCallback")
	@GET @Path("/label")
	@Produces({ MediaType.APPLICATION_JSON, "application/javascript", MediaType.APPLICATION_XML })
	public List<Label> getAllLabel() {
		System.out.println("findAlllabels");
		return dao.getAllLabels();
	}
	
	@JSONP(queryParam = "jsonpCallback")
	@GET @Path("/permissions")
	@Produces({ MediaType.APPLICATION_JSON, "application/javascript", MediaType.APPLICATION_XML })
	public List<Permission> getAllPermissions() {
		System.out.println("findAlllabels");
		return dao.getAllPermissions();
	}
	
}
