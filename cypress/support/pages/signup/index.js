import { el } from './elements'
import toast from '../../components/toast'
import alert from '../../components/alert'

class SignupPage {

    constructor() {
        this.toast = toast //cria objeto para ter acesso ao componente
        this.alert = alert
    }
    
    go() {
        cy.visit('/signup')
        cy.contains(el.title)
            .should('be.visible')
    }

    form(user) {
        cy.get(el.name).type(user.name)
        cy.get(el.email).type(user.email)
        cy.get(el.password).type(user.password)

        //simula alteração do status code maqueando o usuário que já está cadastrado com retorno da API
        //Não ser para teste integrado
        // cy.intercept('POST', '/users', {
        //     statusCode: 200
        // }).as('postUser')

        //cy.wait('@postUser')
    }
    
    submit() {
        cy.contains(el.signupButton).click()
    }
}

export default new SignupPage();