
import loginPage from '../support/pages/login'
import dashPage from '../support/pages/dash'

describe('Login', function () {
    context('Quando o usuário é muito bom', function () {

        const user = {
            name: 'Jair Bolsonaro',
            email: 'jbolsonaro@samuraibs.com',
            password: 'pwd123',
            is_provider: true //importante pra fazer o cadastro via API
        }

        before(function () {
            cy.postUser(user)
        })

        it('Deve logar com sucesso', function () {
            loginPage.go()
            loginPage.form(user)
            loginPage.submit()

            dashPage.header.userLoggedIn(user.name)

        })
    })
});