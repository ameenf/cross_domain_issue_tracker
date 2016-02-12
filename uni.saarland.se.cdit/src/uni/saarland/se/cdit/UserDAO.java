package uni.saarland.se.cdit;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import javax.xml.bind.DatatypeConverter;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

public class UserDAO {

	public List<User> getAll() {
        List<User> list = new ArrayList<User>();
        Connection c = null;
    	String sql = "SELECT users_id, users_username, users_type , group_id, active FROM users ORDER BY users_type";
        try {
            c = ConnectionHelper.getConnection();
            Statement s = c.createStatement();
            ResultSet rs = s.executeQuery(sql);
            while (rs.next()) {
                list.add(processRow(rs));
            }
        } catch (SQLException e) {
            e.printStackTrace();
            throw new RuntimeException(e);
		} finally {
			ConnectionHelper.close(c);
		}
        return list;
    }
	
	public UserProfile getProfile(int id){
		UserProfile profile = null;
		Connection c = null;
		String sql = "SELECT * FROM user_profile WHERE users_id = ?";
		try {
			c = ConnectionHelper.getConnection();
			PreparedStatement ps = c.prepareStatement(sql);
			ps.setInt(1, id);
			ResultSet rs = ps.executeQuery();
			if (rs.next()){
				profile = processProfileRow(rs);
			}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} finally {
			ConnectionHelper.close(c);
		}
		return profile;
	}
	

	public List<User> findByProjectId(int id) {
        List<User> list = new ArrayList<User>();
        Connection c = null;
    	String sql = "SELECT u.users_id, u.users_username "+
    				 "FROM users as u, project_users as p "+
    				 "WHERE u.users_id = p.users_id AND p.project_id=? "+
    				 "ORDER BY u.users_id";
        try {
            c = ConnectionHelper.getConnection();
            PreparedStatement s = c.prepareStatement(sql);
            s.setInt(1, id);
            ResultSet rs = s.executeQuery();
            while (rs.next()) {
                list.add(processRow(rs));
            }
        } catch (SQLException e) {
            e.printStackTrace();
            throw new RuntimeException(e);
		} finally {
			ConnectionHelper.close(c);
		}
        return list;
    }
	
	public User findByProjectId(User user, int projectId) {
        Connection c = null;
    	String sql = "SELECT permission_name "+
    				 "FROM permissions as p, user_permissions as up "+
    				 "WHERE p.permission_id = up.permission_id AND up.user_id = ? AND up.project_id=? ";
        try {
            c = ConnectionHelper.getConnection();
            PreparedStatement s = c.prepareStatement(sql, 
            		  ResultSet.TYPE_SCROLL_INSENSITIVE, 
              		  ResultSet.CONCUR_READ_ONLY);
            s.setInt(1, user.getId());
            s.setInt(2, projectId);
            ResultSet rs = s.executeQuery();
            if (rs.next()) {
                user.setPermissions(getPermissions(rs));
            }
        } catch (SQLException e) {
            e.printStackTrace();
            throw new RuntimeException(e);
		} finally {
			ConnectionHelper.close(c);
		}
        return user;
    }
	
	public boolean authenticate(User user){
		Connection c = null;
		String sql = "SELECT users.users_password FROM users WHERE users.users_username = ? AND active=?";
		String password;
		boolean success = false;
		try {
			String hashed_pw = toHash(user.getPassword());
			c = ConnectionHelper.getConnection();
			PreparedStatement ps = c.prepareStatement(sql);
			ps.setString(1, user.getUsername());
			ps.setBoolean(2, true);
			ResultSet rs = ps.executeQuery();
			if (rs.next()){
				password = rs.getString("users_password");
				if(hashed_pw.equals(password)){
					success = true;
				}
			}
		} catch (SQLException | NoSuchAlgorithmException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} finally {
			ConnectionHelper.close(c);
		}
		
		return success;
	}
	
	public boolean check(User user){
		Connection c = null;
		String sql = "SELECT users.users_username FROM users WHERE users.users_username = ?";
		boolean success = false;
		try {
			c = ConnectionHelper.getConnection();
			PreparedStatement ps = c.prepareStatement(sql);
			ps.setString(1, user.getUsername());
			ResultSet rs = ps.executeQuery();
			if (rs.next()){
				success = true;
			}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} finally {
			ConnectionHelper.close(c);
		}
		
		return success;
	}
	
