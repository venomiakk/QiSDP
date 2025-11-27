@api
Feature: Admin Order Management

  Scenario: Successfully retrieving all orders as an admin
    Given I am authenticated as an administrator
    When I send authenticated a GET request to invoices "/invoices"
    Then The API response status code from GET invoices should be 200
    And The response should contain a list of orders