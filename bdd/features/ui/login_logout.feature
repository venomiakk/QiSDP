@ui
Feature: Login to Toolshop and Logout

  Scenario: Login and logout
    Given User is on login page "http://localhost:4200/auth/login"
    When User types email on login page "customer@practicesoftwaretesting.com"
    And User types password on login page "welcome01"
    And User clicks the login button
    Then User should see the header "My account"
    When User clicks logout
    Then User should see the login page