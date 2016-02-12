package uni.saarland.se.cdit.dataaccess;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import javax.ws.rs.core.Response;

import uni.saarland.se.cdit.classes.Label;
import uni.saarland.se.cdit.classes.MessageHandler;
import uni.saarland.se.cdit.classes.Permission;
import uni.saarland.se.cdit.classes.Priority;
import uni.saarland.se.cdit.classes.Status;
import uni.saarland.se.cdit.classes.Type;
import uni.saarland.se.cdit.helpers.ConnectionHelper;

public class GeneralDAO {

	public List<Type> getAllTypes(){
		List<Type> list = new ArrayList<Type>();
        Connection c = null;
    	String sql = "SELECT * FROM type ORDER BY type_id";
        try {
            c = ConnectionHelper.getConnection();
            Statement s = c.createStatement();
            ResultSet rs = s.executeQuery(sql);
            while (rs.next()) {
                list.add(processTypeRow(rs));
            }
        } catch (SQLException e) {
            e.printStackTrace();
            throw new RuntimeException(e);
		} finally {
			ConnectionHelper.close(c);
		}
        
        return list;
	}
	
	
	public List<Priority> getAllPriority(){
		List<Priority> list = new ArrayList<Priority>();
        Connection c = null;
    	String sql = "SELECT * FROM priority ORDER BY priority_id";
        try {
            c = ConnectionHelper.getConnection();
            Statement s = c.createStatement();
            ResultSet rs = s.executeQuery(sql);
            while (rs.next()) {
                list.add(processPriorityRow(rs));
            }
        } catch (SQLException e) {
            e.printStackTrace();
            throw new RuntimeException(e);
		} finally {
			ConnectionHelper.close(c);
		}
        
        return list;
	}
	
	
	public List<Status> getAllStatus(){
		List<Status> list = new ArrayList<Status>();
        Connection c = null;
    	String sql = "SELECT * FROM status ORDER BY status_id";
        try {
            c = ConnectionHelper.getConnection();
            Statement s = c.createStatement();
            ResultSet rs = s.executeQuery(sql);
            while (rs.next()) {
                list.add(processStatusRow(rs));
            }
        } catch (SQLException e) {
            e.printStackTrace();
            throw new RuntimeException(e);
		} finally {
			ConnectionHelper.close(c);
		}
        
        return list;
	}
	
	
	public List<Label> getAllLabels(){
		List<Label> list = new ArrayList<Label>();
        Connection c = null;
    	String sql = "SELECT * FROM label ORDER BY label_id";
        try {
            c = ConnectionHelper.getConnection();
            Statement s = c.createStatement();
            ResultSet rs = s.executeQuery(sql);
            while (rs.next()) {
                list.add(processLabelRow(rs));
            }
        } catch (SQLException e) {
            e.printStackTrace();
            throw new RuntimeException(e);
		} finally {
			ConnectionHelper.close(c);
		}
        
        return list;
	}
	
	
	public List<Permission> getAllPermissions(){
		List<Permission> list = new ArrayList<Permission>();
        Connection c = null;
    	String sql = "SELECT permission_name FROM permissions ORDER BY permission_name asc";
        try {
            c = ConnectionHelper.getConnection();
            Statement s = c.createStatement();
            ResultSet rs = s.executeQuery(sql);
            while (rs.next()) {
                list.add(processPermissionRow(rs));
            }
        } catch (SQLException e) {
            e.printStackTrace();
            throw new RuntimeException(e);
		} finally {
			ConnectionHelper.close(c);
		}
        
        return list;
	}
	
	
	public Type create(Type type) {
        Connection c = null;
        PreparedStatement ps = null;
        String statement = "INSERT INTO type(type_title) VALUES (?)";
        try {
            c = ConnectionHelper.getConnection();
            ps = c.prepareStatement(statement, new String[] { "type_id" });
            
            ps.setString(1, type.getTitle());
            ps.executeUpdate();
            ResultSet rs = ps.getGeneratedKeys();
            rs.next();
            // Update the id in the returned object. This is important as this value must be returned to the client.
            int id = rs.getInt(1);
            type.setId(id);
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException(e);
		} finally {
			ConnectionHelper.close(c);
		}
        return type;
    }

	public Status create(Status status) {
        Connection c = null;
        PreparedStatement ps = null;
        String statement = "INSERT INTO status(status_title) VALUES (?)";
        try {
            c = ConnectionHelper.getConnection();
            ps = c.prepareStatement(statement, new String[] { "status_id" });
            
            ps.setString(1, status.getTitle());
            ps.executeUpdate();
            ResultSet rs = ps.getGeneratedKeys();
            rs.next();
            // Update the id in the returned object. This is important as this value must be returned to the client.
            int id = rs.getInt(1);
            status.setId(id);
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException(e);
		} finally {
			ConnectionHelper.close(c);
		}
        return status;
    }

