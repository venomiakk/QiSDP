import { Given, When, Then } from "@cucumber/cucumber";
import { expect } from "chai";

Given("User is on login page {string}", async function (url) {
  // 'this.page' comes from world.js
  await this.page.goto(url);
});

When("User types email on login page {string}", async function (email) {
  await this.page.fill("#email", email);
});

When("User types password on login page {string}", async function (password) {
  await this.page.fill("#password", password);
});

When("User clicks the login button", async function () {
  await this.page.click('input[value="Login"]');
});

Then("User should see the header {string}", async function (expectedText) {
  const headerText = await this.page.locator("h1").innerText();

  expect(headerText).to.include(expectedText);
});

When("User clicks logout", async function () {
  await this.page.click("#menu");
  await this.page.click("[data-test='nav-sign-out']");
});

Then("User should see the login page", async function () {
  await this.page.waitForSelector("#email", { timeout: 5000 });
  const visible = await this.page.isVisible("#email");
  expect(visible).to.be.true;
});
