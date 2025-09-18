import React, { useEffect, useState } from "react";
import { WebView } from "react-native-webview";
import { Asset } from "expo-asset";
import * as FileSystem from "expo-file-system";

export default function App() {
  const [localUri, setLocalUri] = useState(null);

  useEffect(() => {
    const loadFile = async () => {
      try {
        // ambil file index.html dari assets
        const asset = Asset.fromModule(require("./assets/web/dist/index.html"));
        await asset.downloadAsync();

        // copy ke cache biar bisa diakses WebView
        const fileUri = `${FileSystem.cacheDirectory}index.html`;
        await FileSystem.writeAsStringAsync(
          fileUri,
          await FileSystem.readAsStringAsync(asset.localUri || asset.uri)
        );

        setLocalUri(fileUri);
      } catch (e) {
        console.error("Gagal load HTML:", e);
      }
    };

    loadFile();
  }, []);

  if (!localUri) return null;

  return (
    <WebView
      originWhitelist={["*"]}
      source={{ uri: localUri }}
      allowFileAccess
      mixedContentMode="always"
      javaScriptEnabled
      domStorageEnabled
      style={{ flex: 1 }}
    />
  );
}