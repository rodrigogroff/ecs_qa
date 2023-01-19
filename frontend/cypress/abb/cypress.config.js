const { defineConfig } = require("cypress");

module.exports = defineConfig({
  viewportWidth: 800,
  viewportHeight: 600,
  env: {
    baseUrl_ABB: 'http://probid-hlg.ecs.com.br/',
    userAdm_ABB: 'suporteentire@email.com.br',
    userAdmPassword_ABB: 'A123456',
    userCoord_ABB: 'coordenador@br.abb.com',
    userCoordPassword_ABB: 'A123456',
    userPMS_ABB: 'pms@email.com.br',
    userPMSPassword_ABB: 'A123456',
  },
  e2e: {
    specPattern: [
      'cypress/tests/ABB/abb_descontos.test.js',
    ]
  },
});


