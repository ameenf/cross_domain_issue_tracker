package uni.saarland.se.cdit;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

// Plain old Java Object it does not extend as class or implements 
// an interface

// The class registers its methods for the HTTP GET request using the @GET annotation. 
// Using the @Produces annotation, it defines that it can deliver several MIME types,
// text, XML and HTML. 

// The browser requests per default the HTML MIME type.

//Sets the path to base URL + /hello
@Path("/hello")
public class Hello {

  // This method is called if TEXT_PLAIN is request
  @GET
  @Produces(MediaType.TEXT_PLAIN)
  public String sayPlainTextHello() {
    return "Hello Jersey";
  }

  // This method is called if XML is request
  @GET
  @Produces(MediaType.TEXT_XML)
  public String sayXMLHello() {
    return "<?xml version=\"1.0\"?>" + "<hello> Hello Jersey" + "</hello>";
  }

  // This method is called if HTML is request
  @GET
  @Produces(MediaType.TEXT_HTML)
  public String sayHtmlHello() {
	  
	  Connection c = null;
	  
		try {
			c = DriverManager.getConnection(
					"jdbc:postgresql://127.0.0.1:5432/cdit_db", "postgres",
					"admin");
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		String sql = "SELECT * FROM users";
		
		
		PreparedStatement ps;
		ResultSet rs;
		String users_id = "";
		String users_username = "";
		String users_password = "";
		String users_email = "";
		String users_type = "";
		
		try {
			ps = c.prepareStatement(sql);
			
			rs = ps.executeQuery();
			
			while (rs.next()) {
				users_id = rs.getString("users_id");
				users_username = rs.getString("users_username");
				users_password = rs.getString("users_password");
				users_email = rs.getString("users_email");
				users_type = rs.getString("users_type");
			}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
    return "<html> " + "<title>" + "Hello Jersey" + "</title>"
        + "<body><h1>" + "users_id" + users_id +  "users_username" + users_username + "users_password" + users_password + "users_email" + users_email + "users_type" + users_type +"</body></h1>" + "</html> ";
  }
  

} 