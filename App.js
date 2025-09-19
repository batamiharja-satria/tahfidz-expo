import React, { useEffect, useState } from 'react';
import { WebView } from 'react-native-webview';
import { Asset } from 'expo-asset';

export default function App() {
  const [localUri, setLocalUri] = useState(null);

  useEffect(() => {
    const loadHtml = async () => {
      const indexAsset = Asset.fromModule(require('./assets/web/index.html'));
      await indexAsset.downloadAsync();
      setLocalUri(indexAsset.localUri || indexAsset.uri);
    };
    loadHtml();
  }, []);

  if (!localUri) return null;

  return <WebView source={{ uri: localUri }} style={{ flex: 1 }} />;
}