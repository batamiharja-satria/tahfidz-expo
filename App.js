import React from "react";
import { WebView } from "react-native-webview";

export default function App() {
  return (
    <WebView
      originWhitelist={["*"]}
      source={{ uri: "file:///android_asset/dist/index.html" }}
      style={{ flex: 1 }}
    />
  );
}