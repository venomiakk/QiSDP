@ui @admin @categories
Feature: Managing product categories

  Scenario: Full list of categories in administrator page
    Given I am on the login page to get to categories "http://localhost:4200/auth/login"
    When I log in with admin credentials to get to categories menu
    And I navigate to the "Categories" section via the menu
    Then I should see the categories table
    And The table should contain the "Hand Tools" category