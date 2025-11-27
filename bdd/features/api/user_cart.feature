@api @cart
Feature: API cart managing

  Scenario: Create cart and add product
    Given Create new cart
    And GET ID of any product
    When Add this product to cart
    Then Cart should contain 1 product
    And Product in cart should match ID