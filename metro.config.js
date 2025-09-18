const { getDefaultConfig } = require("expo/metro-config");

const defaultConfig = getDefaultConfig(__dirname);

// Tambahin ekstensi yang dianggap asset biasa, bukan modul JS
defaultConfig.resolver.assetExts.push("js", "css");

module.exports = defaultConfig;