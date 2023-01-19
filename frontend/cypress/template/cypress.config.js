const { defineConfig } = require("cypress");

module.exports = defineConfig({
  viewportWidth: 1920,
  viewportHeight: 1080,
  env: {
    baseUrl_PA: 'https://poweradmin.com.br/',
  },
  e2e: {
    specPattern: [
      'cypress/tests/powerAdmin/register.test.js',
      'cypress/tests/powerAdmin/login.test.js',
      'cypress/tests/powerAdmin/user_crud.test.js',
    ]
  },
});


