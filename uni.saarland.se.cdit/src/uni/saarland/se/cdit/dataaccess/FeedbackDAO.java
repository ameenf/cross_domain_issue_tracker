package uni.saarland.se.cdit.dataaccess;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

import uni.saarland.se.cdit.classes.Feedback;
import uni.saarland.se.cdit.helpers.ConnectionHelper;

public class FeedbackDAO {

	/*
	 * 		getTicketFeedback method takes a ticketId as an argument and returns 
	 * 		all feedback that belongs to that ticket ordered by date
	 * 
	 * 
	 */
	public List<Feedback> getTicketFeedback(int ticketId) {
        List<Feedback> list = new ArrayList<Feedback>(); // initialize a list
        Connection c = null;
    	String sql = "SELECT * FROM feedback " + 		// the SQL statement to retrieve the data
    				 "WHERE ticket_id = ? " +	
    				 "ORDER BY feedback_date ASC";
        try {
            c = ConnectionHelper.getConnection();				// get the database connection
            PreparedStatement ps = c.prepareStatement(sql);		// and prepare SQL statement object, add params, then execute it
            ps.setInt(1, ticketId);
            ResultSet rs = ps.executeQuery();
            while (rs.next()) {
                list.add(processRow(rs)); // processRow takes a ResultSet as an argument, process it then return Feedback object
            }
        } catch (SQLException e) {
            e.printStackTrace();
            throw new RuntimeException(e);
		} finally {
			ConnectionHelper.close(c);
		}
        return list;
    }
	
	/*
	 * 		create method takes a Feedback object as an argument and  
	 * 		add it to the database, the method returns the same object added to it, the id and the date
	 * 
	 * 
	 */
	public Feedback create(Feedback feedback) {
        Connection c = null;
        PreparedStatement ps = null;
        String statement= "INSERT INTO feedback(feedback_text, ticket_id, user_id) VALUES (?, ?, ?)"; // the insert statement
        try {
            c = ConnectionHelper.getConnection(); // prepare connection and SQL statement
            ps = c.prepareStatement(statement, new String[] { "feedback_id", "feedback_date" }); // feedback id and date are added automatically 
            ps.setString(1, feedback.getFeedbackText());										 // by the DB, so we retrieve them back.
            ps.setInt(2, feedback.getTicketId());
            ps.setInt(3, feedback.getUserId());
            ps.executeUpdate();
            ResultSet rs = ps.getGeneratedKeys(); // get the feedback id and date and insert it in the return object below
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
	
	/*
	 * 		update method takes a Feedback object as an argument and  
	 * 		add change the database, it only updates the feedback text, and returns the same object
	 * 
	 * 
	 */
	public Feedback update(Feedback feedback) {
        Connection c = null;
        try {
            c = ConnectionHelper.getConnection();	// prepare SQL connection and statement 
            PreparedStatement ps = c.prepareStatement("UPDATE feedback " +
            										  "SET feedback_text=?" +
            										  "WHERE feedback_id=?"); // the UPDATE SQL statement
            ps.setString(1, feedback.getFeedbackText()); // setting the new feedback text
            ps.setInt(2, feedback.getId());		// using the feedback id as condition 
            ps.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
            throw new RuntimeException(e);
		} finally {
			ConnectionHelper.close(c);
		}
        return feedback;
    }
	
	/*
	 * 		remove method takes a Feedback id as an argument and  
	 * 		 deletes the feedback
	 * 
	 * 
	 */
	public boolean remove(int id) {
        Connection c = null;
        try {
            c = ConnectionHelper.getConnection(); // prepare SQL connection and statement 
            PreparedStatement ps = c.prepareStatement("DELETE FROM feedback WHERE feedback_id=?");// the DELETE SQL statement
            ps.setInt(1, id);
            int count = ps.executeUpdate();
            return count == 1; // returns true when success
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException(e);
		} finally {
			ConnectionHelper.close(c);
		}
    }
	
	/*
	 * 		processRow method takes a ResultSet as an argument and extracts the columns 
	 * 		and add to the appropriate field in a Feedback object
	 * 
	 * 
	 */
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
