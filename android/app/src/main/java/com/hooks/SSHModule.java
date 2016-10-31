package com.hooks;

import java.io.InputStream;
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.Properties;
import java.util.Vector;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableNativeArray;
import com.jcraft.jsch.ChannelExec;
import com.jcraft.jsch.JSch;
import com.jcraft.jsch.JSchException;
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
  public void execute(ReadableMap config, String command, Callback success, Callback error) {
    try {
      // Get an SSH session ready
      Session session = this.connect(config);

      // Execute the command and prepare to read the output
      ChannelExec channelExec = (ChannelExec)session.openChannel("exec");
      InputStream in = channelExec.getInputStream();
      channelExec.setCommand(command);
      channelExec.connect();

      // Put the result into an JS-readable array
      String line;
      BufferedReader reader = new BufferedReader(new InputStreamReader(in));
      WritableNativeArray filenames = new WritableNativeArray();
      while ((line = reader.readLine()) != null) {
        filenames.pushString(line);
      }

      // Pass the array of filenames back to JS
      success.invoke(filenames);
    } catch (Exception e) {
      error.invoke("Error: " + e.getMessage());
    }
  }

  private Session connect(ReadableMap config) throws JSchException {
    // Prepare the SSH session with the provided credentials
    JSch jsch = new JSch();
    Session session = jsch.getSession(config.getString("user"), config.getString("host"), 22);
    session.setPassword(config.getString("password"));

    // Ignore the checking of the key
    Properties prop = new Properties();
    prop.put("StrictHostKeyChecking", "no");
    session.setConfig(prop);

    // Connect to the server
    session.connect();
    
    return session;
  }
}
