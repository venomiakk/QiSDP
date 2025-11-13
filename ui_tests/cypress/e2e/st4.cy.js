describe("Sending Message", () => {
  const user = {
    email: "customer@practicesoftwaretesting.com",
    password: "welcome01",
  };

  it("PT4_1: Send message", () => {
    cy.visit("http://localhost:4200/auth/login");
    cy.get('[data-test="email"]').type(user.email);
    cy.get('[data-test="password"]').type(user.password);
    cy.get('[data-test="login-submit"]').click();
    cy.get('[data-test="page-title"]').should("contain", "My account");
    cy.get('[data-test="nav-contact"]').click();
    cy.get('[data-test="subject"]').select("customer-service");
    cy.get('[data-test="message"]').type(
      "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"
    );
    cy.get('[data-test="contact-submit"]').click();
    cy.get('[role="alert"]').should(
      "contain",
      "Thanks for your message! We will contact you shortly."
    );
    cy.get('[data-test="nav-menu"]').click();
    cy.get('[data-test="nav-my-messages"]').click();
    cy.get("a.btn").first().click();
    cy.get(".card-header").first().should("exist");
  });
});
