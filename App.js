import React, { useEffect, useState } from 'react';
import { WebView } from 'react-native-webview';
import { Asset } from 'expo-asset';

export default function App() {
  const [localUri, setLocalUri] = useState(null);

  useEffect(() => {
    const loadDist = async () => {
      try {
        // cukup require index.html
        const indexAsset = Asset.fromModule(require('./assets/web/index.html'));
        await indexAsset.downloadAsync();

        setLocalUri(indexAsset.localUri || indexAsset.uri);
      } catch (err) {
        console.log('❌ Gagal load dist:', err);
      }
    };

    loadDist();
  }, []);

  if (!localUri) return null;

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