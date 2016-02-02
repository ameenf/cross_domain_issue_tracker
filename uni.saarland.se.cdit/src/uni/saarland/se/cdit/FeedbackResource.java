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

	
@Path("/feedback")
@PermitAll
public class FeedbackResource {

	FeedbackDAO dao = new FeedbackDAO();
	
	@GET @Path("getTicketFeedback/{id}")
	@Produces({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
	public List<Feedback> getTicketFeedback(@PathParam("id") String id) {
		System.out.println("getTicketFeedback " + id);
		return dao.getTicketFeedback(Integer.parseInt(id));
	}
	
	@POST
	@Consumes({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
	@Produces({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
	public Feedback create(Feedback feedback) {
		System.out.println("creating feedback");
		return dao.create(feedback);
	}
	
	@PUT @Path("update")
	@Consumes({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
	@Produces({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
	public Feedback update(Feedback feedback) {
		System.out.println("Updating feedback");
		dao.update(feedback);
		return feedback;
	}
	
	@DELETE @Path("remove/{id}")
	@Produces({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
	public boolean remove(@PathParam("id") int id) {
		return dao.remove(id);
	}
}
