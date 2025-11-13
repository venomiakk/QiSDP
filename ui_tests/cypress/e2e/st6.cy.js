describe("Favourite Products", () => {
  const user = {
    email: "customer@practicesoftwaretesting.com",
    password: "welcome01",
  };
  it("ST6_1: Managing favorite products", () => {
    cy.visit("http://localhost:4200/auth/login");
    cy.get('[data-test="email"]').type(user.email);
    cy.get('[data-test="password"]').type(user.password);
    cy.get('[data-test="login-submit"]').click();
    cy.get('[data-test="page-title"]').should("contain", "My account");
    cy.get('[data-test="nav-home"]').click();
    cy.get('[data-test^="product-"] [data-test="product-name"]')
      .first()
      .click();
    cy.get('[data-test="add-to-favorites"]').click();
    cy.get('[data-test="nav-menu"]').click();
    cy.get('[data-test="nav-my-favorites"]').click();
    cy.get('[data-test^="favorite-"]').should("have.length", 4);
    cy.get('div:nth-of-type(4) [data-test="delete"] path').click();
  });
});
