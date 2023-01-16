const { defineConfig } = require("cypress");

module.exports = defineConfig({
  viewportWidth: 1440,
  viewportHeight: 900,
  env: {
    baseUrl: 'https://poweradmin.com.br/',
  },
  e2e: {
    specPattern: [
      'cypress/tests/powerAdmin/register.test.js',
      'cypress/tests/powerAdmin/login.test.js',
      'cypress/tests/powerAdmin/user_crud.test.js',
    ]
  },
});


