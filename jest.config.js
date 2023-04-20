module.exports = {
    transform: {
      '^.+\\.(ts|tsx)?$': 'ts-jest',
      '^.+\\.js$': 'babel-jest',
        '^.+\\.tsx?$': 'ts-jest',
        '^.+\\.jsx?$': 'babel-jest',
        '^.+\\.js?$': 'babel-jest',
        '^.+\\.esm.js$': 'babel-jest',
    },
    testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    type: "module",
};