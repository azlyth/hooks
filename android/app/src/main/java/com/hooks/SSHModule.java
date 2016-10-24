package com.hooks;

import java.util.Properties;
import java.util.Vector;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableNativeArray;
import com.jcraft.jsch.ChannelSftp;
import com.jcraft.jsch.JSch;
import com.jcraft.jsch.Session;


public class SSHModule extends ReactContextBaseJavaModule {

  public SSHModule(ReactApplicationContext reactContext) {
    super(reactContext);
  }

  @Override
  public String getName() {
    return "SSH";
  }

  @ReactMethod
  public void connect(String user, String host, String password, Callback success, Callback error) {
    try {
      // Prepare the SSH session with the provided credentials
      JSch jsch = new JSch();
      Session session = jsch.getSession(user, host, 22);
      session.setPassword(password);

      // Ignore the checking of the key
      Properties prop = new Properties();
      prop.put("StrictHostKeyChecking", "no");
      session.setConfig(prop);

      // Connect to the server
      session.connect();

      // Gather the files in the user's home directory
      ChannelSftp channel = (ChannelSftp) session.openChannel("sftp");
      channel.connect();
      Vector<ChannelSftp.LsEntry> files = channel.ls("/home/" + user);
      channel.disconnect();

      // Put the filenames into a JS-passable array
      WritableNativeArray filenames = new WritableNativeArray();
      for (int i = 0; i < files.size(); i++) {
        filenames.pushString(files.get(i).getFilename());
      }

      // Pass the array of filenames back to JS
      success.invoke(filenames);
    } catch (Exception e) {
      error.invoke("Error: " + e.getMessage());
    }
  }
}
