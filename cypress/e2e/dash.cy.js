
import dashPage from '../support/pages/dash'

import { customer, provider, appointment } from '../support/factories/dash'

describe('dashboard', function () {

    context('Quando o cliente faz um agendamento no app mobile', function () {

        //construção de agendamento de dois usuários - implementa o contexto
        before(function () {
            cy.postUser(provider)
            cy.postUser(customer)

            cy.apiLogin(customer)
            //cy.log('Conseguimos pegar o token: ' + Cypress.env('apiToken'))

            cy.setProviderId(provider.email) //Validar ID do barbeiro
            cy.createAppointment(appointment.hour) // agendamento
        })

        //se agendamento foi criado no dashboard
        it('o cliente deve ser apresentado no dashboard', function () {
            // cy.log('Id do Ramão é: ' + Cypress.env('providerId'))
            const day = Cypress.env('appointmentDay')
            
            cy.uiLogin(provider)
            //cy.apiLogin(provider, true)

            dashPage.calendarShouldBeVisible()
            dashPage.selectDay(day)
            dashPage.appointmentShouldBe(customer, appointment.hour)

        })
    })
})