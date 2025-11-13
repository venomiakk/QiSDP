describe("Making Order", () => {
  const user = {
    email: "customer@practicesoftwaretesting.com",
    password: "welcome01",
  };

  it("PT8_1: Full order", () => {
    cy.visit("http://localhost:4200/auth/login");
    cy.get('[data-test="email"]').type(user.email);
    cy.get('[data-test="password"]').type(user.password);
    cy.get('[data-test="login-submit"]').click();
    cy.get('[data-test="page-title"]').should("contain", "My account");
    cy.get('[data-test="nav-home"]').click();
    cy.get('[data-test^="product-"] img.card-img-top').first().click();
    cy.get('[data-test="add-to-cart"]').click();
    cy.get('[data-test="nav-cart"] path').click();
    cy.get('[data-test="proceed-1"]').click();
    cy.get('[data-test="proceed-2"]').click();

    cy.get('[data-test="state"]').type("State");

    cy.get('[data-test="postal_code"]').type("11111");
    cy.get('[data-test="proceed-3"]').click();
    cy.get('[data-test="payment-method"]').select("cash-on-delivery");
    cy.get('[data-test="finish"]').click();
    cy.get('[data-test="payment-success-message"]').should(
      "contain",
      "Payment was successful"
    );
  });
});
