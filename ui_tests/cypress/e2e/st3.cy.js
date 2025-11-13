describe("Editing User Profile", () => {
  const user = {
    email: "customer@practicesoftwaretesting.com",
    password: "welcome01",
  };
  it("PT3_1: User profile", () => {
    cy.visit("http://localhost:4200/auth/login");
    cy.get('[data-test="email"]').type(user.email);
    cy.get('[data-test="password"]').type(user.password);
    cy.get('[data-test="login-submit"]').click();
    cy.get('[data-test="page-title"]').should("contain", "My account");
    cy.get('[data-test="nav-favorites"]').click();
    cy.get("app-favorites").should("exist");
    cy.get('[data-test="nav-menu"]').click();
    cy.get('[data-test="nav-my-profile"]').click();
    cy.get('[data-test="phone"]').type("{selectall}{backspace}");
    cy.get('[data-test="phone"]').type("123123123");
    cy.get('[data-test="update-profile-submit"]').click();
    cy.get('[role="alert"]').should("contain", "Your profile is successfully updated!");
  });
});
