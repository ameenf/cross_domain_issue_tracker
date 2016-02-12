package uni.saarland.se.cdit.helpers;

import java.lang.reflect.Method;
import java.util.List;
import java.util.StringTokenizer;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;

import javax.annotation.security.PermitAll;
import javax.annotation.security.RolesAllowed;
import javax.ws.rs.container.ContainerRequestContext;
import javax.ws.rs.container.ContainerRequestFilter;
import javax.ws.rs.container.ResourceInfo;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MultivaluedMap;
import javax.ws.rs.core.Response;
import javax.ws.rs.ext.Provider;

import org.glassfish.jersey.internal.util.Base64;
import org.glassfish.jersey.message.internal.ReaderWriter;
import org.glassfish.jersey.server.ContainerException;
import org.glassfish.jersey.server.model.Resource;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import uni.saarland.se.cdit.classes.MessageHandler;
import uni.saarland.se.cdit.classes.User;
import uni.saarland.se.cdit.dataaccess.ProjectDAO;
import uni.saarland.se.cdit.dataaccess.UserManagementDAO;


@Provider
public class Authenticator implements ContainerRequestFilter{
	
	private UserManagementDAO dao = new UserManagementDAO();
	private User user = new User();
	private Method method ;
	private String resourceName ;
	private String httpMethod ;
	private String httpPath ;
	
	@Context
    private ResourceInfo resourceInfo;
	
	private static final String AUTHORIZATION_PROPERTY = "Authorization";
    private static final String AUTHENTICATION_SCHEME = "Basic";
	
	@Override
    public void filter(ContainerRequestContext requestContext)
    {
		 method = resourceInfo.getResourceMethod();
		 resourceName = resourceInfo.getResourceClass().getName();
		 httpMethod = requestContext.getMethod();
		 httpPath = requestContext.getUriInfo().getPath();
		
		//if(resource.isAnnotationPresent(PermitAll.class))
		//	return;
		if(method.isAnnotationPresent(PermitAll.class))
			return;
		//Get request headers
        final MultivaluedMap<String, String> headers = requestContext.getHeaders();
          
        //Fetch authorization header
        final List<String> authorization = headers.get(AUTHORIZATION_PROPERTY);
          
        //If no authorization information present; block access
        if(authorization == null || authorization.isEmpty())
        {
            requestContext.abortWith(Response.status(401).build());
            return;
        }
          
        //Get encoded username and password
        final String encodedUserPassword = authorization.get(0).replaceFirst(AUTHENTICATION_SCHEME + " ", "");
          
        //Decode username and password
        String usernameAndPassword = new String(Base64.decode(encodedUserPassword.getBytes()));
        System.out.println(usernameAndPassword);

        //Split username and password tokens
        final StringTokenizer tokenizer = new StringTokenizer(usernameAndPassword, ":");
        final String username = tokenizer.nextToken();
        final String password = tokenizer.nextToken();
        user.setUsername(username);
        user.setPassword(password);
        
        if(!dao.authenticate(user))
        	requestContext.abortWith(Response.status(401).entity(new MessageHandler("Access is unauthorized. You need to login first.")).build());
        user = dao.getUser(user);
        String userType = user.getType();
        if(method.isAnnotationPresent(RolesAllowed.class)){
        	RolesAllowed roles = method.getAnnotation(RolesAllowed.class);
        	for(String role : roles.value()){
        		if(role.equals(userType) || userType.equals("admin")){
        			return;
        		}
        	}
        }
        
        if(httpMethod.equals("GET")){
        	
        	int projectId = 0;
        	if(resourceName.equals("uni.saarland.se.cdit.resources.TicketResource"))
        		projectId = getTicketMethod(httpPath,method.getName());
        	else if(resourceName.equals("uni.saarland.se.cdit.resources.WorkflowResource"))
        		projectId = getWorkflowMethod(httpPath,method.getName());
        	else if(resourceName.equals("uni.saarland.se.cdit.resources.UserManagementResource"))
        		projectId = getUserMethod(httpPath,method.getName());
        	else if(resourceName.equals("uni.saarland.se.cdit.resources.FileResource"))
        		projectId = getFileMethod(httpPath,method.getName());
        	else if(resourceName.equals("uni.saarland.se.cdit.resources.FeedbackResource"))
        		projectId = getFeedbackMethod(httpPath,method.getName());
        	
        	if(projectId==0)
        		requestContext.abortWith(Response.status(403).entity(new MessageHandler("You are not allowed to access this resource.")).build());
        	else
        		return;
        }else if(method.getName().equals("updatePassword")){
        	ByteArrayOutputStream out = new ByteArrayOutputStream();
	        InputStream in = requestContext.getEntityStream();
	        byte[] requestEntity = null;
	        try {
	            if (in.available() > 0) {
	                ReaderWriter.writeTo(in, out);
	
	                requestEntity = out.toByteArray();
	
	                requestContext.setEntityStream(new ByteArrayInputStream(requestEntity));
	                
	            }
	            
	        } catch (IOException ex) {
	            throw new ContainerException(ex);
	        }
	        User temp = jsonToUser(requestEntity);
	        if(temp.getId()==user.getId())
	        	return;
	        else
	    		requestContext.abortWith(Response.status(403).entity(new MessageHandler("You are not allowed to access this resource.")).build());
	    
        }
        if(checkGroupPermissions(user,method.getName().toLowerCase()))
        	return;
    	else
    		requestContext.abortWith(Response.status(403).entity(new MessageHandler("You are not allowed to access this resource.")).build());
    
        
    }
	
