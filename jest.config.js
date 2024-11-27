module.exports = {
    moduleNameMapper: {
      '^axios$': require.resolve('axios'),
    },
    transform: {
      '^.+\\.jsx?$': 'babel-jest',
    },
  };
  