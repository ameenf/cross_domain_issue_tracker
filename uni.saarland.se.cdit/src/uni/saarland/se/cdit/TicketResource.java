package uni.saarland.se.cdit;

import java.util.List;

import javax.annotation.security.PermitAll;
import javax.annotation.security.RolesAllowed;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.HeaderParam;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.ResponseBuilder;



import org.glassfish.jersey.server.JSONP;

	
	@Path("/tickets")
	public class TicketResource {

		TicketDAO dao = new TicketDAO();
		int counter = 0;
		
		@RolesAllowed("user")
		@JSONP(queryParam = "jsonpCallback")
		@GET
		@Produces({ MediaType.APPLICATION_JSON, "application/javascript", MediaType.APPLICATION_XML })
		public List<Ticket> getAll() {
			System.out.println("findAll");
			return dao.findAll();
		}
		
		@JSONP(queryParam = "jsonpCallback")
		@GET @Path("searchByTitle/{query}")
		@Produces({ MediaType.APPLICATION_JSON, "application/javascript", MediaType.APPLICATION_XML })
		public List<Ticket> getTicketsByTitle(@PathParam("query") String query) {
			System.out.println("findByTitle: " + query);
			return dao.findByTitle(query);
		}
		
		@JSONP(queryParam = "jsonpCallback")
		@GET @Path("getNodeTickets/{id}")
		@Produces({ MediaType.APPLICATION_JSON, "application/javascript", MediaType.APPLICATION_XML })
		public List<Ticket> getTicketsByNodeId(@PathParam("id") String id) {
			System.out.println("findByNode: " + id);
			return dao.findByNode(Integer.parseInt(id));
		}
		
		@JSONP(queryParam = "jsonpCallback")
		@GET @Path("getProjectTickets/{id}")
		@Produces({ MediaType.APPLICATION_JSON, "application/javascript", MediaType.APPLICATION_XML })
		public List<Ticket> getTicketsByProjectId(@PathParam("id") int id) {
			System.out.println("findByNode: " + id);
			return dao.findByProject(id);
		}
		
		@JSONP(queryParam = "jsonpCallback")
		@GET @Path("searchByType/{query}")
		@Produces({ MediaType.APPLICATION_JSON, "application/javascript", MediaType.APPLICATION_XML })
		public List<Ticket> getTicketsByType(@PathParam("query") String query) {
			System.out.println("findByType: " + query);
			return dao.findByType(query);
		}

		@JSONP(queryParam = "jsonpCallback")
		@GET @Path("searchById/{id}")
		@Produces({ MediaType.APPLICATION_JSON, "application/javascript", MediaType.APPLICATION_XML })
		public Ticket getTicketByTicketId(@PathParam("id") String id) {
			System.out.println("findById " + id);
			return dao.findById(Integer.parseInt(id));
		}
	
		@JSONP(queryParam = "jsonpCallback")
		@POST
		@Consumes({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
		@Produces({ MediaType.APPLICATION_JSON, "application/javascript", MediaType.APPLICATION_XML })
		public Ticket addTicket(Ticket ticket) {
			System.out.println("creating ticket");
			return dao.create(ticket);
		}
		
		@JSONP(queryParam = "jsonpCallback")
		@PUT @Path("update")
		@Consumes({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
		@Produces({ MediaType.APPLICATION_JSON, "application/javascript", MediaType.APPLICATION_XML })
		public Ticket updateTicket(Ticket ticket) {
			System.out.println("Updating ticket: " + ticket.getTitle());
			dao.update(ticket);
			return ticket;
		}
		
		@DELETE @Path("remove/{id}")
		@Produces({ MediaType.APPLICATION_JSON, "application/javascript", MediaType.APPLICATION_XML })
		public boolean deleteTicket(@PathParam("id") int id) {
			return dao.remove(id);
		}
		
		@JSONP(callback = "callback", queryParam = "jsonpCallback")
		@GET @Path("test")
		@Produces({ MediaType.APPLICATION_JSON, "application/javascript",  MediaType.APPLICATION_XML })
		public String test(@HeaderParam("user-agent") String str, @HeaderParam("Content-Type") String str2){
			return("{\"user-agent\":\""+str+"\", \"content-type\":\""+str2+"\"}");
		}

	}
