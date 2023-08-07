it('Web deve estar online', function(){
    cy.visit('/')

    cy.title()
        .should('eq', 'Samurai Barbershop by QAninja')
})