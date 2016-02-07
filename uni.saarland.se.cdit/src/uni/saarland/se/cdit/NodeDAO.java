package uni.saarland.se.cdit;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

public class NodeDAO {
	
	public List<Node> getWorkflow(int id) {
        List<Node> list = new ArrayList<Node>();
        Connection c = null;
    	String sql = "SELECT node_id, project_id, source_node_id, target_node_id, x_pos, y_pos "+
    				 "FROM nodes "+
    				 "WHERE project_id = ?";
    	String ticketsCountSql = "SELECT COUNT(t.ticket_id) FROM ticket as t WHERE t.project_id = ? AND t.status_id = ? AND t.active=?";
        try {
            c = ConnectionHelper.getConnection();
            PreparedStatement ps = c.prepareStatement(sql);
            ps.setInt(1, id);
            ResultSet rs = ps.executeQuery();
            ps = c.prepareStatement(ticketsCountSql);
            int i = 0;
            while (rs.next()) {
            	list.add(processRow(rs));
                ps.setInt(1, id);
                ps.setInt(2, list.get(i).getSourceNodeId());
                ps.setBoolean(3, true);
                ResultSet rs2 = ps.executeQuery();
                if(rs2.next())
                	list.get(i).setTicketsCount(rs2.getInt(1));
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
	
	public List<NodeTest> getFlow(int id) {
        List<NodeTest> list = new ArrayList<NodeTest>();
        Connection c = null;
    	String sql = "SELECT node_id, project_id, status_id, user_id, x_pos, y_pos "+
    				 "FROM nodes_test "+
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
	
	protected Node processRow(ResultSet rs) throws SQLException {
		Node workflow = new Node();
		workflow.setId(rs.getInt("node_id"));
		workflow.setProjectId(rs.getInt("project_id"));
		workflow.setSourceNodeId(rs.getInt("source_node_id"));
		workflow.setTargetNodeId(rs.getInt("target_node_id"));
		workflow.setPositionX(rs.getInt("x_pos"));
		workflow.setPositionY(rs.getInt("y_pos"));
        return workflow;
    }
	
	protected NodeTest processTestRow(ResultSet rs) throws SQLException {
		NodeTest workflow = new NodeTest();
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
