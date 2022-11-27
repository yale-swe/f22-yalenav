module.exports = {
  verbose: true,
  preset: "jest-expo",
  setupFiles: [
    "./__test__/jest.setup.js",
    "./node_modules/react-native-gesture-handler/jestSetup.js",
  ],
  transformIgnorePatterns: [
    "node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|react-native-svg)",
  ],
};
