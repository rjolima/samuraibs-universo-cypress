// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import { after } from 'underscore'
import './commands'

// Alternatively you can use CommonJS syntax:
// require('./commands')

//Comando para dar screenshot em todos os testes passando ou não, vai ficar comentado pq já gera em vídeo
// afterEach(function(){
//     cy.screenshot()
// })