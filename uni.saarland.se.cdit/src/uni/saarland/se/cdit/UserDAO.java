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
    	String sql = "SELECT users_id, users_username FROM users ORDER BY users_id";
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
	
	public boolean authenticate(User user){
		Connection c = null;
		String sql = "SELECT users.users_password FROM users WHERE users.users_username = ?";
		String password;
		boolean success = false;
		try {
			String hashed_pw = toHash(user.getPassword());
			c = ConnectionHelper.getConnection();
			PreparedStatement ps = c.prepareStatement(sql);
			ps.setString(1, user.getUsername());
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
	
	public User getUserId(User user){
		Connection c = null;
		String sql = "SELECT users.users_id FROM users WHERE users.users_username = ?";
		user.setPassword(null);
		try {
			c = ConnectionHelper.getConnection();
			PreparedStatement ps = c.prepareStatement(sql);
			ps.setString(1, user.getUsername());
			ResultSet rs = ps.executeQuery();
			if (rs.next()){
				user.setId( rs.getInt("users_id"));
			}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} finally {
			ConnectionHelper.close(c);
		}
		
		return user;
		
	}
	
	public User create(User user) {
        Connection c = null;
        PreparedStatement ps = null;
        String statement= "INSERT INTO users(users_username, users_password, users_email, users_type) VALUES (?, ?, ?, ?)";
        try {
            c = ConnectionHelper.getConnection();
            ps = c.prepareStatement(statement, new String[] { "users_id" });
            
            ps.setString(1, user.getUsername());
            
            ps.setString(2, toHash(user.getPassword()));
            ps.setString(3, user.getEmail());
            ps.setString(4, user.getType());
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
            ResultSet rs = ps.getGeneratedKeys();
            rs.next();
            // Update the id in the returned object. This is important as this value must be returned to the client.
            int id = rs.getInt(1);
            profile.setId(id);
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
	
	public boolean remove(int id) {
        Connection c = null;
        try {
            c = ConnectionHelper.getConnection();
            PreparedStatement ps = c.prepareStatement("DELETE FROM users WHERE users_id=? AND users_type NOT LIKE 'admin'");
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
	
	protected User processRow(ResultSet rs) throws SQLException {
		User user = new User();
		user.setId(rs.getInt("users_id"));
		user.setUsername(rs.getString("users_username"));
        return user;
    }
	
	private UserProfile processProfileRow(ResultSet rs) throws SQLException {
		UserProfile profile = new UserProfile();
		profile.setId(rs.getInt("profile_id"));
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
}
