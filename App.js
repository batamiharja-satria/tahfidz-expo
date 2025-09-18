import React from 'react';
import { WebView } from 'react-native-webview';
import { Asset } from 'expo-asset';
import * as FileSystem from 'expo-file-system';
import { useEffect, useState } from 'react';

export default function App() {
  const [localUri, setLocalUri] = useState(null);

  useEffect(() => {
    // Ambil file index.html dari assets
    const loadFile = async () => {
      const asset = Asset.fromModule(require('./assets/web/dist/index.html'));
      await asset.downloadAsync(); // pastikan file tersedia di device
      setLocalUri(asset.localUri || asset.uri);
    };
    loadFile();
  }, []);

  if (!localUri) return null; // tunggu file siap

  return (
    <WebView
      originWhitelist={['*']}
      source={{ uri: localUri }}
      allowFileAccess={true}
      mixedContentMode="always"
      javaScriptEnabled={true}
      domStorageEnabled={true}
      style={{ flex: 1 }}
    />
  );
}