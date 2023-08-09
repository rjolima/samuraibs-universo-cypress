import signupPage from '../support/pages/signup'

describe('Cadastro', function () {

    before(function(){ //Callback then 
        cy.fixture('signup').then(function(signup){
            this.success = signup.success
            this.email_dup = signup.email_dup //passa variável global this para poder usar a massa de teste
            this.email_inv = signup.email_inv
            this.shor_password = signup.shor_password
        })
    })

    context('quando usuário é novato', function () {
        before(function () {
            cy.task('removeUser', this.success.email) //Uso da massa fixa no json deve ser usada qnt tiver muitos campos, com uma quantidade pequena pode ser mantido a const user
                .then(function (result) {
                    console.log(result)
                })
        })

        it('deve cadastrar com sucesso', function () {
            signupPage.go()
            signupPage.form(this.success)
            signupPage.submit()
            signupPage.toast.shouldHaveTest('Agora você se tornou um(a) Samurai, faça seu login para ver seus agendamentos!')

        })
    })

    context('Quando e-mail já exite!', function () {
        before(function () {
            cy.postUser(this.email_dup)
        })

        it('não deve cadastrar o usuário', function () {
            signupPage.go()
            signupPage.form(this.email_dup)
            signupPage.submit()
            signupPage.toast.shouldHaveTest('Email já cadastrado para outro usuário.')
        })
    })

    context('quando email é incorreto', function () {
        it('deve exibir mensagem de alerta', function () {
            signupPage.go()
            signupPage.form(this.email_inv)
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

                this.shor_password.password = p    

                signupPage.form(this.shor_password)
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
