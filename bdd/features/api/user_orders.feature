@api @orders
Feature: History of client's orders

  Scenario: Client gets list of his orders
    Given I am logged in as a client with email "customer@practicesoftwaretesting.com"
    When I send a request to retrieve my orders
    Then The response status should be 200
    And I should receive a list containing only my orders