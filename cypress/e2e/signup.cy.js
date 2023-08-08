import signupPage from '../support/pages/signup'

describe('Cadastro', function () {
    context('quando usuário é novato', function () {
        const user = {
            name: 'Rodrigo Lima',
            email: 'dinno.lima@gmail.com',
            password: 'pwd123'
        }

        before(function () {
            cy.task('removeUser', user.email)
                .then(function (result) {
                    console.log(result)
                })
        })

        it('deve cadastrar com sucesso', function () {
            signupPage.go()
            signupPage.form(user)
            signupPage.submit()
            signupPage.toast.shouldHaveTest('Agora você se tornou um(a) Samurai, faça seu login para ver seus agendamentos!')

        })
    })

    context('Quando e-mail já exite!', function () {
        const user = {
            name: 'Rodrigo Lima 02',
            email: 'dinno2@samuraibs.com',
            password: 'pwd123',
            is_provider: true
        }

        before(function () {
            cy.postUser(user)
        })

        it('não deve cadastrar o usuário', function () {
            signupPage.go()
            signupPage.form(user)
            signupPage.submit()
            signupPage.toast.shouldHaveTest('Email já cadastrado para outro usuário.')
        })
    })

    context('quando email é incorreto', function () {
        const user = {
            name: 'Rodrigo Lima login',
            email: 'dinno2.samuraibs.com',
            password: 'pwd123',
        }

        it('deve exibir mensagem de alerta', function () {
            signupPage.go()
            signupPage.form(user)
            signupPage.submit()
            signupPage.alert.haveText('Informe um email válido')

        })
    })

    context('Quando a senha é muito curta', function () {

        const passwords = ['1', '2b', '3$e', '4#rd', '5rtss',]

        beforeEach(function () {
            signupPage.go()
        })

        passwords.forEach(function (p) {
            it('Não deve cadastrar com a senha: ' + p, function () {

                const user = {
                    name: 'Rodrigo Senha',
                    email: 'rsenha@gmail.com',
                    password: p
                }

                signupPage.form(user)
                signupPage.submit()
            })
        })

        afterEach(function () {
            signupPage.alert.haveText('Pelo menos 6 caracteres')
        })
    })

    context('Quando não preenche nenhum dos campos', function () {
        
        const alertMessages = [
            'Nome é obrigatório',
            'E-mail é obrigatório',
            'Senha é obrigatória'
        ]

        beforeEach(function () {
            signupPage.go()
            signupPage.submit()
        })

        alertMessages.forEach(function(alert) {
            it('deve exibir ' + alert.toLowerCase(), function () {
                signupPage.alert.haveText(alert)
            })
        })
    })
})
