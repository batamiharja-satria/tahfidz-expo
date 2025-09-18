import React from 'react';
import { WebView } from 'react-native-webview';
import { Asset } from 'expo-asset';
import * as FileSystem from 'expo-file-system';

export default function App() {
  const localUri = Asset.fromModule(
    require('./assets/web/index.html')
  ).uri;

  return (
    <WebView
      originWhitelist={['*']}
      source={{ uri: localUri }}
      style={{ flex: 1 }}
    />
  );
}