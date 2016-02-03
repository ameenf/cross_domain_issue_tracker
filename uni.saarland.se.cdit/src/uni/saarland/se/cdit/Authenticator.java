package uni.saarland.se.cdit;

import java.lang.reflect.Method;
import java.util.List;
import java.util.StringTokenizer;
import java.lang.Class;

import javax.annotation.security.PermitAll;
import javax.ws.rs.container.ContainerRequestContext;
import javax.ws.rs.container.ContainerRequestFilter;
import javax.ws.rs.container.ResourceInfo;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MultivaluedMap;
import javax.ws.rs.core.Response;
import javax.ws.rs.ext.Provider;

import org.glassfish.jersey.internal.util.Base64;

@Provider
public class Authenticator implements ContainerRequestFilter{
	
	@Context
    private ResourceInfo resourceInfo;
	
	private static final String AUTHORIZATION_PROPERTY = "Authorization";
    private static final String AUTHENTICATION_SCHEME = "Basic";
	
	@Override
    public void filter(ContainerRequestContext requestContext)
    {
		UserDAO dao = new UserDAO();
		User user = new User();
		Method method = resourceInfo.getResourceMethod();
		Class<?> resource = resourceInfo.getResourceClass();
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
        String usernameAndPassword = new String(Base64.decode(encodedUserPassword.getBytes()));;

        //Split username and password tokens
        final StringTokenizer tokenizer = new StringTokenizer(usernameAndPassword, ":");
        final String username = tokenizer.nextToken();
        final String password = tokenizer.nextToken();
        user.setUsername(username);
        user.setPassword(password);
        
        System.out.println(username);
        System.out.println(password);
        if(!dao.authenticate(user))
        	requestContext.abortWith(Response.status(401).build());
    }
}
