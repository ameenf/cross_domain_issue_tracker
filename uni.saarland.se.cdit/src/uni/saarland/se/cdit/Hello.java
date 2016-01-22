package uni.saarland.se.cdit;

import org.glassfish.jersey.server.ResourceConfig;

// Plain old Java Object it does not extend as class or implements 
// an interface

// The class registers its methods for the HTTP GET request using the @GET annotation. 
// Using the @Produces annotation, it defines that it can deliver several MIME types,
// text, XML and HTML. 

// The browser requests per default the HTML MIME type.

//Sets the path to base URL + /hello

public class Hello extends ResourceConfig {
	
	public static int counter = 0;
	public static String str;
	public Hello(){
		str = "constructor init";
	}

} 