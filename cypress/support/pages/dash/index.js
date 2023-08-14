import { el } from './elements'
import header from '../../components/header'

class DashPage {

    constructor() {
        this.header = header
    }

    calendarShouldBeVisible() {
        cy.get(el.calendar, { timeout: 7000 })
            .should('be.visible')
    }

    selectDay(day) {
        const target = new RegExp('^' + day + '$', 'g')//O dia através de uma expressão regular pra garantir q vai clicar no dia certo.
        cy.contains(el.boxDay, target)
            .click({ force: true })
    }

    appointmentShouldBe(customer, hour) {
        cy.contains("div", customer.name, { timeout: 7000 })
            .should('be.visible')
            .parent()
            .contains(el.boxHour, hour, { timeout: 7000 })
            .should('be.visible')
    }
}

export default new DashPage