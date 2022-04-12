describe('My First Test', () => {
  it('Visits the initial project page', () => {
    cy.visit('/')
    cy.contains('Todos')
    cy.contains('Add Task')
  })
})
