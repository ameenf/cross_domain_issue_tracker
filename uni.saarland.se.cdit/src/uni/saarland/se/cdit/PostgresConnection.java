package uni.saarland.se.cdit;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Connection;
import java.sql.SQLException;

public class PostgresConnection {
	public static void main(String[] argv) {

		PostgresConnection test = new PostgresConnection();
		test.connect();
	}
	
	public void connect(){
		System.out.println("-------- PostgreSQL "
				+ "JDBC Connection Testing ------------");

		try {

			Class.forName("org.postgresql.Driver");

		} catch (ClassNotFoundException e) {

			System.out.println("Where is your PostgreSQL JDBC Driver? "
					+ "Include in your library path!");
			e.printStackTrace();
			return;

		}

		System.out.println("PostgreSQL JDBC Driver Registered!");

		Connection connection = null;

		try {

			connection = DriverManager.getConnection(
					"jdbc:postgresql://127.0.0.1:5432/cdit_db", "postgres",
					"admin");
			String sql = "SELECT * FROM users";
			
			
			PreparedStatement ps = connection.prepareStatement(sql);
			ResultSet rs = ps.executeQuery();
            while (rs.next()) {
            	System.out.println(rs.getString("users_id"));
            	System.out.println(rs.getString("users_username"));
            	System.out.println(rs.getString("users_password"));
            	System.out.println(rs.getString("users_email"));
            	System.out.println(rs.getString("users_type"));
            }
			
			System.out.println("test");
			


		} catch (SQLException e) {
			System.out.println("Connection Failed! Check output console");
			e.printStackTrace();
			return;
		}

		if (connection != null) {
			System.out.println("You made it, take control your database now!");
		} else {
			System.out.println("Failed to make connection!");
		}
	}

}
