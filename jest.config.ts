const { pathsToModuleNameMapper } = require("ts-jest");
const { compilerOptions } = require("./tsconfig");

/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "^@models/(.*)$": "<rootDir>/src/models/$1",
    "^@controllers/(.*)$": "<rootDir>/src/controllers/$1",
  },
  modulePathIgnorePatterns: ["<rootDir>/dist/"],
};
