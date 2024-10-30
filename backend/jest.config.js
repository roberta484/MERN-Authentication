module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  moduleFileExtensions: [
    "js",
    "mjs",
    "cjs",
    "jsx",
    "ts",
    "tsx",
    "json",
    "node",
  ],
  testPathIgnorePatterns: ["/node_modules/", "/build/"],
  verbose: true,
  forceExit: false,
};
