import React from "react";
import { WebView } from "react-native-webview";

export default function App() {
  return (
    <WebView
      originWhitelist={["*"]}
      source={{ html: "<h1>Halo dari WebView 🚀</h1>" }}
      style={{ flex: 1 }}
    />
  );
}