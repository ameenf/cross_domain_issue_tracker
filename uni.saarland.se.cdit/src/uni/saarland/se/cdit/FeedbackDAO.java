package uni.saarland.se.cdit;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

public class FeedbackDAO {

	public List<Feedback> getTicketFeedback(int ticketId) {
        List<Feedback> list = new ArrayList<Feedback>();
        Connection c = null;
    	String sql = "SELECT * FROM feedback " +
    				 "WHERE ticket_id = ? " +	
    				 "ORDER BY feedback_date ASC";
        try {
            c = ConnectionHelper.getConnection();
            PreparedStatement ps = c.prepareStatement(sql);
            ps.setInt(1, ticketId);
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
	
	public Feedback create(Feedback feedback) {
        Connection c = null;
        PreparedStatement ps = null;
        String statement= "INSERT INTO feedback(feedback_text, ticket_id, user_id) VALUES (?, ?, ?)";
        try {
            c = ConnectionHelper.getConnection();
            ps = c.prepareStatement(statement, new String[] { "feedback_id", "feedback_date" });
            
            ps.setString(1, feedback.getFeedbackText());
            ps.setInt(2, feedback.getTicketId());
            ps.setInt(3, feedback.getUserId());
            ps.executeUpdate();
            ResultSet rs = ps.getGeneratedKeys();
            rs.next();
            // Update the id in the returned object. This is important as this value must be returned to the client.
            int id = rs.getInt(1);
            Timestamp ts = rs.getTimestamp(2);
            feedback.setId(id);
            feedback.setFeedbackDate(ts.toString());
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException(e);
		} finally {
			ConnectionHelper.close(c);
		}
        return feedback;
    }
	
	public Feedback update(Feedback feedback) {
        Connection c = null;
        try {
            c = ConnectionHelper.getConnection();
            PreparedStatement ps = c.prepareStatement("UPDATE feedback " +
            										  "SET feedback_text=?" +
            										  "WHERE feedback_id=?");
            ps.setString(1, feedback.getFeedbackText());
            ps.setInt(2, feedback.getId());
            ps.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
            throw new RuntimeException(e);
		} finally {
			ConnectionHelper.close(c);
		}
        return feedback;
    }
	
	public boolean remove(int id) {
        Connection c = null;
        try {
            c = ConnectionHelper.getConnection();
            PreparedStatement ps = c.prepareStatement("DELETE FROM feedback WHERE feedback_id=?");
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
	
	public int getTicketIdByFeedbackId(int id) {
		int projectId = 0;
        Connection c = null;
        try {
            c = ConnectionHelper.getConnection();
            PreparedStatement ps = c.prepareStatement("SELECT ticket_id FROM feedback "
            										+ "WHERE ticket_id=?");
            ps.setInt(1, id);
            ResultSet rs = ps.executeQuery();
            if(rs.next()){
            	projectId = rs.getInt(1);
            }
            return projectId;
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException(e);
		} finally {
			ConnectionHelper.close(c);
		}
    }
	
	protected Feedback processRow(ResultSet rs) throws SQLException {
		Feedback feedback = new Feedback();
		feedback.setId(rs.getInt("feedback_id"));
		feedback.setUserId(rs.getInt("user_id"));
		feedback.setFeedbackDate(rs.getString("feedback_date"));
		feedback.setTicketId(rs.getInt("ticket_id"));
		feedback.setFeedbackText(rs.getString("feedback_text"));
        return feedback;
    }
}
