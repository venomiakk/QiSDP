@api
Feature: API of Products

  Scenario: Getting list of products
    When Sending GET request on products api "/products"
    Then Response code from products api should be 200
    And Response should contain products list