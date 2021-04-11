module.exports = {
  coverageDirectory:"coverage",
  preset: 'ts-jest',
  testEnvironment: 'node',
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
  coverageReporters: [
    "json-summary", 
    "text",
    "lcov"
  ]
};