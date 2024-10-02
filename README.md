# Project Overview

This project is a learning project based on the book *Getting MEAN with Mongo, Express, Angular, and Node*. The original code and examples provided in the book are somewhat outdated, so I have had to make several modifications to work with newer versions of libraries, avoid deprecated functions, and take advantage of modern JavaScript features.

## Modifications and Updates

### 1. Migrating from Callbacks to `async/await`
One of the main changes in this project is the transition from the traditional callback-based asynchronous code to the more modern `async/await` syntax. This change was made to improve code readability and maintainability, as well as to conform to best practices in modern Node.js development.

The use of `async/await` allows for better error handling with `try/catch` blocks and makes asynchronous code flow more straightforward, avoiding callback hell and making the logic easier to follow.

### 2. Handling Deprecated Library Functions
Several of the libraries used in the book, such as Mongoose and Express, have undergone updates that resulted in some functions being deprecated or removed entirely. For example:
- Updated Mongoose queries to use promises (with `async/await`) instead of callbacks, as callbacks are now deprecated in many functions.


### 3. Using Newer MongoDB Driver Versions
The book references an older version of MongoDB and its drivers. This project has been updated to use the latest version of the MongoDB driver, which includes changes in how connections are handled and improvements to performance and stability.

### 4. Updated Authentication
The original code relies on some outdated authentication strategies. I have refactored the authentication flow to use JWT (JSON Web Tokens), which is a more secure and scalable method of handling authentication in modern web applications.

### 5. Service Integration Updates
Some third-party services referenced in the book, such as certain APIs, are no longer available or have changed significantly. I have replaced these with modern equivalents or refactored the project to work without them, ensuring that the functionality is preserved.

## New Features

### 1. Unit Tests
I have incorporated unit testing into the project, which was not covered extensively in the book. Using tools like **Mocha**, **Chai**, and **Supertest**, I’ve written unit tests to ensure the reliability of various endpoints in the API. This ensures that the core functionality, such as CRUD operations and business logic, works as expected even after modifications and upgrades.

### 2. Error Handling and Validation
Improved error handling was added throughout the project. This includes using `try/catch` blocks with `async/await`, and validating input data (using libraries like **Joi** for schema validation) to ensure the API handles edge cases properly and provides meaningful error messages to clients.

## Future Work

### 1. Integration Testing
In addition to unit tests, I plan to add integration tests that simulate user interaction with the application. These tests will help ensure that the system behaves as expected when components work together.

### 2. Containerization
Another future improvement would be containerizing the application using Docker, making it easier to deploy across different environments and simplifying the setup for new developers.
