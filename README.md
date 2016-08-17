# Pizza Maker

## User Stories

- As a user I can create a new Pizza.
- As a user while creating a Pizza I can add toppings to the pizza.
    + Toppings include pepperoni, sausage, & cheese
- As a user I can submit the pizza to be created.
- As a user I can see pizzas I have created.

## Production updates

In order to begin transforming this from prototype into a production application, we'd need:

- API integration
    + Right now all data is stored locally on the client's machine. Ultimately this would need to be stored in a backend database and accessible via API as well
- Authorization
    + Once data is no longer just on the client's machine, we need a way to differentiate users (and their pizzas), as well as ensure only authorized users can make a pizza
- Integration (E2E) testing
    + Once an app begins to have an API integration, and multiple workflows, it's best to begin adding some integration testing (protractor, selenium, etc) in addition to unit tests to ensure the app is working as a whole.