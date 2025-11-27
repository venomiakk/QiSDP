Feature: Admin Dashboard Reports

  Scenario: Verify that sales charts are displayed on the dashboard
    Given I am on the login page at "http://localhost:4200/auth/login"
    When I log in with admin credentials
    Then I should be redirected to the admin dashboard
    And I navigate to the "Statistics" report via the menu
    And I should see the "Statistics" header