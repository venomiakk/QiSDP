const { Given, When, Then } = require("@cucumber/cucumber");
const { expect: expectPW } = require("@playwright/test"); // Pamiętaj o aliasie!

Given(
  "I am on the login page to get to categories {string}",
  async function (url) {
    await this.page.goto(url);
  }
);

When(
  "I log in with admin credentials to get to categories menu",
  async function () {
    await this.page.fill("#email", "admin@practicesoftwaretesting.com");
    await this.page.fill("#password", "welcome01");
    await this.page.click('input[value="Login"]');
  }
);

When(
  "I navigate to the {string} section via the menu",
  async function (sectionName) {
    await this.page.locator("#menu").click();

    await this.page.locator("[data-test='nav-admin-categories']").click();
  }
);

Then("I should see the categories table", async function () {

  const table = this.page.locator("table.table"); 

  await expectPW(table).toBeVisible();
});

Then(
  "The table should contain the {string} category",
  async function (categoryName) {

    const cell = this.page.getByRole("cell", { name: categoryName });

    await expectPW(cell).toBeVisible();

  }
);
