package uni.saarland.se.cdit;

import java.io.InputStream;
import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import org.glassfish.jersey.media.multipart.FormDataContentDisposition;
import org.glassfish.jersey.media.multipart.FormDataParam;

@Path("/files")
public class FileResource {
	
	FileDAO dao = new FileDAO();
	
	@POST
	@Path("/upload")
	@Consumes(MediaType.MULTIPART_FORM_DATA)
	public Response uploadFile(
		            @FormDataParam("file") InputStream fileInputStream,
		            @FormDataParam("file") FormDataContentDisposition contentDispositionHeader) {
		
		
		 // save the file to the server
		boolean success = dao.saveFile(fileInputStream, contentDispositionHeader.getFileName());
		String output;
		if(success)
			output = contentDispositionHeader.getFileName();
		else
			output = "ERROR";
		return Response.status(200).entity(output).build();
	}
	// save uploaded file to a defined location on the server
	
	@POST
	@Consumes({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
	@Produces({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
	public Ticket create(Ticket ticket) {
		System.out.println("creating ticket");
		return ticket;
	}
	
}
