Feature: Payment functionality tests

  Background:
    Given User navigates to the application
    And User log in with "smrev" and "Osv@1234"

  Scenario: Create a payment successfully
    When User navigates to the payments tab
    And User clicks on the transfer sub-nav item
    And User clicks on the beneficiary sub-nav item
    And User clicks on create
    And User fills the payment form with valid details
    And User submits the payment
    Then The payment should be listed in the payments page
