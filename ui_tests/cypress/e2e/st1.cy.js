describe("ST1: User registration and login", () => {
  const user = {
    firstName: "Tom",
    lastName: "Kowalski",
    dob: "1990-06-06",
    street: "Street",
    postal_code: "11111",
    city: "City",
    state: "State",
    country: "AW",
    phone: "123456789",
    email: "email@address.com",
    password: "Abrgasef@#$das23",
  };

  it("PT1_1 (positive): creates a new user", function () {
    cy.intercept({ method: "POST", url: "**" }, (req) => {
      if (req.body && req.body.email === user.email) {
        req.alias = "createUser";
      }
      req.continue();
    });

    cy.visit("http://localhost:4200");
    cy.get('[data-test="nav-sign-in"]').click();
    cy.get('[data-test="register-link"]').click();
    cy.get('[data-test="first-name"]').type(user.firstName);
    cy.get('[data-test="last-name"]').type(user.lastName);
    cy.get('[data-test="dob"]').type(user.dob);
    cy.get('[data-test="street"]').type(user.street);
    cy.get('[data-test="postal_code"]').type(user.postal_code);
    cy.get('[data-test="city"]').type(user.city);
    cy.get('[data-test="state"]').type(user.state);
    cy.get('[data-test="country"]').select(user.country);
    cy.get('[data-test="phone"]').type(user.phone);
    cy.get('[data-test="email"]').type(user.email);
    cy.get('[data-test="password"]').type(user.password);
    cy.get('[data-test="register-submit"]').click();

    cy.wait("@createUser").then((interception) => {
      const body = interception.response && interception.response.body;
      const id =
        body && (body.id || body.userId || (body.user && body.user.id));
      if (id) {
        cy.wrap(id).as("userId");
        Cypress.env("createdUserId", id);
        cy.wrap(interception.request.url).as("createRequestUrl");
      } else {
        cy.log(
          "Warning: could not extract user id from registration response",
          body
        );
      }
    });
    cy.get('[data-test="login-submit"]').should("be.visible");
  });

  it("PT1_2 (positive): logs in with the created user", function () {
    cy.visit("http://localhost:4200");
    cy.get('[data-test="nav-sign-in"]').click();
    cy.get('[data-test="email"]').type(user.email);
    cy.get('[data-test="password"]').type(user.password);
    cy.get('[data-test="login-submit"]').click();
    cy.get('[data-test="nav-menu"]').click();
    cy.get('[data-test="nav-my-profile"]').click();
    cy.get('[data-test="nav-menu"]').click();
    cy.get('[data-test="nav-sign-out"]').click();

    cy.then(() => {
      const createdId = Cypress.env("createdUserId");
      if (!createdId) {
        cy.log("No createdUserId found; skipping deletion");
        return null;
      }
      const deleteUrl = `http://localhost:8091/users/${createdId}`;
      cy.log("Attempting admin login to obtain access token for deletion");

      return cy
        .request({
          method: "POST",
          url: "http://localhost:8091/users/login",
          body: {
            email: "admin@practicesoftwaretesting.com",
            password: "welcome01",
          },
          failOnStatusCode: false,
        })
        .then((loginResp) => {
          const token =
            loginResp && loginResp.body && loginResp.body.access_token;
          if (!token) {
            cy.log(
              "Admin login failed or no access_token returned; skipping delete",
              loginResp.body
            );
            return null;
          }

          cy.log("Obtained access token, deleting user at", deleteUrl);
          return cy
            .request({
              method: "DELETE",
              url: deleteUrl,
              headers: {
                Authorization: `Bearer ${token}`,
              },
              failOnStatusCode: false,
            })
            .then((resp) => {
              cy.log("Delete response status", resp.status);
            });
        });
    });
  });

  it("PT1_3 (negative): creates a new user", function () {
    cy.visit("http://localhost:4200");
    cy.get('[data-test="nav-sign-in"]').click();
    cy.get('[data-test="register-link"]').click();
    cy.get('[data-test="first-name"]').type(user.firstName);
    cy.get('[data-test="last-name"]').type(user.lastName);
    cy.get('[data-test="dob"]').type(user.dob);
    cy.get('[data-test="street"]').type(user.street);
    cy.get('[data-test="postal_code"]').type(user.postal_code);
    cy.get('[data-test="city"]').type(user.city);
    cy.get('[data-test="state"]').type(user.state);
    cy.get('[data-test="country"]').select(user.country);
    cy.get('[data-test="phone"]').type(user.phone);
    cy.get('[data-test="email"]').type("customer@practicesoftwaretesting.com");
    cy.get('[data-test="password"]').type(user.password);
    cy.get('[data-test="register-submit"]').click();
    cy.get('[data-test="register-error"]').should("have.class", "alert");
  });

  it("PT1_4 (negative): logs in with the created user", function () {
    cy.visit("http://localhost:4200");
    cy.get('[data-test="nav-sign-in"]').click();
    cy.get('[data-test="email"]').type("wrong@email.com");
    cy.get('[data-test="password"]').type(user.password);
    cy.get('[data-test="login-submit"]').click();
    cy.get('[data-test="login-error"]').should("have.class", "alert");
  });
});
