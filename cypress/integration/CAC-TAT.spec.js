// CAC-TAT.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test

/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function () {
    const TRES_SEGUNDOS_EM_MS = 3000
    beforeEach('visita a pagina index', () => {
        cy.visit('src/index.html')
    })

    it.only('encontrando o gato', () => {
        cy.get('#cat')
            .invoke('show')
            .should('be.visible')
        cy.get('#title')
            .invoke('text', 'CAT TAT')
    })
    it('faz uma requisição HTTP', () => {
        cy.request('GET', 'https://cac-tat.s3.eu-central-1.amazonaws.com/index.html')
            .as('cactat')
        cy.get('@cactat')
            .should((res) => {
                const { status, statusText, body } = res
                expect(status).eq(200)
                expect(statusText).eq('OK')
                expect(body).include('CAC TAT')
            })

    })

    it('preenche a area de texto usando o comando invoke', () => {
        const textoLongo = Cypress._.repeat('0123456789', 20)
        cy.get('#open-text-area')
            .invoke('val', textoLongo)
            .should('have.value', textoLongo)
    })

    it('exibe e esconde as mensagens de sucesso e erro usando o .invoke', () => {
        cy.get('.success')
            .should('not.be.visible')
            .invoke('show')
            .should('be.visible')
            .and('contain', 'Mensagem enviada com sucesso.')
            .invoke('hide')
            .should('not.be.visible')
        cy.get('.error')
            .should('not.be.visible')
            .invoke('show')
            .should('be.visible')
            .and('contain', 'Valide os campos obrigatórios!')
            .invoke('hide')
            .should('not.be.visible')
    })

    it('testa a página da política de privavidade de forma independente(Walmyr)', () => {
        cy.visit('src/privacy.html')
        cy.contains('Talking About Testing')
            .should('be.visible')
    })
    it('testa a página da política de privavidade de forma independente(Eu)', () => {
        cy.get('a').should('contain.text', 'Política de Privacidade')
            .should('have.attr', 'href', 'privacy.html')
    })
    it('acessa a página da política de privacidade removendo o target e então clicanco no link', () => {
        cy.get('a').should('contain.text', 'Política de Privacidade').invoke('removeAttr', 'target').click()
        cy.contains('Talking About Testing')
            .should('be.visible')
    })
    Cypress._.times(3, () => { // Lodash
        it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
            cy.get('#privacy a').should('have.attr', 'target', '_blank')
        })
    })
    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
        cy.fixture('example.json').as('arquivoExemplo')
        cy.get('[type="file"]')
            .should('not.have.value')
            .selectFile('@arquivoExemplo', { action: 'drag-drop' })
        cy.get('[type="file"]')
            .should(function ($input) {
                // console.log($input)
                expect($input[0].files[0].name).contains('example.json')
            })
    })
    it('seleciona um arquivo simulando um drag-and-drop', () => {
        cy.get('[type="file"]')
            .should('not.have.value')
            .selectFile('./cypress/fixtures/example.json', { action: 'drag-drop' })
        cy.get('[type="file"]')
            .should(function ($input) {
                // console.log($input)
                expect($input[0].files[0].name).to.equal('example.json')
            })
    })
    it('seleciona um arquivo da pasta fixtures', () => {
        cy.get('[type="file"]')
            .should('not.have.value')
            .selectFile('./cypress/fixtures/example.json')
        cy.get('[type="file"]')
            .should(function ($input) {
                // console.log($input)
                expect($input[0].files[0].name).to.equal('example.json')
            })
    })

    it('marca ambos checkboxes, depois desmarca o último', () => {
        cy.get('input[type="checkbox"]')
            .check()
            .should('be.checked')
        cy.get('input[type="checkbox"]')
            .last()
            .uncheck()
            .should('not.be.checked')
    })
    it('marca cada tipo de atendimento com cy.Each', () => {
        cy.get('[type="radio"')
            .should('have.length', 3)
            .each(($radio) => {
                cy.wrap($radio).check()
                cy.wrap($radio).should('be.checked')
            })
    })
    it('marca cada tipo de atendimento', () => {
        cy.contains('Tipo de atendimento').should('be.visible')
        cy.get('[type="radio"][value="ajuda"]')
            .check()
            .should('have.value', 'ajuda')
            .should('be.checked')
        cy.get('[type="radio"][value="elogio"]')
            .check()
            .should('have.value', 'elogio')
            .should('be.checked')
        cy.get('[type="radio"][value="feedback"]')
            .check()
            .should('have.value', 'feedback')
            .should('be.checked')
    })
    it('marca o tipo de atendimento "Feedback"', () => {
        cy.get('[type="radio"][value="feedback"]')
            .check()
            .should('have.value', 'feedback')
    })
    it('seleciona um produto (YouTube) por seu texto', () => {
        cy.get('select')
            .select('youtube')
            .should('have.value', 'youtube')
    })
    it('seleciona um produto (Mentoria) por seu valor (value)', () => {
        cy.get('select')
            .select('mentoria')
            .should('have.value', 'mentoria')
    })
    it('seleciona um produto (Blog) por seu índice', () => {
        cy.get('select')
            .select(1)
            .should('have.value', 'blog')
    })
    it('verifica o título da aplicação', function () {
        cy.title().should('eq', 'Central de Atendimento ao Cliente TAT')
    })
    it('Deve manter o campo de telefone vazio caso sejam digitados caracteres não-numéricos', function () {
        cy.get('#phone').type('teste1')
            .should('be.empty')
    })
    it('envia o formuário com sucesso usando um comando customizado', function () {
        cy.fillMandatoryFieldsAndSubmit()
    })
    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function () {
        cy.clock()
        cy.contains('Enviar').click()
        cy.tick(TRES_SEGUNDOS_EM_MS)
        cy.get('.error')
            .should('contain', 'Valide os campos obrigatórios!')
    })
    it('preenche e limpa os campos nome, sobrenome, email e telefone', function () {
        cy.get('#firstName')
            .type('Elcio', { delay: 0 })
        cy.get('#lastName')
            .type('Dalosto', { delay: 50 })
        cy.get('#email')
            .type('emailteste@mail.com', { delay: 100 })
        cy.get('#phone')
            .type('51987654321')

        cy.get('#firstName')
            .should('have.value', 'Elcio')
            .clear()
            .should('have.value', '')
        cy.get('#lastName')
            .should('have.value', 'Dalosto')
            .clear()
            .should('have.value', '')
        cy.get('#email')
            .should('have.value', 'emailteste@mail.com')
            .clear()
            .should('have.value', '')
        cy.get('#phone')
            .should('have.value', '51987654321')
            .clear()
            .should('have.value', '')
    })
    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function () {
        cy.clock()
        cy.get('#email')
            .type('emailteste@mail.com', { delay: 0 })
        cy.get('[type="checkbox"][value="phone"').check()
        cy.contains('Enviar').click()
        cy.tick(TRES_SEGUNDOS_EM_MS)
        cy.get('.error')
            .should('contain', 'Valide os campos obrigatórios!')
    })
    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function () {
        cy.clock()
        cy.get('#email')
            .type('emailteste!mail.com', { delay: 0 })
        cy.contains('Enviar').click()
        cy.get('.error')
            .should('contain', 'Valide os campos obrigatórios!')
            .should('be.visible')
            .tick(TRES_SEGUNDOS_EM_MS)
        cy.get('.error')
            .should('not.be.visible')
    })
    it('preenche os campos obrigatórios e envia o formulário', function () {
        const textoLongo = Cypress._.repeat('0123456789', 20)
        cy.get('#firstName')
            .type('Elcio', { delay: 0 })
        cy.get('#lastName')
            .type('Dalosto', { delay: 50 })
        cy.get('#email')
            .type('emailteste@mail.com', { delay: 100 })
        cy.get('#open-text-area')
            .type(textoLongo, { delay: 0 })
        // cy.get('#open-text-area')
        //     .invoke('val', textoLongo)
        //     .should('have.value', textoLongo)

        cy.contains('Enviar').click()
        cy.get('.success > strong')
            .should('be.visible')
            .contains('Mensagem enviada com sucesso.')
        cy.get('#firstName')
            .should('be.empty')
        cy.get('#lastName')
            .should('be.empty')
        cy.get('#email')
            .should('be.empty')
        cy.get('#open-text-area')
            .should('be.empty')
    })
})
