import React, { useEffect, useState } from "react";
import { WebView } from "react-native-webview";
import * as FileSystem from "expo-file-system";
import { Asset } from "expo-asset";

export default function App() {
  const [url, setUrl] = useState(null);

  // ✅ daftar semua file hasil build (harus sesuai isi dist/)
  const distFiles = [
    require("./assets/web/index.html"),
    require("./assets/web/assets/index.js"),
    require("./assets/web/assets/style.css"),
  ];

  useEffect(() => {
    const loadWeb = async () => {
      const targetDir = FileSystem.documentDirectory + "web";
      await FileSystem.makeDirectoryAsync(targetDir, { intermediates: true });

      // ✅ copy semua file ke targetDir
      for (let f of distFiles) {
        const asset = Asset.fromModule(f);
        await asset.downloadAsync();

        // nama file asli + extensi
        const filename = asset.name + "." + asset.type;

        // kalau file dari folder assets → taruh di /assets
        let destDir = targetDir;
        if (["js", "css"].includes(asset.type)) {
          destDir = targetDir + "/assets";
          await FileSystem.makeDirectoryAsync(destDir, { intermediates: true });
        }

        const dest = destDir + "/" + filename;
        await FileSystem.copyAsync({
          from: asset.localUri,
          to: dest,
        });
      }

      // ✅ set URL ke index.html yang udah di-copy
      setUrl(targetDir + "/index.html");
    };

    loadWeb();
  }, []);

  if (!url) return null;

  return (
    <WebView
      originWhitelist={["*"]}
      source={{ uri: url }}
      javaScriptEnabled={true}
      domStorageEnabled={true}
      allowFileAccess={true}
      style={{ flex: 1 }}
    />
  );
}