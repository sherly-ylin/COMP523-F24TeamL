
// module.exports = {
//     preset: 'ts-jest',
//     testEnvironment: 'node',
//     testMatch: ['**/?(*.)+(spec|test).[tj]s?(x)'], // Match test files
//     moduleFileExtensions: ['ts', 'tsx', 'js', 'json'],
// };

module.exports = {
    "roots": [
      "api/src"
    ],
    "testMatch": [
      "**/__tests__/**/*.+(ts|tsx|js)",
      "**/?(*.)+(spec|test).+(ts|tsx|js)"
    ],
    "transform": {
      "^.+\\.(ts|tsx)$": "ts-jest"
    },
  }