module.exports = {
  verbose: true,
  preset: "jest-expo",
  setupFiles: [
    "./jest-setup.js",
    "./node_modules/react-native-gesture-handler/jestSetup.js",
  ],
  transformIgnorePatterns: [
    "node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|react-native-svg)",
  ],
  coveragePathIgnorePatterns: [
    "__test__/mockData",
    "assets",
    "types",
    "src/constants",
    "src/components/index",
    "src/utils", // not critical to app functionality; for APIs these are tested in the server
    "src/components/map/ReactNativeMap", // no need to test react nativ maps implementation; that's for them to do
  ],
};
