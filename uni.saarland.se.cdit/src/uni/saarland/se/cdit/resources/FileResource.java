package uni.saarland.se.cdit.resources;

import java.io.File;
import java.io.InputStream;
import java.util.List;

import javax.annotation.security.PermitAll;
import javax.annotation.security.RolesAllowed;
import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.GET;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.ResponseBuilder;

import org.glassfish.jersey.media.multipart.FormDataContentDisposition;
import org.glassfish.jersey.media.multipart.FormDataParam;
import org.glassfish.jersey.media.multipart.file.DefaultMediaTypePredictor;
import org.glassfish.jersey.server.JSONP;

import uni.saarland.se.cdit.classes.Attachment;
import uni.saarland.se.cdit.classes.MessageHandler;
import uni.saarland.se.cdit.dataaccess.FileDAO;

@Path("/files")
public class FileResource {
	
	FileDAO dao = new FileDAO();
	
	@RolesAllowed({"admin","user"})
	@POST
	@Path("/upload")
	@Consumes(MediaType.MULTIPART_FORM_DATA)
	@Produces({ MediaType.APPLICATION_JSON, "application/javascript", MediaType.APPLICATION_XML })
	public Response uploadFile(
		            @FormDataParam("file") InputStream fileInputStream,
		            @FormDataParam("file") FormDataContentDisposition contentDispositionHeader) {
		
		
		 // save the file to the server
		boolean success = dao.saveFile(fileInputStream, contentDispositionHeader.getFileName());
		if(success)
			return Response.status(200).entity(dao.createAttachment(contentDispositionHeader.getFileName())).build();
		else
			return Response.status(500).entity(new MessageHandler("Uploading file failed. Please try again.")).build();
	}
	
	@RolesAllowed({"admin","user"})
	@JSONP(queryParam="jsonpCallback")
	@POST
	@Consumes({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
	@Produces({ MediaType.APPLICATION_JSON, "application/javascript", MediaType.APPLICATION_XML })
	public Attachment addFile(Attachment file) {
		System.out.println("creating file");
		return file;
	}
	
	@PermitAll
	@GET @Path("/{id}/{query}/download")
	public Response downloadFile(@PathParam("id") int fileId, @PathParam("query") String fileName) {
		FileDAO dao = new FileDAO();
		boolean success = dao.checkFile(fileId, fileName);
		if(success){
			System.out.println("testing ");
		    File file = new File(dao.getFilesPath() + "/" + fileName);
		    ResponseBuilder response = Response.ok((Object) file, DefaultMediaTypePredictor.CommonMediaTypes.getMediaTypeFromFile(file)); 
		    response.header("Content-Disposition", "attachment;filename="+file.getName());
		    return response.build();
	    }else{
	    	return Response.status(400).entity(new MessageHandler("The request cannot be completed because of bad paramters. Retry again.")).build();
	    }
	}
	
	@RolesAllowed({"admin","user"})
	@GET
	@Path("/getProjectFiles/{projectId}")
	@Produces({ MediaType.APPLICATION_JSON, "application/javascript", MediaType.APPLICATION_XML })
	public List<Attachment> getProjectAttachments(@PathParam("projectId") int id) {
		System.out.println("getting project files");
	    return dao.getProjectAttachments(id);
	}
	
}
