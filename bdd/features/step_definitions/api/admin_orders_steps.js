import { Given, When, Then } from "@cucumber/cucumber";
import { expect } from "chai";

Given("I am authenticated as an administrator", async function () {
  const loginPayload = {
    email: "admin@practicesoftwaretesting.com",
    password: "welcome01",
  };

  const response = await this.apiRequestContext.post("/users/login", {
    data: loginPayload,
  });

  expect(response.status()).to.equal(200);

  const body = await response.json();

  this.authToken = body.access_token;
});

When(
  "I send authenticated a GET request to invoices {string}",
  async function (endpoint) {
    const response = await this.apiRequestContext.get(endpoint, {
      headers: {
        Authorization: `Bearer ${this.authToken}`,
      },
    });

    this.lastApiResponse = response;
  }
);

Then(
  "The API response status code from GET invoices should be {int}",
  function (statusCode) {
    expect(this.lastApiResponse.status()).to.equal(statusCode);
  }
);

Then("The response should contain a list of orders", async function () {
  const responseBody = await this.lastApiResponse.json();

  if (responseBody.data) {
    expect(responseBody.data).to.be.an("array");
  } else {

    expect(responseBody).to.be.an("array");
  }
});
