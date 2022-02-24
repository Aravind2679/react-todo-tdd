describe("test todo list", () => {

    it("should render the todo list", () => {
        cy.visit("http://localhost:3000");

        // // Toggle task status
        cy.get('[data-testid="todo-Relax"]').click();
        cy.get('[data-testid="todo-class-Relax"]').should("have.class", "task completed");

        // // Add new task
         cy.get('[data-testid="todo-add"]').type("Code{enter}");
       //  cy.get('[data-testid="todo-add-submit"]').click();
         cy.get('[data-testid="todo-add"]').should("have.value", "");
         cy.contains("Code");

        // // Edit task
         cy.get('[data-testid="todo-edit-Code"]').click();
         cy.get('[data-testid="todo-edit-input-Code"]').type("Work{enter}");
        // cy.get('[data-testid="save-button-todo-0"]').click();
         cy.contains("Work");

        // // Delete task
         cy.get('[data-testid="delete-button-Work"]').click();
         cy.contains("Work").should("not.exist");

        // // Filter tasks
         cy.contains("Pending task(s) (0)");
    });
});