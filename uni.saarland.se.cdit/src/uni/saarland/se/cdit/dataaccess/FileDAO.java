package uni.saarland.se.cdit.dataaccess;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.ResourceBundle;

import uni.saarland.se.cdit.classes.Attachment;
import uni.saarland.se.cdit.helpers.ConnectionHelper;

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
	
	public List<Attachment> getProjectAttachments(int projectId) {
		List<Attachment> list = new ArrayList<Attachment>();
        Connection c = null;
        PreparedStatement ps = null;
        String statement = "SELECT attachment_id, attachment_fullname, t.ticket_id FROM attachment as a, ticket as t "+
        				   "WHERE a.ticket_id=t.ticket_id AND t.project_id=?";
        try {
            c = ConnectionHelper.getConnection();
            ps = c.prepareStatement(statement);
            
            ps.setInt(1, projectId);
            ResultSet rs = ps.executeQuery();
            while(rs.next()){
            	list.add(processRow(rs));
            }
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException(e);
		} finally {
			ConnectionHelper.close(c);
		}
        return list;
    }
	
	public Attachment create(Attachment file) {
        Connection c = null;
        PreparedStatement ps = null;
        String statement = "INSERT INTO attachment(attachment_fullname, attachment_fullname, ticket_id) VALUES (?, ?, ?)";
        try {
            c = ConnectionHelper.getConnection();
            ps = c.prepareStatement(statement, new String[] { "attachment_id" });
            
            ps.setString(1, file.getFullname());
            ps.setString(2, file.getFullname());
            ps.setInt(3, (file.getTicketId()!=0)?file.getTicketId():null);
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
	
	public String create(String filename) {
        Connection c = null;
        PreparedStatement ps = null;
        String result;
        String statement = "INSERT INTO attachment(attachment_fullname, attachment_url) VALUES (?, ?)";
        try {
            c = ConnectionHelper.getConnection();
            ps = c.prepareStatement(statement, new String[] { "attachment_id" });
            
            ps.setString(1, filename);
            ps.setString(2, filename);
            ps.executeUpdate();
            ResultSet rs = ps.getGeneratedKeys();
            rs.next();
            // Update the id in the returned object. This is important as this value must be returned to the client.
            int id = rs.getInt(1);
            result = String.valueOf(id)+":"+filename;
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException(e);
		} finally {
			ConnectionHelper.close(c);
		}
        return result;
    }
	
	public Attachment createAttachment(String filename) {
        Connection c = null;
        PreparedStatement ps = null;
        Attachment result = new Attachment();
        result.setFullname(filename);
        String statement = "INSERT INTO attachment(attachment_fullname, attachment_url) VALUES (?, ?)";
        try {
            c = ConnectionHelper.getConnection();
            ps = c.prepareStatement(statement, new String[] { "attachment_id" });
            
            ps.setString(1, filename);
            ps.setString(2, filename);
            ps.executeUpdate();
            ResultSet rs = ps.getGeneratedKeys();
            rs.next();
            // Update the id in the returned object. This is important as this value must be returned to the client.
            int id = rs.getInt(1);
            result.setId(id);
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException(e);
		} finally {
			ConnectionHelper.close(c);
		}
        return result;
    }
	
	private Attachment processRow(ResultSet rs) throws SQLException{
		Attachment file = new Attachment();
		file.setId(rs.getInt("attachment_id"));
		file.setFullname(rs.getString("attachment_fullname"));
		file.setTicketId(rs.getInt("ticket_id"));
		return file;
	}
}
