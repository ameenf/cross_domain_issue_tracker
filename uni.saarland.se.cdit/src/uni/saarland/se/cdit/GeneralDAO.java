package uni.saarland.se.cdit;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

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
	
	protected Type processTypeRow(ResultSet rs) throws SQLException {
        Type type = new Type();
        type.setId(rs.getInt("type_id"));
        type.setTitle(rs.getString("type_title"));
        return type;
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
	
	protected Priority processPriorityRow(ResultSet rs) throws SQLException {
		Priority priority = new Priority();
        priority.setId(rs.getInt("priority_id"));
        priority.setTitle(rs.getString("priority_title"));
        return priority;
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
	
	protected Status processStatusRow(ResultSet rs) throws SQLException {
		Status status = new Status();
		status.setId(rs.getInt("status_id"));
		status.setTitle(rs.getString("status_title"));
        return status;
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
	
	protected Label processLabelRow(ResultSet rs) throws SQLException {
		Label label = new Label();
		label.setId(rs.getInt("label_id"));
		label.setTitle(rs.getString("label_title"));
        return label;
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
	
	protected Permission processPermissionRow(ResultSet rs) throws SQLException {
		Permission permission = new Permission();
		permission.setName(rs.getString("permission_name"));
        return permission;
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
	
	public boolean remove(int id, String src) {
        Connection c = null;
        try {
            c = ConnectionHelper.getConnection();
            PreparedStatement ps = c.prepareStatement("DELETE FROM "+src+" WHERE "+src+"_id=?");
            ps.setInt(1, id);
            int count = ps.executeUpdate();
            return count == 1;
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException(e);
		} finally {
			ConnectionHelper.close(c);
		}
    }
}
