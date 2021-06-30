import { User } from "../../../src/models";
import { isMobile } from "../../support/utils";

describe("User Sign-up and Login", function () {
  beforeEach(function () {
    cy.task("db:seed");

    cy.server();
    cy.route("POST", "/users").as("signup");
    cy.route("POST", "/bankAccounts").as("createBankAccount");
  });

  it("should redirect unauthenticated user to signin page", function () {
    cy.visit("/personal");
    cy.location("pathname").should("equal", "/signin");
    cy.visualSnapshot("Redirect to SignIn");
  });

  it("should remember a user for 30 days after login", function () {
    cy.database("find", "users").then((user: User) => {
      cy.login(user.username, "s3cret", true);
    });

    // Verify Session Cookie
    cy.getCookie("connect.sid").should("have.property", "expiry");

    // Logout User
    if (isMobile()) {
      cy.getBySel("sidenav-toggle").click();
    }
    cy.getBySel("sidenav-signout").click();
    cy.location("pathname").should("eq", "/signin");
    cy.visualSnapshot("Redirect to SignIn");
  });

  it("should allow a visitor to sign-up, login, and logout", function () {
    const userInfo = {
      firstName: "Bob",
      lastName: "Ross",
      username: "PainterJoy90",
      password: "s3cret",
    };

    /*
    Hints:
    - Use cy.getBySel("<value in data-test>") in CSS to get the selector
    - Use implemented functions in commands.ts like login that you can call directly like cy.login...
    - Pre-defined cy.route can be reused and used in cy.wait("@<routeAlias>")
    - If you don't do exercise #3, you can comment out the logout user code
    - But keep the logout user code if are able to complete Exercise #3 Onboarding
    */

    cy.visit("/");

    // Exercise 1: Sign-up User
    /*
    1. Click on sign-up link
    2. Check sign-up title containing Sign-up
    3. Enter first name --- Hint: user userInfo above
    4. Enter last name
    5. Enter user name
    6. Enter password
    7. Confirm password
    8. Click submit button
    9. Call cy.wait using signup route - hint on line 9
    */

    // Exercise 2: Login User
    /* Use login in commands (in support folder), with username & password */

    // Bonus Exercise: Onboarding
    /*
    1. Check visibility of onboarding dialog
    2. Check existence of top navigation notifications count
    3. Click on user onboarding next button
    4. Check onboarding dialog title if it contains Create Bank Account
    5. Enter bankname - Spendesk Bank
    6. Enter account number - 123456789
    7. Enter routing number - 987654321
    8. Click on submit button
    9. Add cy.wait with createBankAccount route
    10. Check on dialog title  - "Finished"
    11. Check on dialog content - "You're all set!"
    12. Click on next button
    13. Check if transaction list is available
    */

    //Logout User
    // if (isMobile()) {
    //   cy.getBySel("sidenav-toggle").click();
    // }
    // cy.getBySel("sidenav-signout").click();
    // cy.location("pathname").should("eq", "/signin");
  });

  it("should display login errors", function () {
    cy.visit("/");

    /* Bonus Exercise: Login errors
    1. Check "Username is required" error
    2. Check "Password must contain at least 4 characters" error
    3. Check submit button is disabled if either or both username and password are empty
    */
  });
});
