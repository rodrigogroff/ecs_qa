const { defineConfig } = require("cypress");

module.exports = defineConfig({
  viewportWidth: 1920,
  viewportHeight: 1080,
  env: {

  },
  e2e: {
    specPattern: [
      'cypress/tests/speedtest/benchmark.test.js',
    ]
  },
});


