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

@Path("/workflow")
public class WorkflowResource {
	
	NodeDAO dao = new NodeDAO();
	
	@GET @Path("getProjectWorkflow/{id}")
	@Produces({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
	public List<Node> getWorkflow(@PathParam("id") String id) {
		System.out.println("findById " + id);
		return dao.getWorkflow(Integer.parseInt(id));
	}
	
	@PUT @Path("updatePosition")
	@Consumes({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
	@Produces({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
	public Node updateNodePosition(Node node){
		System.out.println("updating position");
		return dao.updateNodePosition(node);
	}
}
