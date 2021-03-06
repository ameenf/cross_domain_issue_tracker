package uni.saarland.se.cdit.dataaccess;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import uni.saarland.se.cdit.classes.Project;
import uni.saarland.se.cdit.helpers.ConnectionHelper;

public class ProjectDAO {

	public List<Project> findAll() {
        List<Project> list = new ArrayList<Project>();
        Connection c = null;
    	String sql = "SELECT * FROM project ORDER BY active desc";
        try {
            c = ConnectionHelper.getConnection();
            Statement s = c.createStatement();
            ResultSet rs = s.executeQuery(sql);
            sql = "SELECT users_id FROM project_users WHERE project_id = ?";
            PreparedStatement ps = c.prepareStatement(sql, 
          		  ResultSet.TYPE_SCROLL_INSENSITIVE, 
          		  ResultSet.CONCUR_READ_ONLY);
            int i = 0;
            while (rs.next()) {
                list.add(processRow(rs));
                ps.setInt(1, list.get(i).getId());
                ResultSet rs2 = ps.executeQuery();
                if(rs2.next())
                	list.get(i).setUsers(getIds(rs2));
                i++;
            }
        } catch (SQLException e) {
            e.printStackTrace();
            throw new RuntimeException(e);
		} finally {
			ConnectionHelper.close(c);
		}
        return list;
    }
	
	public Project findById(int id) {
        Project project = new Project();
        Connection c = null;
    	String sql = "SELECT * FROM project WHERE project_id=? AND active=? ORDER BY project_id";
        try {
            c = ConnectionHelper.getConnection();
            PreparedStatement s = c.prepareStatement(sql);
            s.setInt(1, id);
            s.setBoolean(2, true);
            ResultSet rs = s.executeQuery();
            sql = "SELECT users_id FROM project_users WHERE project_id = ?";
            PreparedStatement ps = c.prepareStatement(sql, 
          		  ResultSet.TYPE_SCROLL_INSENSITIVE, 
          		  ResultSet.CONCUR_READ_ONLY);
            if (rs.next()) {
                project = processRow(rs);
                ps.setInt(1, id);
                ResultSet rs2 = ps.executeQuery();
                if(rs2.next())
                	project.setUsers(getIds(rs2));
            }
        } catch (SQLException e) {
            e.printStackTrace();
            throw new RuntimeException(e);
		} finally {
			ConnectionHelper.close(c);
		}
        return project;
    }
	
	public List<Project> findByUser(int id) {
        List<Project> list = new ArrayList<Project>();
        Connection c = null;
    	String sql = "SELECT * FROM project WHERE project_id" + 
    				 " IN (SELECT project_id FROM project_users WHERE users_id=?)"+
    				 " AND active=? ORDER BY project_id";
        try {
            c = ConnectionHelper.getConnection();
            PreparedStatement ps = c.prepareStatement(sql);
            ps.setInt(1, id);
            ps.setBoolean(2, true);
            ResultSet rs = ps.executeQuery();
            sql = "SELECT users_id FROM project_users WHERE project_id = ?";
            ps = c.prepareStatement(sql, 
            		  ResultSet.TYPE_SCROLL_INSENSITIVE, 
              		  ResultSet.CONCUR_READ_ONLY);
            int i = 0;
            while (rs.next()) {
                list.add(processRow(rs));
                ps.setInt(1, list.get(i).getId());
                ResultSet rs2 = ps.executeQuery();
                if(rs2.next())
                	list.get(i).setUsers(getIds(rs2));
                i++;
            }
                        
        } catch (SQLException e) {
            e.printStackTrace();
            throw new RuntimeException(e);
		} finally {
			ConnectionHelper.close(c);
		}
        return list;
    }
		
	public Project create(Project project) {
        Connection c = null;
        PreparedStatement ps = null;
        String statement= "INSERT INTO project(project_title, project_description) VALUES (?, ?)";
        try {
            c = ConnectionHelper.getConnection();
            ps = c.prepareStatement(statement, new String[] { "project_id" });
            
            ps.setString(1, project.getTitle());
            ps.setString(2, project.getDescription());
            ps.executeUpdate();
            ResultSet rs = ps.getGeneratedKeys();
            rs.next();
            // Update the id in the returned object. This is important as this value must be returned to the client.
            int id = rs.getInt(1);          
            project.setId(id);
            int users[] = project.getUsers();
            if(users!=null){
            	statement = "INSERT INTO project_users(project_id, users_id) VALUES (?, ?)";
            	ps = c.prepareStatement(statement);
            	for(int i=0;i<users.length;i++){
            		ps.setInt(1, id);
                    ps.setInt(2, users[i]);
                    ps.executeUpdate();
            	}
            }
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException(e);
		} finally {
			ConnectionHelper.close(c);
		}
        return project;
    }
	
	public Project addUsers(Project project) {
        Connection c = null;
        String statement = "INSERT INTO project_users(project_id, users_id) VALUES (?, ?)";
        try {
            c = ConnectionHelper.getConnection();
            int users[] = project.getUsers();
            if(users!=null){
            	PreparedStatement ps = c.prepareStatement(statement);
            	for(int i=0;i<users.length;i++){
            		ps.setInt(1, project.getId());
                    ps.setInt(2, users[i]);
                    ps.executeUpdate();
            	}
            }
        } catch (SQLException e) {
            e.printStackTrace();
            throw new RuntimeException(e);
		} finally {
			ConnectionHelper.close(c);
		}
        return findById(project.getId());
    }
	
