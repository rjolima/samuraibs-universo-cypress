import { el } from './elements'


class Alert{
    haveText(expectedText){
        cy.contains(el.error, expectedText) //usa contains para combinar seletor css a classe alert com o texto tendo em vista que o alert tá em várias validações
            .should('be.visible')
    }
}

export default new Alert