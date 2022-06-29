Feature: Greeting
  System returns a greeting

  Scenario: Basic usage
    When I call Greeting API
    Then The HTTP status code is 200
    Then The response body is:
      """
      {
        "message": "Hello World!"
      }
      """
