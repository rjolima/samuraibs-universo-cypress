const { defineConfig } = require("cypress");
const { pool, Pool } = require('pg')

// <reference types="Cypress" />

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    apiServer: 'http://localhost:3333',
    // baseUrl: 'https://samuraibs-api-dino.herokuapp.com',
    // apiServer: 'https://samuraibs-web-dino.herokuapp.com',
    viewportWidth: 1440,
    viewportHeight: 900,
    defaultCommandTimeout: 30000,
    projectId: "mbixxx",

    setupNodeEvents(on, config) {
      // implement node event listeners here
      const pool = new Pool({
        host: 'rajje.db.elephantsql.com',
        user: 'umcinckm',
        password: 'evDc3zdo-jGrq2FkJ4eBMrejJVb88ZyD',
        database: 'umcinckm',
        port: 5432
      })

      on('task', {
        removeUser(email) {
          return new Promise((resolve) => {
            pool.query('DELETE FROM public.users WHERE email = $1', [email], (error, result) => {
              if (error) {
                throw error
              }
              resolve({ success: result })
            })
          })
        },

        findToken(email) {
          return new Promise((resolve) => {
            pool.query('select B.token from ' +
              'public.users A ' +
              'INNER JOIN public.user_tokens B ' +
              'ON A.id = B.user_id ' +
              'WHERE A.email = $1 ' +
              'ORDER BY B.created_at', [email], (error, result) => {
                if (error) {
                  throw error
                }
                resolve({ token: result.rows[0].token })
              })
          })
        }
      })
    },
  },
});