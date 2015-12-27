package uni.saarland.se.cdit;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

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
	
	public boolean authenticate(String email, String pw){
		Connection c = null;
		String sql = "SELECT users.users_password FROM users WHERE users.users_email = ?";
		String password;
		boolean success = false;
		try {
			c = ConnectionHelper.getConnection();
			PreparedStatement ps = c.prepareStatement(sql);
			ps.setString(1, email);
			ResultSet rs = ps.executeQuery();
			if (rs.next()){
				password = rs.getString("users_password");
				if(pw.equals(password)){
					success = true;
				}
			}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} finally {
			ConnectionHelper.close(c);
		}
		
		return success;
	}
	
	protected User processRow(ResultSet rs) throws SQLException {
		User user = new User();
		user.setId(rs.getInt("users_id"));
		user.setUsername(rs.getString("users_username"));
        return user;
    }
}
