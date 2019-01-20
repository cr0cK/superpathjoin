module.exports = {
  testURL: 'http://localhost',
  roots: [
    '<rootDir>/src',
  ],
  verbose: true,
  testPathIgnorePatterns: [
    '/lib/',
  ],
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$',
  collectCoverageFrom: [
    '**/*.{ts,tsx}',
    '!**/node_modules/**',
  ],
  preset: 'ts-jest',
  testMatch: null,
}
