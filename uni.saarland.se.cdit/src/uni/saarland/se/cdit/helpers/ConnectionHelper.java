package uni.saarland.se.cdit.helpers;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.ResourceBundle;

public class ConnectionHelper
{
	private String url;
	private static ConnectionHelper instance;

	private ConnectionHelper()
	{
    	String driver = null;
		try {
			//Class.forName("org.postgresql.Driver");
			//url = "jdbc:postgresql://localhost:5432/cdit_db?user=postgres&password=admin";
            ResourceBundle bundle = ResourceBundle.getBundle("cdit");
            driver = bundle.getString("jdbc.driver");
            Class.forName(driver);
            url=bundle.getString("jdbc.url");
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	public static Connection getConnection() throws SQLException {
		if (instance == null) {
			instance = new ConnectionHelper();
		}
		try {
			return DriverManager.getConnection(instance.url);
		} catch (SQLException e) {
			throw e;
		}
	}
	
	public static void close(Connection connection)
	{
		try {
			if (connection != null) {
				connection.close();
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}

}