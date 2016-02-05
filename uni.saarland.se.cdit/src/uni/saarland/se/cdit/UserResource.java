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

@Path("/users")
public class UserResource {

	UserDAO dao = new UserDAO();
	@PermitAll
	@JSONP(queryParam="jsonpCallback")
	@POST @Path("login")
	@Consumes({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
	@Produces({ MediaType.APPLICATION_JSON, "application/javascript", MediaType.APPLICATION_XML })
	public Response authenticate(User user) {
		boolean success = dao.authenticate(user);
		if(success)
			return Response.status(200).entity(dao.getUser(user)).build();
		else
			return Response.status(401).entity(new ErrorHandler("Wrong username or password.")).build();

	}
	
	@JSONP(queryParam="jsonpCallback")
	@GET
	@Produces({ MediaType.APPLICATION_JSON, "application/javascript", MediaType.APPLICATION_XML })
	public List<User> getAllUsers() {
		System.out.println("getAll");
		return dao.getAll();
	}
	
	@JSONP(queryParam="jsonpCallback")
	@GET @Path("getProfile/{user_id}")
	@Produces({ MediaType.APPLICATION_JSON, "application/javascript", MediaType.APPLICATION_XML })
	public UserProfile getUserProfile(@PathParam("user_id") int id){
		System.out.println("get user profile" + id);
		return dao.getProfile(id);
	}
	
	@JSONP(queryParam="jsonpCallback")
	@GET @Path("groups")
	@Produces({ MediaType.APPLICATION_JSON, "application/javascript", MediaType.APPLICATION_XML })
	public List<Group> getGroups(){
		System.out.println("get groups");
		return dao.getGroups();
	}
	
	@JSONP(queryParam="jsonpCallback")
	@GET @Path("findByProject/{project_id}")
	@Produces({ MediaType.APPLICATION_JSON, "application/javascript", MediaType.APPLICATION_XML })
	public List<User> findUsersByProject(@PathParam("project_id") int id) {
		System.out.println("get users by project id");
		return dao.findByProjectId(id);
	}
	
	@JSONP(queryParam="jsonpCallback")
	@POST @Path("groups")
	@Consumes({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
	@Produces({ MediaType.APPLICATION_JSON, "application/javascript", MediaType.APPLICATION_XML })
	public Group createGroup(Group group) {
		System.out.println("creating group");
		return dao.createGroup(group);
	}
	
	@JSONP(queryParam="jsonpCallback")
	@POST
	@Consumes({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
	@Produces({ MediaType.APPLICATION_JSON, "application/javascript", MediaType.APPLICATION_XML })
	public User create(User user) {
		System.out.println("creating user");
		return dao.create(user);
	}
	
	@JSONP(queryParam="jsonpCallback")
	@POST @Path("createProfile")
	@Consumes({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
	@Produces({ MediaType.APPLICATION_JSON, "application/javascript", MediaType.APPLICATION_XML })
	public UserProfile createProfile(UserProfile profile) {
		System.out.println("creating user profile");
		return dao.createProfile(profile);
	}
	
	@PUT @Path("updatePassword")
	@Consumes({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
	public Response updatePassword(User user) {
		System.out.println("Updating password");
		return Response.status(200)
				.entity(dao.updatePassword(user))
				.build();
	}
	
	@PUT @Path("updateProfile")
	@Consumes({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
	public Response updateProfile(UserProfile profile) {
		System.out.println("Updating profile");
		return Response.status(200)
				.entity(dao.updateProfile(profile))
				.build();
	}
	
	@JSONP(queryParam="jsonpCallback")
	@DELETE @Path("remove/{id}")
	@Produces({ MediaType.APPLICATION_JSON, "application/javascript", MediaType.APPLICATION_XML })
	public boolean remove(@PathParam("id") int id) {
		return dao.remove(id);
	}
}
