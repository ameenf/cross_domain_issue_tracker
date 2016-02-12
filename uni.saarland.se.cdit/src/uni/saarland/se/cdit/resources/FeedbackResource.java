package uni.saarland.se.cdit.resources;
import java.util.List;

import javax.annotation.security.PermitAll;
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

import uni.saarland.se.cdit.classes.Feedback;
import uni.saarland.se.cdit.dataaccess.FeedbackDAO;

	
@Path("/feedback")
public class FeedbackResource {

	FeedbackDAO dao = new FeedbackDAO();
	
	@RolesAllowed({"admin","user"})
	@JSONP(queryParam="jsonpCallback")
	@GET @Path("getTicketFeedback/{id}")
	@Produces({ MediaType.APPLICATION_JSON, "application/javascript", MediaType.APPLICATION_XML })
	public List<Feedback> getTicketFeedback(@PathParam("id") String id) {
		System.out.println("getTicketFeedback " + id);
		return dao.getTicketFeedback(Integer.parseInt(id));
	}
	
	@JSONP(queryParam="jsonpCallback")
	@POST
	@Consumes({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
	@Produces({ MediaType.APPLICATION_JSON, "application/javascript", MediaType.APPLICATION_XML })
	public Feedback addFeedback(Feedback feedback) {
		System.out.println("creating feedback");
		return dao.create(feedback);
	}
	
	@JSONP(queryParam="jsonpCallback")
	@PUT @Path("update")
	@Consumes({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
	@Produces({ MediaType.APPLICATION_JSON, "application/javascript", MediaType.APPLICATION_XML })
	public Feedback updateFeedback(Feedback feedback) {
		System.out.println("Updating feedback");
		dao.update(feedback);
		return feedback;
	}
	
	@JSONP(queryParam="jsonpCallback")
	@DELETE @Path("remove/{id}")
	@Produces({ MediaType.APPLICATION_JSON, "application/javascript", MediaType.APPLICATION_XML })
	public boolean deleteFeedback(@PathParam("id") int id) {
		return dao.remove(id);
	}
}
