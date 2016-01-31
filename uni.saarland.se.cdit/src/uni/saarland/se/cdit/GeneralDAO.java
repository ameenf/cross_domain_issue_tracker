package uni.saarland.se.cdit;

import java.sql.Connection;
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
}
