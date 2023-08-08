import { el } from './elements'

class LoginPage {

    // constructor() {
    //     this.toast = toast
    //     this.alert = alert
    // }

    go(){
        cy.visit('/')
    }

    form(user) {
        cy.get(el.email).type(user.email)
        cy.get(el.password).type(user.password)
    }

    submit() {
        cy.contains(el.signIn).click()
    }
}

export default new LoginPage()