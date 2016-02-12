package uni.saarland.se.cdit;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

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
	
	public List<Node> getFlow(int id) {
        List<Node> list = new ArrayList<Node>();
        Connection c = null;
    	String sql = "SELECT node_id, project_id, status_id, user_id, x_pos, y_pos "+
    				 "FROM nodes "+
    				 "WHERE project_id = ?";
    	String ticketsCountSql = "SELECT COUNT(t.ticket_id) FROM ticket as t WHERE t.project_id = ? AND t.status_id = ? AND t.active=?";
    	String arrows = "SELECT * FROM arrows WHERE source_node_id=?";
        try {
            c = ConnectionHelper.getConnection();
            PreparedStatement ps = c.prepareStatement(sql);
            ps.setInt(1, id);
            ResultSet rs = ps.executeQuery();
            ps = c.prepareStatement(ticketsCountSql);
            PreparedStatement ps2 = c.prepareStatement(arrows, 
          		  										ResultSet.TYPE_SCROLL_INSENSITIVE, 
          		  										ResultSet.CONCUR_READ_ONLY);
            int i = 0;
            while (rs.next()) {
            	list.add(processTestRow(rs));
                ps.setInt(1, id);
                ps.setInt(2, list.get(i).getStatusId());
                ps.setBoolean(3, true);
                ResultSet rs2 = ps.executeQuery();
                if(rs2.next())
                	list.get(i).setTicketsCount(rs2.getInt(1));
                ps2.setInt(1, list.get(i).getId());
                rs2 = ps2.executeQuery();
                if(rs2.next())
                	list.get(i).setArrows(getArrows(rs2));
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

	public boolean removeArrow(int id) {
        Connection c = null;
        try {
            c = ConnectionHelper.getConnection();
            PreparedStatement ps = c.prepareStatement("DELETE FROM arrows WHERE arrow_id=?");
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
	
	public boolean removeNode(int id) {
        Connection c = null;
        try {
        	c = ConnectionHelper.getConnection();
            PreparedStatement ps = c.prepareStatement("DELETE FROM arrows WHERE source_node_id=? OR target_node_id=?");
            ps.setInt(1, id);
            ps.setInt(2, id);
            ps.executeUpdate();
            ps = c.prepareStatement("DELETE FROM nodes WHERE node_id=?");
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
	
	public int getArrowSourceNode(int id) {
		int nodeId = 0;
        Connection c = null;
        try {
        	c = ConnectionHelper.getConnection();
            PreparedStatement ps = c.prepareStatement("SELECT source_node_id FROM arrows WHERE arrow_id=?");
            ps.setInt(1, id);
            ResultSet rs = ps.executeQuery();
            if(rs.next())
            	nodeId = rs.getInt(1);
            return nodeId;
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException(e);
		} finally {
			ConnectionHelper.close(c);
		}
    }
	
	protected Node processTestRow(ResultSet rs) throws SQLException {
		Node workflow = new Node();
		workflow.setId(rs.getInt("node_id"));
		workflow.setProjectId(rs.getInt("project_id"));
		workflow.setUserId(rs.getInt("user_id"));
		workflow.setStatusId(rs.getInt("status_id"));
		workflow.setPositionX(rs.getInt("x_pos"));
		workflow.setPositionY(rs.getInt("y_pos"));
        return workflow;
    }
	protected Arrow[] getArrows(ResultSet rs){
		Arrow[] arrows  = null;
		try {
			int len = 0;
			if(rs.last()){
				len = rs.getRow();
				rs.beforeFirst();
			}
			arrows = new Arrow[len];
			for(int i = 0;rs.next();i++){
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
		return arrows;
	}
}
