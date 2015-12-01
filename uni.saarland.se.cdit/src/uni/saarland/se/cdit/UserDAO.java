package uni.saarland.se.cdit;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

public class UserDAO {

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
}
