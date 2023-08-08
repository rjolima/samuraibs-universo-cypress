
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

    context('Quando usuário é bom, mas a senha está incorreta', function () {

        let user = { //não vai usar const pq não pode alterar, então usa let para poder alterar senha de login
            name: 'Michele Bolsonaro',
            email: 'mbolsonaro@samuraibs.com',
            password: 'pwd123',
            is_provider: true
        }

        before(function () {
            cy.postUser(user).then(function () { //função then é um callback do JS, usada para não executar o processo assincrono, fazerndo nesse caso um processo de cada vez
                user.password = 'abc123'
            })
        })

        it('Deve notificar erro de credenciais', function () {
            loginPage.go()
            loginPage.form(user)
            loginPage.submit()

            const message = 'Ocorreu um erro ao fazer login, verifique suas credenciais.'
            loginPage.toast.shouldHaveTest(message)

        })
    })

    context('Quando o email é incorreto', function () {
        const emails = [
            'dino.com.br',
            'gmail.com',
            '@gmail.com',
            '@',
            'dino@',
            '123456',
            '!@)(*¨&',
            'teste023'
        ]

        //Nesse aplicação se usar somente o before ele não repete a execução do teste, falhando no segundo.
        beforeEach(function () { 
            loginPage.go()

        })

        emails.forEach(function (email) {
            it('Não deve logar com email: ' + email, function () {
                const user = { email: email, password: 'pdw123' }

                loginPage.form(user)
                loginPage.submit()
                loginPage.alertHaveText('Informe um email válido')
            })
        })
    })

    context.only('Quando não preenche nenhum dos campos', function () {
        
        const alertMessages = [
            'E-mail é obrigatório',
            'Senha é obrigatória'
        ]

        beforeEach(function () {
            loginPage.go()
            loginPage.submit()
        })

        alertMessages.forEach(function(alert) {
            it('deve exibir ' + alert.toLowerCase(), function () {
                loginPage.alert.haveText(alert)
            })
        })
    })
})