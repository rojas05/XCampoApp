// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require("expo/metro-config");

/** @type {import('expo/metro-config').MetroConfig} **/
const config = getDefaultConfig(__dirname);
config.resolver.sourceExts.push("env"); // Asegura que Metro reconozca archivos .env

module.exports = config;
