import { Given, When, Then } from "@cucumber/cucumber";
import { expect } from "chai";

Given("Create new cart", async function () {
  const response = await this.apiRequestContext.post("/carts");
  expect(response.status()).to.equal(201);

  const body = await response.json();

  this.cartId = body.id;
});

Given("GET ID of any product", async function () {
  const response = await this.apiRequestContext.get("/products");
  const body = await response.json();

  const product = body.data[0];

  this.productId = product.id;
});

When("Add this product to cart", async function () {
  const endpoint = `/carts/${this.cartId}`;

  const payload = {
    product_id: this.productId,
    quantity: 1,
  };

  const response = await this.apiRequestContext.post(endpoint, {
    data: payload,
  });

  expect(response.status()).to.equal(200);
  this.lastApiResponse = response;
});

Then("Cart should contain {int} product", async function (count) {
  const response = await this.apiRequestContext.get(`/carts/${this.cartId}`);
  const body = await response.json();

  const items = body.cart_items || [];

  expect(items.length).to.equal(count);

  this.cartItems = items;
});

Then("Product in cart should match ID", function () {
  const itemInCart = this.cartItems[0];
  expect(itemInCart.product_id).to.equal(this.productId);
});
