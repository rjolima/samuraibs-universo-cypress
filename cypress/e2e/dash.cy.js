
import loginPage from '../support/pages/login'
import dashPage from '../support/pages/dash'

describe('dashboard', function () {

    context('Quando o cliente faz um agendamento no app mobile', function () {

        const data = {
            customer: { //Cliente que vai faze login para pelo app via api para marcar hora.
                name: 'Nikki Sixx',
                email: 'sixx@motleycrue.com',
                password: 'pwd123',
                is_provider: false
            },
            provider: { // é um barbeiro que vai atender a marção da hora
                name: 'Seu Madruga',
                email: 'ramon@televisa.com',
                password: 'pwd123',
                is_provider: true
            },            
                appointmentHour: '14:00'
            
        }

        //construção de agendamento de dois usuários - implementa o contexto
        before(function () {
            cy.postUser(data.provider)
            cy.postUser(data.customer)

            cy.apiLogin(data.customer)
            //cy.log('Conseguimos pegar o token: ' + Cypress.env('apiToken'))

            cy.setProviderId(data.provider.email) //Validar ID do barbeiro
            cy.createAppointment(data.appointmentHour) // agendamento
        })

        //se agendamento foi criado no dashboard
        it('o cliente deve ser apresentado no dashboard', function () {
           // cy.log('Id do Ramão é: ' + Cypress.env('providerId'))
           loginPage.go()
           loginPage.form(data.provider)
           loginPage.submit()

           dashPage.calendarShouldBeVisible()

           const day = Cypress.env('appointmentDay')
           dashPage.selectDay(day)

           dashPage.appointmentShouldBe(data.customer, data.appointmentHour)

        })
    })
})