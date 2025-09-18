import React, { useEffect, useState } from 'react';
import { WebView } from 'react-native-webview';
import * as FileSystem from 'expo-file-system';
import * as Asset from 'expo-asset';

export default function App() {
  const [localUri, setLocalUri] = useState(null);

  useEffect(() => {
    const loadDist = async () => {
      try {
        // index.html wajib di-require manual
        const indexAsset = Asset.fromModule(require('./assets/web/index.html'));
        await indexAsset.downloadAsync();

        // ambil path index.html
        const indexPath = indexAsset.localUri || indexAsset.uri;

        // ✅ triknya: require semua file yang ada di folder assets/ dist
        const distFiles = [
          require('./assets/web/assets/index-0bddca8e.css'),
          require('./assets/web/assets/index-8a0095ee.js'),
          require('./assets/web/assets/react-35ef61ed.svg'),
          // tambah semua file yang ada di dist sini
        ];

        for (let f of distFiles) {
          const a = Asset.fromModule(f);
          await a.downloadAsync(); // pastiin kebundle
        }

        setLocalUri(indexPath);
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