module.exports = {
  setupFiles: ["dotenv/config"],
  "moduleFileExtensions": [
    "ts",
    "tsx",
    "js"
  ],
  "transform": {
    "^.+\\.(ts|tsx|js)$": "ts-jest"
    ,
    "\\.(gql|graphql)$": "jest-transform-graphql"
      },
  "globals": {
    "ts-jest": {
      "tsConfig": "tsconfig.json"
    }
  },
  "collectCoverage": true,
  "testMatch": [
    "**/src/e2e/*.spec.(ts|tsx|js)"
  ],
  "testEnvironment": "node",
  "coveragePathIgnorePatterns": [
    "/node_modules/"
  ]
}
