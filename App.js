import React, { useEffect, useState } from "react";
import { WebView } from "react-native-webview";
import { Asset } from "expo-asset";

export default function App() {
  const [localUri, setLocalUri] = useState(null);

  // ✅ Require hanya file yang bisa diproses RN (misalnya image/svg)
  
  const distFiles = [
  require("./assets/web/assets/style.css"),
  require("./assets/web/assets/index.js"),
  require("./assets/web/vite.svg"),
  require("./assets/web/assets/react-35ef61ed.svg"),
];
  

  useEffect(() => {
    const loadHtml = async () => {
      try {
        // wajib require index.html
        const indexAsset = Asset.fromModule(require("./assets/web/index.html"));
        await indexAsset.downloadAsync();

        // download juga asset lain biar kebundle
        for (let f of distFiles) {
          const a = Asset.fromModule(f);
          await a.downloadAsync();
        }

        setLocalUri(indexAsset.localUri || indexAsset.uri);
      } catch (err) {
        console.log("❌ Gagal load dist:", err);
      }
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