	public Project update(Project project) {
        Connection c = null;
        int id = project.getId();
        try {
            c = ConnectionHelper.getConnection();
            PreparedStatement ps = c.prepareStatement("UPDATE project " +
            										  "SET project_title=?, project_description=? WHERE project_id=?");
            ps.setString(1, project.getTitle());
            ps.setString(2, project.getDescription());
            ps.setInt(3, project.getId());
            ps.executeUpdate();
            
            String statement = "DELETE FROM project_users WHERE project_id = ?";
            ps = c.prepareStatement(statement);
            ps.setInt(1, id);
            ps.executeUpdate();
            
            int users[] = project.getUsers();
            if(users!=null){
            	statement = "INSERT INTO project_users(project_id, users_id) VALUES (?, ?)";
            	ps = c.prepareStatement(statement);
            	for(int i=0;i<users.length;i++){
            		ps.setInt(1, id);
                    ps.setInt(2, users[i]);
                    ps.executeUpdate();
            	}
            }
        } catch (SQLException e) {
            e.printStackTrace();
            throw new RuntimeException(e);
		} finally {
			ConnectionHelper.close(c);
		}
        return project;
    }
	
	public boolean remove(int id) {
        Connection c = null;
        try {
            c = ConnectionHelper.getConnection();
            PreparedStatement ps = c.prepareStatement("UPDATE project "+
            										  "SET active=? WHERE project_id=?");
            ps.setBoolean(1, false);
            ps.setInt(2, id);
            int count = ps.executeUpdate();
            return count >= 1;
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException(e);
		} finally {
			ConnectionHelper.close(c);
		}
    }
	
	/*
	 * 		processRow method takes a ResultSet as an argument and extracts the columns 
	 * 		and add to the appropriate field in a Project object
	 * 
	 * 
	 */
	protected Project processRow(ResultSet rs) throws SQLException {
		Project project = new Project();
		project.setId(rs.getInt("project_id"));
		project.setTitle(rs.getString("project_title"));
		project.setDescription(rs.getString("project_description"));
		project.setActive(rs.getBoolean("active"));
        return project;
    }
	

	public int isUserInTicketProject(int userId, int ticketId) {
        Connection c = null;
        int id = 0;
        try {
            c = ConnectionHelper.getConnection();
            PreparedStatement ps = c.prepareStatement("SELECT pu.project_id FROM project_users as pu, ticket as t " + 
            										  "WHERE pu.project_id = t.project_id AND pu.users_id=? AND t.ticket_id=?");
            ps.setInt(1, userId);
            ps.setInt(2, ticketId);
            ResultSet rs = ps.executeQuery();
            if(rs.next())
            	id = rs.getInt(1);
            return id;
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException(e);
		} finally {
			ConnectionHelper.close(c);
		}
    }
	
	public int isUserInNodeProject(int userId, int nodeId) {
        Connection c = null;
        int id = 0;
        try {
            c = ConnectionHelper.getConnection();
            PreparedStatement ps = c.prepareStatement("SELECT pu.project_id FROM project_users as pu, nodes as n " + 
            										  "WHERE pu.project_id = n.project_id AND pu.users_id=? AND n.node_id=?");
            ps.setInt(1, userId);
            ps.setInt(2, nodeId);
            ResultSet rs = ps.executeQuery();
            if(rs.next())
            	id = rs.getInt(1);
            return id;
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException(e);
		} finally {
			ConnectionHelper.close(c);
		}
    }
	
	public int isUserInProject(int userId, int projectId) {
        Connection c = null;
        int id = 0;
        try {
            c = ConnectionHelper.getConnection();
            PreparedStatement ps = c.prepareStatement("SELECT project_id FROM project_users " + 
            										  "WHERE users_id=? AND project_id=?");
            ps.setInt(1, userId);
            ps.setInt(2, projectId);
            ResultSet rs = ps.executeQuery();
            if(rs.next())
            	id = rs.getInt(1);
            return id;
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException(e);
		} finally {
			ConnectionHelper.close(c);
		}
    }
	
	public int areUserInProject(int userOneId, int userTwoId) {
        Connection c = null;
        int id = 0;
        try {
            c = ConnectionHelper.getConnection();
            PreparedStatement ps = c.prepareStatement("SELECT upOne.project_id FROM project_users as upOne, project_users as upTwo " + 
            										  "WHERE upOne.users_id=? AND upTwo.users_id=? AND upOne.project_id = upTwo.project_id");
            ps.setInt(1, userOneId);
            ps.setInt(2, userTwoId);
            ResultSet rs = ps.executeQuery();
            if(rs.next())
            	id = rs.getInt(1);
            return id;
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException(e);
		} finally {
			ConnectionHelper.close(c);
		}
    }
	
	
	protected int[] getIds(ResultSet rs){
		int[] ids = null;
		try {
			int len = 0;
			if(rs.last()){
				len = rs.getRow();
				rs.beforeFirst();
			}
			ids = new int[len];
			for(int i = 0;rs.next();i++){
				ids[i] = rs.getInt(1);
            }
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return ids;
	}
}
