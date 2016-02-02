package uni.saarland.se.cdit;

import java.io.File;
import java.io.InputStream;

import javax.annotation.security.PermitAll;
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

@Path("/files")
@PermitAll
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
	
	@POST
	@Consumes({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
	@Produces({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
	public Attachment create(Attachment file) {
		System.out.println("creating file");
		return file;
	}
	
	@GET
	@Path("/{query}")
	//@Produces("application/pdf")
	public Response downloadFile(@PathParam("query") String fileName) {
		FileDAO dao = new FileDAO();
	    File file = new File(dao.getFilesPath() + "/" + fileName);
	    ResponseBuilder response = Response.ok((Object) file, DefaultMediaTypePredictor.CommonMediaTypes.getMediaTypeFromFile(file)); 
	    response.header("Content-Disposition", "attachment;filename="+file.getName());
	    return response.build();
	}
	
	@GET
	public Response returnFileList() {
		FileDAO dao = new FileDAO();
		String location = dao.getFilesPath();
		File dir = new File(location);
		File[] files = dir.listFiles();
		String output = "<html><head></head><body><h1>Files available:</h1>";
		for (File f : files){
			if(f.isFile()){
				output = output + "<a href=" + f.getName() + " />" + f.getName() + "<br>\n";
			}
		}
		output += "</body></html>";
	    return Response.status(200).entity(output).build();
	}
	
}
