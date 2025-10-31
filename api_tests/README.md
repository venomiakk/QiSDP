# API Tests

## How To Run

```bash
npm install newman
```

```bash
npm run test-products
npm run test-users
```

## Tests List

### `Users` module tests

#### collection: `tool-shop-users-dev-tests`

| Test Set Name                              | Tests within the Set                                                                                                                      | Category                                |
| :----------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------- | :-------------------------------------- |
| `login`                                    | `Login successful`                                                                                                                        | _Setup (Authentication)_                |
| `registerUserPositiveTests`                | `Status code should be 201 Created`<br>`Response body should match the user schema`<br>`Header checks`                                    | **Basic positive tests (happy paths)**  |
| `registerUserInvalidPasswordNegativeTests` | `Status code should be 422 Unprocessable Entity`<br>`Response should contain password field with error messages`<br>`Header checks`       | **Negative testing with invalid input** |
| `registerUserInvalidEmailNegativeTests`    | `Status code should be 422 Unprocessable Entity`<br>`Response should contain email field with error messages`<br>`Header checks`          | **Negative testing with valid input**   |
| `getUserPositiveTests`                     | `Status code should be 200 OK`<br>`Response should match the user schema`<br>`Header checks`                                              | **Basic positive tests (happy paths)**  |
| `getUserInvalidIdNegativeTests`            | `Status code should be 404 Not Found`<br>`Response should contain an error message`<br>`Header checks`                                    | **Negative testing with invalid input** |
| `getUserTooLongIdDestructiveTests`         | `Status code should be 414 URI Too Long`<br>`Header checks`                                                                               | **Destructive testing**                 |
| `updateUserPositiveTests`                  | `Status code should be 200 OK`<br>`Response should contain success property with value true`<br>`Header checks`                           | **Basic positive tests (happy paths)**  |
| `updateUserIvalidIdNegativeTests`          | `Status code should be 404 Not Found`<br>`Response should contain an error message`<br>`Header checks`                                    | **Negative testing with invalid input** |
| `updateUserInvalidPasswordNegativeTests`   | `Status code should be 422 Unprocessable Entity`<br>`Response should contain password field with error messages`<br>`Header checks`       | **Negative testing with invalid input** |
| `updateUserInvalidEmailNegativeTests`      | `Status code should be 409 Conflict`<br>`Response should contain email field with error messages`<br>`Header checks`                      | **Negative testing with valid input**   |
| `deleteUserPositiveTests`                  | `Status code should be 204 No Content`<br>`Header checks`                                                                                 | **Basic positive tests (happy paths)**  |
| `deleteUserInvalidIdNegativeTests`         | `Status code should be 422 Unprocessable Entity`<br>`Response should contain the correct error message for invalid id`<br>`Header checks` | **Negative testing with invalid input** |

---

### `Products` module tests

#### collection: `tool-shop-products-dev-tests`

| Test Set Name                                 | Tests within the Set                                                                                                                      | Category                                |
| :-------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------- | :-------------------------------------- |
| `login`                                       | `Login successful`                                                                                                                        | _Setup (Authentication)_                |
| `setup_category`                              | `Category setup successful and variables saved`                                                                                           | _Setup (Data Creation)_                 |
| `setup_brand`                                 | `Brand setup successful and variables saved`                                                                                              | _Setup (Data Creation)_                 |
| `setup_image`                                 | `Image setup successful and variables saved`                                                                                              | _Setup (Data Retrieval)_                |
| `addProductPositiveTests`                     | `Status code should be 201 Created`<br>`Response should match the product schema`<br>`Header checks`                                      | **Basic positive tests (happy paths)**  |
| `addProductInvalidPriceNegativeTests`         | `Status code should be 422 Unprocessable Entity`<br>`Response should contain a price field with error messages`<br>`Header checks`        | **Negative testing with invalid input** |
| `addProductInvalidImageIdNegativeTests`       | `Status code should be 422 Unprocessable Entity`<br>`Response should contain product_image_id with error messages`<br>`Header checks`     | **Negative testing with invalid input** |
| `addProductTooLongNameDestructiveTests`       | `Status code should be 422 Unprocessable Entity`<br>`Response should contain name field with error messages`<br>`Header checks`           | **Destructive testing**                 |
| `getProductPositiveTests`                     | `Status code should be 200 OK`<br>`Response should match the product schema`<br>`Header checks`                                           | **Basic positive tests (happy paths)**  |
| `getProductInvalidIdNegativeTests`            | `Status code should be 404 Not Found`<br>`Response should contain a message property`<br>`Header checks`                                  | **Negative testing with invalid input** |
| `getProductTooLongIdDestructiveTests`         | `Status code should be 414 URI To Long`<br>`Header checks`                                                                                | **Destructive testing**                 |
| `updateProductPositiveTests`                  | `Status code should be 200 OK`<br>`Response should contain success property with value true`<br>`Header checks`                           | **Basic positive tests (happy paths)**  |
| `updateProductInvalidIdNegativeTests`         | `Status code should be 404 Not Found`<br>`Response should contain succes property with value false`<br>`Header checks`                    | **Negative testing with invalid input** |
| `updateProductInvalidPriceNegativeTests`      | `Status code should be 422 Unprocessable Entity`<br>`Response should have a success property with value false`<br>`Header checks`         | **Negative testing with invalid input** |
| `updateProductInvalidCategoryIdNegativeTests` | `Status code should be 422 Unprocessable Entity`<br>`Response should have a success property with value false`<br>`Header checks`         | **Negative testing with invalid input** |
| `deleteProductPositiveTests`                  | `Status code should be 204 No Content`<br>`Header checks`                                                                                 | **Basic positive tests (happy paths)**  |
| `deleteProductInvalidIdNegativeTests`         | `Status code should be 422 Unprocessable Fntity`<br>`Response should contain the correct error message for invalid id`<br>`Header checks` | **Negative testing with invalid input** |
| `teardown_brand`                              | `Category teardown successful`                                                                                                            | _Teardown (Cleanup)_                    |
| `teardown_category`                           | `Category teardown successful`                                                                                                            | _Teardown (Cleanup)_                    |

---
