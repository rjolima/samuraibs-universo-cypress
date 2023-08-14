import { el } from './elements'
import toast from '../../components/toast'

class ResetPassPage{

    constructor() {
        this.toast = toast
    }

    go(token) {
        cy.visit(`/reset-password?token=${token}`)
    }

    form(newPass, confirmPass) {
        cy.get(el.password)
            .should('be.visible')
            .type(newPass)

        cy.get(el.password2)
            .should('be.visible')
            .type(confirmPass)
    }

    submit() {
        cy.contains(el.changePassButton)
            .should('be.visible')
            .click()
    }
}

export default new ResetPassPage()