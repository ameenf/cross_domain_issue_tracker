package uni.saarland.se.cdit.dataaccess;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import uni.saarland.se.cdit.classes.Arrow;
import uni.saarland.se.cdit.classes.Node;
import uni.saarland.se.cdit.helpers.ConnectionHelper;

public class WorkflowDAO {

	
	public Node create(Node node) {
        Connection c = null;
        PreparedStatement ps = null;
        String statement= "INSERT INTO nodes(project_id, status_id, x_pos, y_pos, user_id) "+
        				  "VALUES (?, ?, ?, ?, ?)";
        try {
            c = ConnectionHelper.getConnection();
            ps = c.prepareStatement(statement, new String[] { "node_id" });
            
            ps.setInt(1, node.getProjectId());
            ps.setInt(2, node.getStatusId());
            ps.setInt(3, node.getPositionX());
            ps.setInt(4, node.getPositionY());
            ps.setInt(5, node.getUserId());
            ps.executeUpdate();
            ResultSet rs = ps.getGeneratedKeys();
            rs.next();
            // Update the id in the returned object. This is important as this value must be returned to the client.
            int id = rs.getInt(1);          
            node.setId(id);
           
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException(e);
		} finally {
			ConnectionHelper.close(c);
		}
        return node;
    }
	
	public Arrow create(Arrow arrow) {
        Connection c = null;
        PreparedStatement ps = null;
        String statement= "INSERT INTO arrows(source_node_id, target_node_id, label) VALUES (?, ?, ?)";
        try {
            c = ConnectionHelper.getConnection();
            ps = c.prepareStatement(statement, new String[] { "arrow_id" });
            
            ps.setInt(1, arrow.getSourceNode());
            ps.setInt(2, arrow.getTargetNode());
            ps.setString(3, arrow.getLabel());
            ps.executeUpdate();
            ResultSet rs = ps.getGeneratedKeys();
            rs.next();
            // Update the id in the returned object. This is important as this value must be returned to the client.
            int id = rs.getInt(1);          
            arrow.setId(id);
           
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException(e);
		} finally {
			ConnectionHelper.close(c);
		}
        return arrow;
    }
	
	public Node updateNodePosition(Node node){
		Connection c = null;
        try {
            c = ConnectionHelper.getConnection();
            PreparedStatement ps = c.prepareStatement("UPDATE nodes " +
            										  "SET x_pos=?, y_pos=? " +
            										  "WHERE node_id=?");
            ps.setInt(1, node.getPositionX());
            ps.setInt(2, node.getPositionY());
            ps.setInt(3, node.getId());
            ps.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
            throw new RuntimeException(e);
		} finally {
			ConnectionHelper.close(c);
		}
        return node;
	}
	
	/*
	 * 		updateArrow method takes an Arrow object as an argument and  
	 * 		returns a list of nodes that belong to that project
	 * 
	 */
	public Arrow updateArrow(Arrow arrow){
		Connection c = null;
        try {
            c = ConnectionHelper.getConnection();
            PreparedStatement ps = c.prepareStatement("UPDATE arrows "+
            										  "SET source_node_id=?, target_node_id=?, label=? "+
            										  "WHERE arrow_id=?");
            ps.setInt(1, arrow.getSourceNode());
            ps.setInt(2, arrow.getTargetNode());
            ps.setString(3, arrow.getLabel());
            ps.setInt(4, arrow.getId());
            ps.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
            throw new RuntimeException(e);
		} finally {
			ConnectionHelper.close(c);
		}
        return arrow;
	}
	
