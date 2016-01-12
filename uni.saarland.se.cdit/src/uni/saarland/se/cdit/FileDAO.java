package uni.saarland.se.cdit;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ResourceBundle;

public class FileDAO {
	
	private String filesPath;
	
	public FileDAO(){
		ResourceBundle bundle = ResourceBundle.getBundle("cdit");
		filesPath = bundle.getString("files.path");
	}
	
	public String getFilesPath(){
		return filesPath;
	}

	public boolean saveFile(InputStream uploadedInputStream, String fileName) {
		boolean success = false;
		try {
			 	OutputStream outpuStream = new FileOutputStream(new File(filesPath+fileName));
	            int read = 0;
	            byte[] bytes = new byte[1024];
	            while ((read = uploadedInputStream.read(bytes)) != -1) {
	            	outpuStream.write(bytes, 0, read);
	            }
		        outpuStream.flush();
		        success = true;
		        outpuStream.close();
		    } catch (IOException e) {
		        e.printStackTrace();
		}
		return success;
	}
	
	public Attachment create(Attachment file) {
        Connection c = null;
        PreparedStatement ps = null;
        String statement = "INSERT INTO attachment(attachment_type, attachment_url, ticket_id) VALUES (?, ?, ?)";
        try {
            c = ConnectionHelper.getConnection();
            ps = c.prepareStatement(statement, new String[] { "attachment_id" });
            
            ps.setString(1, file.getType());
            ps.setString(2, file.getUrl());
            ps.setInt(3, file.getTicketId());
            ps.executeUpdate();
            ResultSet rs = ps.getGeneratedKeys();
            rs.next();
            // Update the id in the returned object. This is important as this value must be returned to the client.
            int id = rs.getInt(1);
            file.setId(id);
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException(e);
		} finally {
			ConnectionHelper.close(c);
		}
        return file;
    }
}