	public User getUser(User user){
		Connection c = null;
		String sql = "SELECT users.users_id, users.group_id FROM users WHERE users.users_username = ?";
		String permissionsSql = "SELECT permission_name "+
								"FROM group_permissions as gp, permissions as p "+
								"WHERE gp.permission_id = p.permission_id AND group_id=?";
		user.setPassword(null);
		try {
			c = ConnectionHelper.getConnection();
			PreparedStatement ps = c.prepareStatement(sql);
			ps.setString(1, user.getUsername());
			ResultSet rs = ps.executeQuery();
			ps = c.prepareStatement(permissionsSql, 
          		  ResultSet.TYPE_SCROLL_INSENSITIVE, 
          		  ResultSet.CONCUR_READ_ONLY);
			if (rs.next()){
				user.setId( rs.getInt("users_id"));
				user.setGroupId(rs.getInt("group_id"));
				ps.setInt(1, user.getGroupId());
				rs = ps.executeQuery();
				user.setPermissions(getPermissions(rs));
			}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} finally {
			ConnectionHelper.close(c);
		}
		
		return user;
		
	}
	
	public User getUser(int id){
		Connection c = null;
		User user = new User();
		String sql = "SELECT users.users_username, users.group_id FROM users WHERE users.users_id = ?";
		String permissionsSql = "SELECT permission_name "+
				"FROM group_permissions as gp, permissions as p "+
				"WHERE gp.permission_id = p.permission_id AND group_id=?";
		try {
			c = ConnectionHelper.getConnection();
			PreparedStatement ps = c.prepareStatement(sql);
			ps.setInt(1, id);
			ResultSet rs = ps.executeQuery();
			ps = c.prepareStatement(permissionsSql, 
          		  ResultSet.TYPE_SCROLL_INSENSITIVE, 
          		  ResultSet.CONCUR_READ_ONLY);
			if (rs.next()){
				user.setId(id);
				user.setUsername(rs.getString("users_username"));
				user.setGroupId(rs.getInt("group_id"));
				ps.setInt(1, user.getGroupId());
				rs = ps.executeQuery();
				user.setPermissions(getPermissions(rs));
			}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} finally {
			ConnectionHelper.close(c);
		}
		
		return user;
		
	}
	
	public List<Group> getGroups(){
		List<Group> list = new ArrayList<Group>();
		Connection c = null;
		String sql = "SELECT * FROM groups";
		String permissionsSql = "SELECT permission_name "+
				"FROM group_permissions as gp, permissions as p "+
				"WHERE gp.permission_id = p.permission_id AND group_id=?";
		try {
			c = ConnectionHelper.getConnection();
			PreparedStatement ps = c.prepareStatement(sql);
			ResultSet rs = ps.executeQuery();
			ps = c.prepareStatement(permissionsSql, 
          		  ResultSet.TYPE_SCROLL_INSENSITIVE, 
          		  ResultSet.CONCUR_READ_ONLY);
			int i = 0;
			while (rs.next()){
				list.add(processGroupRow(rs));
				ps.setInt(1, list.get(i).getId());
				list.get(i).setPermissions(getPermissions(ps.executeQuery()));
				i++;
			}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} finally {
			ConnectionHelper.close(c);
		}
		
		return list;
		
	}
	
	public User create(User user) {
        Connection c = null;
        PreparedStatement ps = null;
        String statement = "";
        if(user.getGroupId()!=0)
        	 statement= "INSERT INTO users(users_username, users_password, users_email, users_type, group_id) VALUES (?, ?, ?, ?, ?)";
        else
        	 statement= "INSERT INTO users(users_username, users_password, users_email, users_type) VALUES (?, ?, ?, ?)";
        try {
            c = ConnectionHelper.getConnection();
            ps = c.prepareStatement(statement, new String[] { "users_id" });
            
            ps.setString(1, user.getUsername());
            
            ps.setString(2, toHash(user.getPassword()));
            ps.setString(3, user.getEmail());
            ps.setString(4, user.getType());
            if(user.getGroupId()!=0)
            	ps.setInt(5, user.getGroupId());
            ps.executeUpdate();
            ResultSet rs = ps.getGeneratedKeys();
            rs.next();
            // Update the id in the returned object. This is important as this value must be returned to the client.
            int id = rs.getInt(1);
            user.setId(id);
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException(e);
		} finally {
			ConnectionHelper.close(c);
		}
        return user;
    }
	