	public Label create(Label label) {
        Connection c = null;
        PreparedStatement ps = null;
        String statement = "INSERT INTO label(label_title) VALUES (?)";
        try {
            c = ConnectionHelper.getConnection();
            ps = c.prepareStatement(statement, new String[] { "label_id" });
            
            ps.setString(1, label.getTitle());
            ps.executeUpdate();
            ResultSet rs = ps.getGeneratedKeys();
            rs.next();
            // Update the id in the returned object. This is important as this value must be returned to the client.
            int id = rs.getInt(1);
            label.setId(id);
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException(e);
		} finally {
			ConnectionHelper.close(c);
		}
        return label;
    }	
	
	public Priority create(Priority priority) {
        Connection c = null;
        PreparedStatement ps = null;
        String statement = "INSERT INTO priority(priority_title) VALUES (?)";
        try {
            c = ConnectionHelper.getConnection();
            ps = c.prepareStatement(statement, new String[] { "priority_id" });
            
            ps.setString(1, priority.getTitle());
            ps.executeUpdate();
            ResultSet rs = ps.getGeneratedKeys();
            rs.next();
            // Update the id in the returned object. This is important as this value must be returned to the client.
            int id = rs.getInt(1);
            priority.setId(id);
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException(e);
		} finally {
			ConnectionHelper.close(c);
		}
        return priority;
    }	
	
	public Response remove(int id, String src) {
        Connection c = null;
        boolean success = false;
        String msg = "";
        int status = 500;
        PreparedStatement ps;
        try {
            c = ConnectionHelper.getConnection();
            if(!src.equals("label"))
            	ps = c.prepareStatement("SELECT ticket_id FROM ticket WHERE "+src+"_id = ? LIMIT 1");
            else
            	ps = c.prepareStatement("SELECT ticket_id FROM tickets_labels WHERE "+src+"_id = ? LIMIT 1");
            ps.setInt(1, id);
            success = !ps.executeQuery().next();
            if(success){
	            ps = c.prepareStatement("DELETE FROM "+src+" WHERE "+src+"_id=?");
	            ps.setInt(1, id);
	            success = (ps.executeUpdate()>0);
	            if(success){
	            	status = 200;
	            	msg = "Success";
	            }else{
	            	status = 404;
	            	msg = "The resource was not found. Make sure you sent the correct ID.";
	            }
            }else{
            	status = 400;
            	msg = "The "+src+" cannot be deleted at the moment, because there are tickets associated with it.";
            }
            
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException(e);
		} finally {
			ConnectionHelper.close(c);
		}
        return Response.status(status).entity(new MessageHandler(msg)).build();
    }
	
	/*
	 * 		processTypeRow method takes a ResultSet as an argument and extracts the columns 
	 * 		and add to the appropriate field in a Type object
	 * 
	 * 
	 */
	protected Type processTypeRow(ResultSet rs) throws SQLException {
        Type type = new Type();
        type.setId(rs.getInt("type_id"));
        type.setTitle(rs.getString("type_title"));
        return type;
    }

	/*
	 * 		processPermissionRow method takes a ResultSet as an argument and extracts the columns 
	 * 		and add to the appropriate field in a Permission object
	 * 
	 * 
	 */
	protected Permission processPermissionRow(ResultSet rs) throws SQLException {
		Permission permission = new Permission();
		permission.setName(rs.getString("permission_name"));
        return permission;
    }

	/*
	 * 		processLabelRow method takes a ResultSet as an argument and extracts the columns 
	 * 		and add to the appropriate field in a Label object
	 * 
	 * 
	 */
	protected Label processLabelRow(ResultSet rs) throws SQLException {
		Label label = new Label();
		label.setId(rs.getInt("label_id"));
		label.setTitle(rs.getString("label_title"));
        return label;
    }

	/*
	 * 		processStatusRow method takes a ResultSet as an argument and extracts the columns 
	 * 		and add to the appropriate field in a Status object
	 * 
	 * 
	 */
	protected Status processStatusRow(ResultSet rs) throws SQLException {
		Status status = new Status();
		status.setId(rs.getInt("status_id"));
		status.setTitle(rs.getString("status_title"));
        return status;
    }

	/*
	 * 		processPriorityRow method takes a ResultSet as an argument and extracts the columns 
	 * 		and add to the appropriate field in a Priority object
	 * 
	 * 
	 */
	protected Priority processPriorityRow(ResultSet rs) throws SQLException {
		Priority priority = new Priority();
        priority.setId(rs.getInt("priority_id"));
        priority.setTitle(rs.getString("priority_title"));
        return priority;
    }
}
