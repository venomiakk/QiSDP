import { Given, When, Then } from "@cucumber/cucumber";
import { expect } from "chai";

When("Sending GET request on products api {string}", async function (endpoint) {
  const response = await this.apiRequestContext.get(endpoint);

  this.lastApiResponse = response;
});

Then("Response code from products api should be {int}", function (statusCode) {
  expect(this.lastApiResponse.status()).to.equal(statusCode);
});

Then("Response should contain products list", async function () {
  const responseBody = await this.lastApiResponse.json();

  expect(responseBody.data).to.be.an("array");
  expect(responseBody.data.length).to.be.greaterThan(0);
});
