package uni.saarland.se.cdit;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

public class NodeDAO {
	
	public List<Node> getWorkflow(int id) {
        List<Node> list = new ArrayList<Node>();
        Connection c = null;
    	String sql = "SELECT node_id, project_id, source_node_id, target_node_id, x_pos, y_pos "+
    				 "FROM nodes "+
    				 "WHERE project_id = ?";
    	String ticketsCountSql = "SELECT COUNT(t.ticket_id) FROM ticket as t WHERE t.project_id = ? AND t.status_id = ?";
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
	
}
