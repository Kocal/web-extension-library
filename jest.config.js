// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
  setupFiles: [
    'jest-webextension-mock'
  ],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  testMatch: ['**/?(*.)+(spec|test).ts'],
  moduleFileExtensions: ['ts', 'js'],
  globals: {
    'ts-jest': {
      tsConfigFile: 'tsconfig.test.json',
    },
  },
  collectCoverage: !!process.env.CI,
  coverageDirectory: 'coverage',
};
