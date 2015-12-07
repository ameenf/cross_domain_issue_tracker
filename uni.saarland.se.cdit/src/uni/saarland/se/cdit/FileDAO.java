package uni.saarland.se.cdit;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.ResourceBundle;

public class FileDAO {
	
	String serverPath;
	public FileDAO(){
		ResourceBundle bundle = ResourceBundle.getBundle("cdit");
		serverPath = bundle.getString("files.path");
	}

	public boolean saveFile(InputStream uploadedInputStream, String fileName) {
		boolean success = false;
		try {
			 	OutputStream outpuStream = new FileOutputStream(new File(serverPath+fileName));
	            int read = 0;
	            byte[] bytes = new byte[1024];
	            //outpuStream = new FileOutputStream(new File(serverPath+fileName));
	            while ((read = uploadedInputStream.read(bytes)) != -1) {
	            	outpuStream.write(bytes, 0, read);
	            }
		        outpuStream.flush();
		        success = true;
		        outpuStream.close();
		    } catch (IOException e) {
		        e.printStackTrace();
		}
		return success;
	}
}
