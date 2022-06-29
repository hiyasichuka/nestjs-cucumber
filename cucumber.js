module.exports = {
  default: [
    '--require-module ts-node/register', // Load TypeScript module
    '--require test/features/support/**/*.ts', // Load step definitions
    '--format @cucumber/pretty-formatter', // Load pretty console formatter
    '--format html:report/cucumber.html', // Load html formetter
    '--format json:report/cucumber.json', // Load json formetter
    '--fail-fast',
    '--publish-quiet',
    'test/features', // Specify feature files directory
  ].join(' '),
};
