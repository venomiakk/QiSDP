import { Given, When, Then } from "@cucumber/cucumber";
import { expect } from "chai";
import { expect as expectPW } from "@playwright/test";

Given("I am on the login page at {string}", async function (url) {
  await this.page.goto(url);
});

When("I log in with admin credentials", async function () {
  await this.page.fill("#email", "admin@practicesoftwaretesting.com");
  await this.page.fill("#password", "welcome01");
  await this.page.click('input[value="Login"]');
});

Then("I should be redirected to the admin dashboard", async function () {
  await expectPW(this.page).toHaveURL(/.*dashboard/);

  const header = await this.page.locator("h1").innerText();
  expect(header).to.equal("Sales over the years");
});

Then(
  "I navigate to the {string} report via the menu",
  async function (reportName) {
    const userMenu = this.page.locator("#menu");
    await userMenu.click();

    await this.page.locator("#reportsDropdown").hover();

    await this.page
      .locator(`[data-test="nav-admin-${reportName.toLowerCase()}"]`)
      .click();
  }
);

Then("I should see the {string} header", async function (statName) {
  const statCard = this.page.locator(`[data-test="page-title"]`);
  await expectPW(statCard).toBeVisible();
});
