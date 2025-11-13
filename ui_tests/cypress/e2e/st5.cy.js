describe("Products page overview", () => {
  const user = {
    email: "customer@practicesoftwaretesting.com",
    password: "welcome01",
  };

  beforeEach(() => {
    cy.visit("http://localhost:4200/auth/login");
    cy.get('[data-test="email"]').type(user.email);
    cy.get('[data-test="password"]').type(user.password);
    cy.get('[data-test="login-submit"]').click();
    cy.get('[data-test="page-title"]').should("contain", "My account");
  });

  it("PT5_1: Listing products", () => {
    cy.get('[data-test="nav-home"]').click();
    cy.get('[data-test^="product-"] img.card-img-top').first().click();
    cy.get('[data-test="product-name"').should("exist");
    cy.get('[data-test="nav-home"]').click();
  });

  it("PT5_2: Filters", function () {
    cy.get('[data-test="nav-home"]').click();
    cy.get('[data-test="filters"] span.ngx-slider-pointer-max').click();
    cy.get('[data-test="search-query"]').type("hammer");
    cy.get('[data-test="search-submit"]').click();
    cy.get('[data-test^="product-"] img.card-img-top').first().click();
    cy.get('[data-test="product-name"').should("exist");
  });

  it("PT5_3: Sorting", function () {
    cy.get('[data-test="nav-home"]').click();
    cy.get('[data-test^="product-"]')
      .first()
      .find('[data-test="product-name"]')
      .should("contain", "Pliers");
    cy.get('[data-test="sort"]').select("name,asc");
    cy.get('[data-test^="product-"]')
      .first()
      .find('[data-test="product-name"]')
      .should("contain", "Adjustable Wrench");
  });
});
