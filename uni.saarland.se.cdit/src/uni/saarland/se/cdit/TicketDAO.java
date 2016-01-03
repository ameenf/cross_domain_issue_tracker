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
            sql = "SELECT users_id FROM tickets_users as t WHERE t.ticket_id = ?";
            String sql2 = "SELECT label_id FROM tickets_labels as l WHERE l.ticket_id = ?";
            PreparedStatement ps1 = c.prepareStatement(sql, 
            		  ResultSet.TYPE_SCROLL_INSENSITIVE, 
            		  ResultSet.CONCUR_READ_ONLY);
            PreparedStatement ps2 = c.prepareStatement(sql2, 
          		  ResultSet.TYPE_SCROLL_INSENSITIVE, 
          		  ResultSet.CONCUR_READ_ONLY);
            int i = 0;
            while (rs.next()) {
                list.add(processRow(rs));
                ps1.setInt(1, list.get(i).getId());
                ps2.setInt(1, list.get(i).getId());
                ResultSet rs2 = ps1.executeQuery();
                ResultSet rs3 = ps2.executeQuery();
                if(rs2.next())
                	list.get(i).setUsers(getIds(rs2));
                if(rs3.next())
                	list.get(i).setLabels(getIds(rs3));
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
                sql = "SELECT users_id FROM tickets_users as t WHERE t.ticket_id = ?";
                String sql2 = "SELECT label_id FROM tickets_labels as l WHERE l.ticket_id = ?";
                PreparedStatement ps1 = c.prepareStatement(sql, 
                		  ResultSet.TYPE_SCROLL_INSENSITIVE, 
                		  ResultSet.CONCUR_READ_ONLY);
                PreparedStatement ps2 = c.prepareStatement(sql2, 
              		  ResultSet.TYPE_SCROLL_INSENSITIVE, 
              		  ResultSet.CONCUR_READ_ONLY);
                    ps1.setInt(1, ticket.getId());
                    ps2.setInt(1, ticket.getId());
                    ResultSet rs2 = ps1.executeQuery();
                    ResultSet rs3 = ps2.executeQuery();
                    if(rs2.next())
                    	ticket.setUsers(getIds(rs2));
                    if(rs3.next())
                    	ticket.setLabels(getIds(rs3));
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
            sql = "SELECT users_id FROM tickets_users as t WHERE t.ticket_id = ?";
            String sql2 = "SELECT label_id FROM tickets_labels as l WHERE l.ticket_id = ?";
            PreparedStatement ps1 = c.prepareStatement(sql, 
            		  ResultSet.TYPE_SCROLL_INSENSITIVE, 
            		  ResultSet.CONCUR_READ_ONLY);
            PreparedStatement ps2 = c.prepareStatement(sql2, 
          		  ResultSet.TYPE_SCROLL_INSENSITIVE, 
          		  ResultSet.CONCUR_READ_ONLY);
            int i = 0;
            while (rs.next()) {
                list.add(processRow(rs));
                ps1.setInt(1, list.get(i).getId());
                ps2.setInt(1, list.get(i).getId());
                ResultSet rs2 = ps1.executeQuery();
                ResultSet rs3 = ps2.executeQuery();
                if(rs2.next())
                	list.get(i).setUsers(getIds(rs2));
                if(rs3.next())
                	list.get(i).setLabels(getIds(rs3));
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
            sql = "SELECT users_id FROM tickets_users as t WHERE t.ticket_id = ?";
            String sql2 = "SELECT label_id FROM tickets_labels as l WHERE l.ticket_id = ?";
            PreparedStatement ps1 = c.prepareStatement(sql, 
            		  ResultSet.TYPE_SCROLL_INSENSITIVE, 
            		  ResultSet.CONCUR_READ_ONLY);
            PreparedStatement ps2 = c.prepareStatement(sql2, 
          		  ResultSet.TYPE_SCROLL_INSENSITIVE, 
          		  ResultSet.CONCUR_READ_ONLY);
            int i = 0;
            while (rs.next()) {
                list.add(processRow(rs));
                ps1.setInt(1, list.get(i).getId());
                ps2.setInt(1, list.get(i).getId());
                ResultSet rs2 = ps1.executeQuery();
                ResultSet rs3 = ps2.executeQuery();
                if(rs2.next())
                	list.get(i).setUsers(getIds(rs2));
                if(rs3.next())
                	list.get(i).setLabels(getIds(rs3));
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
	
	public Ticket create(Ticket ticket) {
        Connection c = null;
        PreparedStatement ps = null;
        String statement;
        if(ticket.getCreationDate()==null){
        	statement= "INSERT INTO ticket(ticket_title, ticket_description, priority_id, type_id, status_id, project_id) " +
                                    "VALUES (?, ?, ?, ?, ?, ?)";
        }else{
        	statement= "INSERT INTO ticket(ticket_title, ticket_description, priority_id, type_id, status_id, project_id, ticket_creation_date) " +
                    "VALUES (?, ?, ?, ?, ?, ?, ?)";
        }
        try {
            c = ConnectionHelper.getConnection();
            ps = c.prepareStatement(statement, new String[] { "ticket_id", "ticket_creation_date" });
            
            ps.setString(1, ticket.getTitle());
            ps.setString(2, ticket.getDescription());
            ps.setInt(3, ticket.getPriorityId());
            ps.setInt(4, ticket.getTypeId());
            ps.setInt(5, ticket.getStatusId());
            ps.setInt(6, ticket.getProjectId());
            if(ticket.getCreationDate()!=null)
            	ps.setTimestamp(7, Timestamp.valueOf(ticket.getCreationDate()));
            ps.executeUpdate();
            ResultSet rs = ps.getGeneratedKeys();
            rs.next();
            // Update the id in the returned object. This is important as this value must be returned to the client.
            int id = rs.getInt(1);
            Timestamp ts = rs.getTimestamp(2);            
            ticket.setId(id);
            ticket.setCreationDate(ts.toString());
            int users[] = ticket.getUsers();
            if(users!=null){
            	statement = "INSERT INTO tickets_users(ticket_id, users_id) VALUES (?, ?)";
            	ps = c.prepareStatement(statement);
            	for(int i=0;i<users.length;i++){
            		ps.setInt(1, id);
                    ps.setInt(2, users[i]);
                    ps.executeUpdate();
            	}
            }
            int labels[] = ticket.getLabels();
            if(labels!=null){
            	statement = "INSERT INTO tickets_labels(ticket_id, label_id) VALUES (?, ?)";
            	ps = c.prepareStatement(statement);
            	for(int i=0;i<labels.length;i++){
            		ps.setInt(1, id);
                    ps.setInt(2, labels[i]);
                    ps.executeUpdate();
            	}
            }
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
            ps.setTimestamp(3, Timestamp.valueOf(ticket.getCreationDate()));
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
	
	protected int[] getIds(ResultSet rs){
		int[] ids = null;
		try {
			int len = 0;
			if(rs.last()){
				len = rs.getRow();
				rs.beforeFirst();
			}
			System.out.println(len);
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
