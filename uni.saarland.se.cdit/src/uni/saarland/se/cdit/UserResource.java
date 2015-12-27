package uni.saarland.se.cdit;

import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.FormParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@Path("/users")
public class UserResource {

	UserDAO dao = new UserDAO();
	
	@POST @Path("login")
	public Response addUser(
			@FormParam("inputEmail") String email,
			@FormParam("inputPassword") String password) {
			return Response.status(200)
				.entity(dao.authenticate(email, password))
				.build();

	}
	
	@GET
	@Produces({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
	public List<User> getAll() {
		System.out.println("getAll");
		return dao.getAll();
	}
}
