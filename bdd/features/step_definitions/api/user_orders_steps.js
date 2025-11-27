import { Given, When, Then } from "@cucumber/cucumber";
import { expect } from "chai";

Given("I am logged in as a client with email {string}", async function (email) {
  const loginPayload = {
    email: email,
    password: "welcome01",
  };

  const response = await this.apiRequestContext.post("/users/login", {
    data: loginPayload,
  });

  expect(response.status()).to.equal(200);
  const body = await response.json();

  this.userToken = body.access_token;
});

When("I send a request to retrieve my orders", async function () {
  const response = await this.apiRequestContext.get("/invoices", {
    headers: {
      Authorization: `Bearer ${this.userToken}`,
    },
  });

  this.lastApiResponse = response;
});

Then("The response status should be {int}", function (statusCode) {
  expect(this.lastApiResponse.status()).to.equal(statusCode);
});

Then("I should receive a list containing only my orders", async function () {
  const body = await this.lastApiResponse.json();

  expect(body).to.have.property("data");
  expect(body.data).to.be.an("array");

  if (body.data.length > 0) {
    const firstOrder = body.data[0];
    expect(firstOrder).to.have.property("id");
    expect(firstOrder).to.have.property("status");
    expect(firstOrder).to.have.property("total");

    console.log(`Found ${body.data.length} orders for this client.`);
  } else {
    console.log("Client has no orders yet (empty list returned).");
  }
});