	private boolean checkGroupPermissions(User user, String request){
		boolean success = false;
		String permissions[] = user.getPermissions();
		for(int i=0; i<permissions.length;i++){
			if(permissions[i].equals(request)){
				success = true;
				break;
			}
		}
		return success;
	}
	
	private int getUserMethod(String httpPath, String method){
		
		int projectId = 0;
        int typeIndex = method.indexOf("By")+2;
        int idIndex = httpPath.lastIndexOf('/')+1;
        String idType = method.substring(typeIndex);
        int id = Integer.valueOf(httpPath.substring(idIndex));
        switch (idType){
        	case "UserId":
        		projectId = new ProjectDAO().areUserInProject(user.getId(), id);
        		break;
        	case "ProjectId":
        		projectId = new ProjectDAO().isUserInProject(user.getId(), id);
        		break;
        }
        return projectId;
    }
	private int getWorkflowMethod(String httpPath, String method){
		
		int projectId = 0;
        int typeIndex = method.indexOf("By")+2;
        int idIndex = httpPath.lastIndexOf('/')+1;
        String idType = method.substring(typeIndex);
        int id = Integer.valueOf(httpPath.substring(idIndex));
        switch (idType){
        	case "ProjectId":
        		projectId = new ProjectDAO().isUserInProject(user.getId(), id);
        		break;
        }
        return projectId;
    }
	private int getFileMethod(String httpPath, String method){
		
		int projectId = 0;
        int idIndex = httpPath.lastIndexOf('/')+1;
        int id = Integer.valueOf(httpPath.substring(idIndex));
        switch (method){
        	case "getProjectAttachments":
        		projectId = new ProjectDAO().isUserInProject(user.getId(), id);
        		break;
        }
        return projectId;
    }
	private int getFeedbackMethod(String httpPath, String method){
		
		int projectId = 0;
        int idIndex = httpPath.lastIndexOf('/')+1;
        int id = Integer.valueOf(httpPath.substring(idIndex));
        switch (method){
        	case "getTicketFeedback":
        		projectId = new ProjectDAO().isUserInTicketProject(user.getId(), id);
        		break;
        }
        return projectId;
    }
	
	private int getTicketMethod(String httpPath, String method){
		
		int projectId = 0;
        int typeIndex = method.indexOf("By")+2;
        int idIndex = httpPath.lastIndexOf('/')+1;
        String idType = method.substring(typeIndex);
        int id = Integer.valueOf(httpPath.substring(idIndex));
        switch (idType){
        	case "TicketId":
        		projectId = new ProjectDAO().isUserInTicketProject(user.getId(), id);
        		break;
        	case "NodeId":
        		projectId = new ProjectDAO().isUserInNodeProject(user.getId(), id);
        		break;
        	case "ProjectId":
        		projectId = new ProjectDAO().isUserInProject(user.getId(), id);
        		break;
        }
        return projectId;
    }
	
	private User jsonToUser(byte[] data){
		ObjectMapper mapper = new ObjectMapper();
		User temp = null;
		try {
			temp = mapper.readValue(data, User.class);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return temp;
	}
	
}
