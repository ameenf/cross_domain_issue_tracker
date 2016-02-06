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
import javax.ws.rs.core.Response;

import org.glassfish.jersey.server.JSONP;

@Path("/workflow")
public class WorkflowResource {
	
	WorkflowDAO dao = new WorkflowDAO();
	
	@JSONP(queryParam="jsonpCallback")
	@GET @Path("getWorkflow/{id}")
	@Produces({ MediaType.APPLICATION_JSON, "application/javascript", MediaType.APPLICATION_XML })
	public List<Node> getFlow(@PathParam("id") String id) {
		System.out.println("findById " + id);
		return dao.getFlow(Integer.parseInt(id));
	}
	
	@JSONP(queryParam="jsonpCallback")
	@PUT @Path("updatePosition")
	@Consumes({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
	@Produces({ MediaType.APPLICATION_JSON, "application/javascript", MediaType.APPLICATION_XML })
	public Node updateNodePosition(Node node){
		System.out.println("updating position");
		return dao.updateNodePosition(node);
	}
	
	@JSONP(queryParam="jsonpCallback")
	@POST @Path("node")
	@Consumes({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
	@Produces({ MediaType.APPLICATION_JSON, "application/javascript", MediaType.APPLICATION_XML })
	public Node addNode(Node node){
		System.out.println("creating node");
		return dao.create(node);
	}
	
	@JSONP(queryParam="jsonpCallback")
	@POST @Path("arrow")
	@Consumes({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
	@Produces({ MediaType.APPLICATION_JSON, "application/javascript", MediaType.APPLICATION_XML })
	public Arrow addArrow(Arrow arrow){
		System.out.println("creating arrow");
		return dao.create(arrow);
	}
	
	@JSONP(queryParam="jsonpCallback")
	@PUT @Path("arrow")
	@Consumes({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
	@Produces({ MediaType.APPLICATION_JSON, "application/javascript", MediaType.APPLICATION_XML })
	public Arrow updateArrow(Arrow arrow){
		System.out.println("updating arrow");
		return dao.updateArrow(arrow);
	}
	
	@JSONP(queryParam="jsonpCallback")
	@DELETE @Path("arrow/{id}")
	@Produces({ MediaType.APPLICATION_JSON, "application/javascript", MediaType.APPLICATION_XML })
	public Response remove(@PathParam("id") int id){
		System.out.println("updating arrow");
		boolean success = dao.removeArrow(id);
		if(success)
			return Response.status(200).entity(new MessageHandler("Success!")).build();
		else
			return Response.status(404).entity(new MessageHandler("ID not found!")).build();
	}
}
