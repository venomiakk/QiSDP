describe("User registration and login", () => {
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

  it("creates a new user", function () {
    // Intercept POSTs and set alias when the request body matches our test email
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
    // Wait for the network call that created the user and capture the returned id
    cy.wait("@createUser").then((interception) => {
      const body = interception.response && interception.response.body;
      // try some common shapes to extract id
      const id =
        body && (body.id || body.userId || (body.user && body.user.id));
      if (id) {
        cy.wrap(id).as("userId");
        // persist id across tests during this run so other `it` can access it
        Cypress.env("createdUserId", id);
        // store the request url so delete can be derived if needed
        cy.wrap(interception.request.url).as("createRequestUrl");
      } else {
        // still continue the test but warn
        // (it's fine if API returns different shape; you can adjust extraction above)
        cy.log(
          "Warning: could not extract user id from registration response",
          body
        );
      }
    });

    // After registration the app should show the login submit (or redirect to login)
    cy.get('[data-test="login-submit"]').should("be.visible");
  });

  it("logs in with the created user", function () {
    // Visit and navigate to login page
    cy.visit("http://localhost:4200");
    cy.get('[data-test="nav-sign-in"]').click();

    // Fill login form and submit
    cy.get('[data-test="email"]').type(user.email);
    cy.get('[data-test="password"]').type(user.password);
    cy.get('[data-test="login-submit"]').click();

    // Verify navigation/menu actions after successful login
    cy.get('[data-test="nav-menu"]').click();
    cy.get('[data-test="nav-my-profile"]').click();
    cy.get('[data-test="nav-menu"]').click();
    cy.get('[data-test="nav-sign-out"]').click();

    // After login, attempt to delete the created user if apiBase and id are available
    cy.then(() => {
      const createdId = Cypress.env("createdUserId");
      if (!createdId) {
        cy.log("No createdUserId found; skipping deletion");
        return null;
      }
      const deleteUrl = `http://localhost:8091/users/${createdId}`;
      cy.log("Attempting admin login to obtain access token for deletion");

      // Authenticate as admin to obtain access token
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
});
