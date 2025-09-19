import React, { useEffect, useState } from "react";
import { WebView } from "react-native-webview";
import StaticServer from "react-native-static-server";
import * as FileSystem from "expo-file-system";
import { Asset } from "expo-asset";

export default function App() {
  const [url, setUrl] = useState(null);

  // ✅ daftar semua file hasil build vite (biar ke-bundle)
  const distFiles = [
    require("./assets/web/index.html"),
    require("./assets/web/assets/index.js"),
    require("./assets/web/assets/style.css"),
  ];

  useEffect(() => {
    const startServer = async () => {
      const targetDir = FileSystem.documentDirectory + "web";
      await FileSystem.makeDirectoryAsync(targetDir, { intermediates: true });

      // ✅ loop semua file, copy ke targetDir
      for (let f of distFiles) {
        const asset = Asset.fromModule(f);
        await asset.downloadAsync();

        const filename = asset.name; // nama file asli
        const dest = targetDir + "/" + filename;

        await FileSystem.copyAsync({
          from: asset.localUri,
          to: dest,
        });
      }

      // ✅ start static server
      const server = new StaticServer(8080, targetDir, { localOnly: true });
      const newUrl = await server.start();
      setUrl(newUrl + "/index.html");
    };

    startServer();
  }, []);

  if (!url) return null;

  return <WebView source={{ uri: url }} style={{ flex: 1 }} />;
}