	/*
	 * 		getFlow method takes a project id as an argument and  
	 * 		returns a list of nodes that belong to that project
	 * 
	 */
	public List<Node> getFlow(int id) {
		
        List<Node> list = new ArrayList<Node>(); // initialize the list
        Connection c = null;
        
        // this SQL query to retrieve nodes 
    	String nodeSql = "SELECT node_id, project_id, status_id, user_id, x_pos, y_pos "+ 
    				 "FROM nodes "+
    				 "WHERE project_id = ?";
    	
    	// this query to get the total number of tickets in each node based on the node status property
    	String ticketsCountSql = "SELECT COUNT(t.ticket_id) FROM ticket as t WHERE t.project_id = ? AND t.status_id = ? AND t.active=?";
    	
    	// this query to retrieve the arrows where the current node is set as the source node in the arrow
    	String arrows = "SELECT * FROM arrows WHERE source_node_id=?";
        try {
            c = ConnectionHelper.getConnection(); // prepare SQL connection 
            PreparedStatement ps = c.prepareStatement(nodeSql); //get the nodes
            ps.setInt(1, id);
            ResultSet rs = ps.executeQuery();
            
            // reusing the ps object to execute ticketsCount query
            ps = c.prepareStatement(ticketsCountSql); 
            
            // initialize second statement for the arrows query
            PreparedStatement psArrow = c.prepareStatement(arrows, 
          		  										ResultSet.TYPE_SCROLL_INSENSITIVE, 
          		  										ResultSet.CONCUR_READ_ONLY);
            int i = 0;
            while (rs.next()) {
            	list.add(processRow(rs)); // process the first result set and get Node objects 
                ps.setInt(1, id); // set the params for the second query ticketsCount
                ps.setInt(2, list.get(i).getStatusId());
                ps.setBoolean(3, true);
                ResultSet rs2 = ps.executeQuery(); // executing query ticketsCount
                if(rs2.next()) // if there are rows, set the node ticketsCount property
                	list.get(i).setTicketsCount(rs2.getInt(1));
                psArrow.setInt(1, list.get(i).getId()); // set the arrows query params and execute it in rs2 
                rs2 = psArrow.executeQuery();
                if(rs2.next()) // if there are rows, call getArrows method to extract the arrows objects and assigned to Node
                	list.get(i).setArrows(getArrows(rs2));
                i++; // increase counter to the next node.. 
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
	 * 		removeArrow method takes an arrow id as an argument and  
	 * 		then deletes the arrow from the DB
	 * 
	 */
	public boolean removeArrow(int id) {
        Connection c = null;
        try {
            c = ConnectionHelper.getConnection(); // prepare SQL connection 
            PreparedStatement ps = c.prepareStatement("DELETE FROM arrows WHERE arrow_id=?"); // DELETE statement
            ps.setInt(1, id);
            int count = ps.executeUpdate();
            return count == 1; // return true if the delete was success
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException(e);
		} finally {
			ConnectionHelper.close(c);
		}
    }
	
	/*
	 * 		removeNode method takes a node id as an argument and  
	 * 		then deletes the node and any associated arrows with it from the DB
	 * 
	 */
	public boolean removeNode(int id) {
        Connection c = null;
        try {
        	c = ConnectionHelper.getConnection(); // prepare SQL connection 
            PreparedStatement ps = c.prepareStatement("DELETE FROM arrows WHERE source_node_id=? OR target_node_id=?"); // first deletes the node arrows
            ps.setInt(1, id);
            ps.setInt(2, id);
            ps.executeUpdate();
            ps = c.prepareStatement("DELETE FROM nodes WHERE node_id=?"); // then delete the node 
            ps.setInt(1, id);
            int count = ps.executeUpdate();
            return count == 1; // return true if the delete was success
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException(e);
		} finally {
			ConnectionHelper.close(c);
		}
    }
		
	/*
	 * 		processRow method takes a ResultSet as an argument and extracts the columns 
	 * 		and add to the appropriate field in a User object
	 * 
	 * 
	 */
	protected Node processRow(ResultSet rs) throws SQLException {
		Node workflow = new Node();
		workflow.setId(rs.getInt("node_id"));
		workflow.setProjectId(rs.getInt("project_id"));
		workflow.setUserId(rs.getInt("user_id"));
		workflow.setStatusId(rs.getInt("status_id"));
		workflow.setPositionX(rs.getInt("x_pos"));
		workflow.setPositionY(rs.getInt("y_pos"));
        return workflow;
    }
	
	/*
	 * 		getArrows method takes a ResultSet as an argument and extracts Arrows objects to add to a node 
	 * 		
	 */
	protected Arrow[] getArrows(ResultSet rs){
		Arrow[] arrows  = null; // set it to null in case the result set is empty
		try {
			int len = 0;  // this is to get the total number of items to initilize the array
			if(rs.last()){
				len = rs.getRow();
				rs.beforeFirst();
			}
			arrows = new Arrow[len]; // initialize the array 
			for(int i = 0;rs.next();i++){ // for loop to extract the arrows one by one
				Arrow arrow = new Arrow();
				arrow.setId(rs.getInt("arrow_id"));
				arrow.setSourceNode(rs.getInt("source_node_id"));
				arrow.setTargetNode(rs.getInt("target_node_id"));
				arrow.setLabel(rs.getString("label"));
				arrows[i] = arrow;
            }
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return arrows; // returns the array
	}
}
