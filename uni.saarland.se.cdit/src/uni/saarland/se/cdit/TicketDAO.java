package uni.saarland.se.cdit;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

public class TicketDAO {

	public Ticket findById(int id) {
    	String sql = "SELECT * FROM ticket WHERE ticket_id = ?";
        Ticket ticket = null;
        Connection c = null;
        try {
            c = ConnectionHelper.getConnection();
            PreparedStatement ps = c.prepareStatement(sql);
            ps.setInt(1, id);
            ResultSet rs = ps.executeQuery();
            if (rs.next()) {
                ticket = processRow(rs);
            }
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException(e);
		} finally {
			ConnectionHelper.close(c);
		}
        return ticket;
    }
	
	protected Ticket processRow(ResultSet rs) throws SQLException {
        Ticket ticket = new Ticket();
        ticket.setId(rs.getInt("ticket_id"));
        ticket.setTitle(rs.getString("ticket_title"));
        ticket.setCreationDate(rs.getTimestamp("ticket_creation_date"));
        ticket.setPriorityId(rs.getInt("priority_id"));
        ticket.setTypeId(rs.getInt("type_id"));
        ticket.setProjectId(rs.getInt("project_id"));
        ticket.setDescription(rs.getString("ticket_description"));
        return ticket;
    }
	
	
	
	
	
	
	
	
	
}
