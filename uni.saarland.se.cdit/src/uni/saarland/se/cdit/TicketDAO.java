package uni.saarland.se.cdit;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

public class TicketDAO {

	
	public List<Ticket> findAll() {
        List<Ticket> list = new ArrayList<Ticket>();
        Connection c = null;
    	String sql = "SELECT * FROM ticket ORDER BY ticket_id";
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
        System.out.println(ticket);
        return ticket;
    }
	
	public List<Ticket> findByTitle(String title) {
        List<Ticket> list = new ArrayList<Ticket>();
        Connection c = null;
    	String sql = "SELECT * FROM ticket as e " +
			"WHERE UPPER(ticket_title) LIKE ? " +	
			"ORDER BY ticket_title";
        try {
            c = ConnectionHelper.getConnection();
            PreparedStatement ps = c.prepareStatement(sql);
            ps.setString(1, "%" + title.toUpperCase() + "%");
            ResultSet rs = ps.executeQuery();
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
	
	public List<Ticket> findByType(String type) {
        List<Ticket> list = new ArrayList<Ticket>();
        Connection c = null;
    	String sql = "SELECT t.ticket_id, t.ticket_title, t.ticket_creation_date, t.priority_id, t.type_id, t.project_id, t.ticket_description " + 
            "FROM ticket as t, type " +
			"WHERE t.type_id = type.type_id and UPPER(type.type_title) LIKE ? " +	
			"ORDER BY t.ticket_title";
        try {
            c = ConnectionHelper.getConnection();
            PreparedStatement ps = c.prepareStatement(sql);
            ps.setString(1, type.toUpperCase());
            ResultSet rs = ps.executeQuery();
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
	
	public Ticket create(Ticket ticket) {
        Connection c = null;
        PreparedStatement ps = null;
        try {
            c = ConnectionHelper.getConnection();
            ps = c.prepareStatement("INSERT INTO ticket(ticket_title, ticket_description, ticket_creation_date, priority_id, type_id, status_id, project_id) " +
                                    "VALUES (?, ?, ?, ?, ?, ?, ?)", new String[] { "ticket_id" });
            
            ps.setString(1, ticket.getTitle());
            ps.setString(2, ticket.getDescription());
            ps.setTimestamp(3, Timestamp.valueOf(ticket.getCreationDate()));
            ps.setInt(4, ticket.getPriorityId());
            ps.setInt(5, ticket.getTypeId());
            ps.setInt(6, ticket.getStatusId());
            ps.setInt(7, ticket.getProjectId());
            ps.executeUpdate();
            ResultSet rs = ps.getGeneratedKeys();
            rs.next();
            // Update the id in the returned object. This is important as this value must be returned to the client.
            int id = rs.getInt(1);
            
            ticket.setId(id);
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException(e);
		} finally {
			ConnectionHelper.close(c);
		}
        return ticket;
    }
	
	public Ticket update(Ticket ticket) {
        Connection c = null;
        try {
            c = ConnectionHelper.getConnection();
            PreparedStatement ps = c.prepareStatement("UPDATE ticket " +
            										  "SET ticket_title=?, ticket_description=?, ticket_creation_date=?, " +
            										  "priority_id=?, type_id=?, status_id=?, project_id=? WHERE ticket_id=?");
            ps.setString(1, ticket.getTitle());
            ps.setString(2, ticket.getDescription());
            ps.setString(3, ticket.getCreationDate());
            ps.setInt(4, ticket.getPriorityId());
            ps.setInt(5, ticket.getTypeId());
            ps.setInt(6, ticket.getStatusId());
            ps.setInt(7, ticket.getProjectId());
            ps.setInt(8, ticket.getId());
            ps.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
            throw new RuntimeException(e);
		} finally {
			ConnectionHelper.close(c);
		}
        return ticket;
    }
	
	public boolean remove(int id) {
        Connection c = null;
        try {
            c = ConnectionHelper.getConnection();
            PreparedStatement ps = c.prepareStatement("DELETE FROM ticket WHERE ticket_id=?");
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
	
	protected Ticket processRow(ResultSet rs) throws SQLException {
        Ticket ticket = new Ticket();
        ticket.setId(rs.getInt("ticket_id"));
        ticket.setTitle(rs.getString("ticket_title"));
        ticket.setCreationDate(rs.getString("ticket_creation_date"));
        ticket.setPriorityId(rs.getInt("priority_id"));
        ticket.setTypeId(rs.getInt("type_id"));
        ticket.setProjectId(rs.getInt("project_id"));
        ticket.setDescription(rs.getString("ticket_description"));
        ticket.setStatusId(rs.getInt("status_id"));
        return ticket;
    }
	
	
	
	
	
	
	
	
	
}
