import React, { useEffect, useState } from "react";
import { WebView } from "react-native-webview";
import { Asset } from "expo-asset";

export default function App() {
  const [localUri, setLocalUri] = useState(null);

  const distFiles = [
    require("./assets/web/assets/style.css"),
    require("./assets/web/assets/index.js"),
  ];

  useEffect(() => {
    const loadHtml = async () => {
      const indexAsset = Asset.fromModule(require("./assets/web/index.html"));
      await indexAsset.downloadAsync();

      // pastiin CSS & JS kebundle
      for (let f of distFiles) {
        const a = Asset.fromModule(f);
        await a.downloadAsync();
      }

      setLocalUri(indexAsset.localUri || indexAsset.uri);
    };
    loadHtml();
  }, []);

  if (!localUri) return null;

  return (
    <WebView
      originWhitelist={["*"]}
      source={{ uri: localUri }}
      javaScriptEnabled={true}
      domStorageEnabled={true}
      allowFileAccess={true}
      style={{ flex: 1 }}
    />
  );
}