	public boolean addPermissions(User user, int projectId) {
        Connection c = null;
        PreparedStatement ps = null;
        String statement = "";
        boolean success = false;
        statement= "INSERT INTO user_permissions(project_id, user_id, permission_id) VALUES (?, ?, (SELECT permission_id FROM permissions WHERE permission_name LIKE ?))";
        try {
            c = ConnectionHelper.getConnection();
            ps = c.prepareStatement(statement);
            
            ps.setInt(1, projectId);
            ps.setInt(2, user.getId());
            String permissions[] = user.getPermissions();
            if(permissions!=null){
            	for(int i=0;i<permissions.length;i++){
                    ps.setString(3, permissions[i]);
                    ps.executeUpdate();
                    success = true;
            	}
            }
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException(e);
		} finally {
			ConnectionHelper.close(c);
		}
        return success;
    }
	
	public boolean updatePermissions(User user, int projectId) {
        Connection c = null;
        PreparedStatement ps = null;
        String statement = "";
        boolean success = false;
        String delStatement = "DELETE FROM user_permissions WHERE project_id=? AND user_id=?";
        statement= "INSERT INTO user_permissions(project_id, user_id, permission_id) VALUES (?, ?, (SELECT permission_id FROM permissions WHERE permission_name LIKE ?))";
        try {
            c = ConnectionHelper.getConnection();
            ps = c.prepareStatement(delStatement);
            ps.setInt(1, projectId);
            ps.setInt(2, user.getId());
            if(ps.executeUpdate()>0){
            	success = true;
            }
            	
            ps = c.prepareStatement(statement);
            ps.setInt(1, projectId);
            ps.setInt(2, user.getId());
            String permissions[] = user.getPermissions();
            
            if(permissions!=null){
            	for(int i=0;i<permissions.length;i++){
                    ps.setString(3, permissions[i]);
                    ps.executeUpdate();
                    success = true;
            	}
            }
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException(e);
		} finally {
			ConnectionHelper.close(c);
		}
        return success;
    }
	
	public Group createGroup(Group group) {
        Connection c = null;
        PreparedStatement ps = null;
        String statement= "INSERT INTO groups(group_name, group_description) VALUES (?, ?)";
        try {
            c = ConnectionHelper.getConnection();
            ps = c.prepareStatement(statement, new String[] { "group_id" });
            
            ps.setString(1, group.getName());
            
            ps.setString(2, group.getDescription());
            ps.executeUpdate();
            ResultSet rs = ps.getGeneratedKeys();
            rs.next();
            // Update the id in the returned object. This is important as this value must be returned to the client.
            int id = rs.getInt(1);
            group.setId(id);
            String permissions[] = group.getPermissions();
            if(permissions!=null){
            	statement = "INSERT INTO group_permissions(group_id, permission_id) VALUES (?,"+
            				" (SELECT permission_id FROM permissions WHERE permission_name LIKE ?))";
            	ps = c.prepareStatement(statement);
            	for(int i=0;i<permissions.length;i++){
            		ps.setInt(1, id);
                    ps.setString(2, permissions[i]);
                    ps.executeUpdate();
            	}
            }
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException(e);
		} finally {
			ConnectionHelper.close(c);
		}
        return group;
    }
	
	public Group updateGroup(Group group) {
        Connection c = null;
        PreparedStatement ps = null;
        String statement= "UPDATE groups SET group_name=?, group_description=? WHERE group_id=?";
        try {
            c = ConnectionHelper.getConnection();
            ps = c.prepareStatement(statement);
            ps.setString(1, group.getName());
            ps.setString(2, group.getDescription());
            ps.setInt(3, group.getId());
            ps.executeUpdate();
            
            String delStatement = "DELETE FROM group_permissions WHERE group_id=?";
            ps = c.prepareStatement(delStatement);
            ps.setInt(1, group.getId());
            ps.executeUpdate();
            
            String permissions[] = group.getPermissions();
            if(permissions!=null){
            	statement = "INSERT INTO group_permissions(group_id, permission_id) VALUES (?,"+
            				" (SELECT permission_id FROM permissions WHERE permission_name LIKE ?))";
            	ps = c.prepareStatement(statement);
            	for(int i=0;i<permissions.length;i++){
            		ps.setInt(1, group.getId());
                    ps.setString(2, permissions[i]);
                    ps.executeUpdate();
            	}
            }
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException(e);
		} finally {
			ConnectionHelper.close(c);
		}
        return group;
    }	
	
