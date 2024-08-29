module.exports = {
    testEnvironment: "jsdom",
    transform: {
      "^.+\\.jsx?$": "babel-jest", // Transpile JS and JSX files using Babel
      "^.+\\.tsx?$": "ts-jest",    // Transpile TS and TSX files using ts-jest
    },
    transformIgnorePatterns: ["/node_modules/"],
    moduleNameMapper: {
      "^.+\\.(css|less|scss)$": "identity-obj-proxy", // Mock CSS modules
    },
    setupFilesAfterEnv: ["<rootDir>/setupTests.ts"], // Optional, for setup files
  };
  