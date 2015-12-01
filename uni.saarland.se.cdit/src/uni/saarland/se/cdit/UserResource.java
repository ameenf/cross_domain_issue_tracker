package uni.saarland.se.cdit;

import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.FormParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Response;

@Path("/users")
public class UserResource {

	@POST @Path("login")
	public Response addUser(
			@FormParam("inputEmail") String email,
			@FormParam("inputPassword") String password) {
			UserDAO dao = new UserDAO();
			return Response.status(200)
				.entity(dao.authenticate(email, password))
				.build();

		}
}