	public UserProfile createProfile(UserProfile profile) {
        Connection c = null;
        PreparedStatement ps = null;
        String statement= "INSERT INTO user_profile" +
        				  "(users_id, firstname, lastname, field, experience, links) " +
        				  "VALUES (?, ?, ?, ?, ?, ?)";
        try {
            c = ConnectionHelper.getConnection();
            ps = c.prepareStatement(statement, new String[] { "profile_id" });
            
            ps.setInt(1, profile.getUserId());
            ps.setString(2, profile.getFirstName());
            ps.setString(3, profile.getLastName());
            ps.setString(4, profile.getField());
            ps.setString(5, profile.getExperience());
            ps.setString(6, profile.getLinks());
            ps.executeUpdate();

        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException(e);
		} finally {
			ConnectionHelper.close(c);
		}
        return profile;
    }
	
	public boolean updatePassword(User user) {
        Connection c = null;
        try {
            c = ConnectionHelper.getConnection();
            PreparedStatement ps = c.prepareStatement("UPDATE users " +
            										  "SET users_password = ? " +
            										  "WHERE users.users_id = ?");
            
            ps.setString(1, toHash(user.getPassword()));
            ps.setInt(2, user.getId());
            int count = ps.executeUpdate();
            return count == 1;
        } catch (SQLException | NoSuchAlgorithmException e) {
            e.printStackTrace();
            throw new RuntimeException(e);
		} finally {
			ConnectionHelper.close(c);
		}
    }
	
	public boolean updateProfile(UserProfile profile) {
        Connection c = null;
        try {
            c = ConnectionHelper.getConnection();
            PreparedStatement ps = c.prepareStatement("UPDATE user_profile "+
            										  "SET firstname=?, lastname=?, field=?, experience=?, links=? "+
            										  "WHERE users_id=?");
            ps.setString(1, profile.getFirstName());
            ps.setString(2, profile.getLastName());
            ps.setString(3, profile.getField());
            ps.setString(4, profile.getExperience());
            ps.setString(5, profile.getLinks());
            ps.setInt(6, profile.getUserId());
            int count = ps.executeUpdate();
            return count == 1;
        } catch (SQLException e) {
            e.printStackTrace();
            throw new RuntimeException(e);
		} finally {
			ConnectionHelper.close(c);
		}
    }
	
	public boolean remove(int id) {
        Connection c = null;
        try {
            c = ConnectionHelper.getConnection();
            PreparedStatement ps = c.prepareStatement("UPDATE users SET active=? WHERE users_id=? AND users_username NOT LIKE ?");
            ps.setBoolean(1, false);
            ps.setInt(2, id);
            ps.setString(3, "admin");
            int count = ps.executeUpdate();
            return count == 1;
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException(e);
		} finally {
			ConnectionHelper.close(c);
		}
    }
	
	protected User processRow(ResultSet rs) throws SQLException {
		User user = new User();
		user.setId(rs.getInt("users_id"));
		user.setUsername(rs.getString("users_username"));
		user.setType(rs.getString("users_type"));
		user.setGroupId(rs.getInt("group_id"));
		user.setActive(rs.getBoolean("active"));
        return user;
    }
	
	protected Group processGroupRow(ResultSet rs) throws SQLException {
		Group group = new Group();
		group.setId(rs.getInt("group_id"));
		group.setName(rs.getString("group_name"));
		group.setDescription(rs.getString("group_description"));
        return group;
    }
	
	private UserProfile processProfileRow(ResultSet rs) throws SQLException {
		UserProfile profile = new UserProfile();
		profile.setUserId(rs.getInt("users_id"));
		profile.setFirstName(rs.getString("firstname"));
		profile.setLastName(rs.getString("lastname"));
		profile.setField(rs.getString("field"));
		profile.setExperience(rs.getString("experience"));
		profile.setLinks(rs.getString("links"));
		return profile;
	}
	
	protected String toHash(String password) throws NoSuchAlgorithmException{
		
		MessageDigest md = MessageDigest.getInstance("MD5");
        md.update(password.getBytes());
        byte byteData[] = md.digest();
		return DatatypeConverter.printHexBinary(byteData);
	}
	
	protected String[] getPermissions(ResultSet rs){
		String[] ids = null;
		try {
			int len = 0;
			if(rs.last()){
				len = rs.getRow();
				rs.beforeFirst();
			}
			ids = new String[len];
			for(int i = 0;rs.next();i++){
				ids[i] = rs.getString(1);
            }
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return ids;
	}
}
