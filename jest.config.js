module.exports = {
  transformIgnorePatterns: [
    "node_modules/(?!typescript-table|typescript-exportdata)/"
  ],
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.jsx?$",
  collectCoverage: true,
  coverageReporters: ['text', 'lcov'],
};