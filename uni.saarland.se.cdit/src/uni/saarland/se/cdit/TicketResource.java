package uni.saarland.se.cdit;

import java.util.List;

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
		
		@GET
		@Produces({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
		public List<Ticket> findAll() {
			System.out.println("findAll");
			return dao.findAll();
		}
		
		
		@GET @Path("searchByTitle/{query}")
		@Produces({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
		public List<Ticket> findByTitle(@PathParam("query") String query) {
			System.out.println("findByTitle: " + query);
			return dao.findByTitle(query);
		}
		
		@GET @Path("getNodeTickets/{id}")
		@Produces({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
		public List<Ticket> getNodeTickets(@PathParam("id") String id) {
			System.out.println("findByNode: " + id);
			return dao.findByNode(Integer.parseInt(id));
		}
		
		@GET @Path("searchByType/{query}")
		@Produces({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
		public List<Ticket> findByType(@PathParam("query") String query) {
			System.out.println("findByType: " + query);
			return dao.findByType(query);
		}

		@GET @Path("searchById/{id}")
		@Produces({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
		public Ticket findById(@PathParam("id") String id) {
			System.out.println("findById " + id);
			return dao.findById(Integer.parseInt(id));
		}
	

		@POST
		@Consumes({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
		@Produces({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
		public Ticket create(Ticket ticket) {
			System.out.println("creating ticket");
			return dao.create(ticket);
		}
		

		@PUT @Path("update")
		@Consumes({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
		@Produces({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
		public Ticket update(Ticket ticket) {
			System.out.println("Updating ticket: " + ticket.getTitle());
			dao.update(ticket);
			return ticket;
		}
		
		@DELETE @Path("remove/{id}")
		@Produces({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
		public boolean remove(@PathParam("id") int id) {
			return dao.remove(id);
		}
		
		@JSONP
		@GET @Path("test")
		public Response test(@HeaderParam("user-agent") String str, @HeaderParam("Content-Type") String str2){
			Hello.counter++;
			System.out.println(counter);
			ResponseBuilder response = Response.ok((Object) "{\"user-agent\":\""+String.valueOf(Hello.counter)+"\", \"content-type\":\""+str2+"\"}"); 
			response.header("Content-Type", "application/javascript");
		    return response.build();
		}

	}
