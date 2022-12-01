module.exports = {
  rootDir: "../../",
  preset: "ts-jest",
  verbose: true,
  setupFiles: ["./src/testUtils/setup.ts"],
  coveragePathIgnorePatterns: ["./src/passport.ts"],
};
