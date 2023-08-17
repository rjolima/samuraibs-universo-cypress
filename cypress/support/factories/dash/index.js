import _ from 'underscore'


exports.customer = { //Cliente que vai faze login para pelo app via api para marcar hora.
    name: 'Nikki Sixx',
    email: 'sixx@motleycrue.com',
    password: 'pwd123',
    is_provider: false
}

exports.provider = { // é um barbeiro que vai atender a marção da hora
    name: 'Seu Madruga',
    email: 'ramon@televisa.com',
    password: 'pwd123',
    is_provider: true
}

exports.appointment = {
    hour: _.sample(['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00',])

}
//_.sample vai sortear um valor dentro do array funçao yarn add underscore -D
//Não existe tanta diferença para criação das massas de testa no formato do json e no JS, mas no JS ele deixa flasível para uso do Faker;