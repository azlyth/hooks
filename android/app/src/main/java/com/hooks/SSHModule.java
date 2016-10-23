package com.hooks;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class SSHModule extends ReactContextBaseJavaModule {

  public SSHModule(ReactApplicationContext reactContext) {
    super(reactContext);
  }

  @Override
  public String getName() {
    return "SSH";
  }

  @ReactMethod
  public void connect(String host, String password, Callback successCallback) {
    successCallback.invoke("Got " + host + " and " + password);
  }
}
