A RESTful API built with Node.js and Express for managing books and reviews, featuring secure JWT-based authentication.

Tech Stack
Backend: Node.js, Express.js
Database: Mysql
Authentication: JWT (JSON Web Tokens)
Other Tools: nodemon

Features
🔐 Authentication
POST /signup – Register a new user
http://localhost:3000/user/sign-up

POST /login – Login and receive a JWT token
http://localhost:3000/user/login

POST /books – Add a new book 
http://localhost:3000/posts

GET /books – List all books 
http://localhost:3000/posts


GET /books/:id – View a book by ID, with:
http://localhost:3000/posts/:id

POST  /books/review/:id comments 
http://localhost:3000/comments

GET User mapping With address
http://localhost:3000/test/associations



steps for setup of project
npm install
install all the dependency
PORT=3000
DB_URL=mongodb://localhost:27017/bookdb
JWT_SECRET=your_secret_key


1. Comment Controller (comment.controller.js)
Purpose
Manages CRUD operations for comments related to posts.
Features
Create comment (save): Validates input, verifies post existence, creates a comment.
Get a comment by ID (show).
Get all comments (index).
Update a comment (update): Updates comment text, restricted by hardcoded userId = 1.
Delete a comment (destroy): Deletes comment restricted by userId = 1.

Important Notes
The userId is hardcoded as 1 in the controller for all create, update, and delete operations, meaning no actual user authentication integration yet.
Uses Sequelize ORM for all database interactions.
Validations are done using fastest-validator.
Routes for this controller should be separated and mapped to appropriate HTTP methods (POST, GET, PUT, DELETE).

2. Post Controller (post.controller.js)
Purpose
Handles CRUD operations for book posts in the system.
Features
Create a book post (save): Validates and stores book details including title, author, genre, description, reviewId, and imageUrl.
Get book by ID (show).
List all books (index).
Update book details (update): Updates all book fields; restricted by hardcoded userId = 12.
Delete a book (destroy): Deletes a book; restricted by hardcoded userId = 10 (note the inconsistency with update userId).

Important Notes
imageUrl is included in book details to store the book cover or related image link.
User IDs for update and delete operations are hardcoded (12 and 10 respectively) — no authentication check.
Uses Sequelize ORM.
Validation is done with fastest-validator.
Routes are expected to be separated, e.g., /books.

3. User Test Controller (test.controller.js)
Purpose
Demonstrates fetching a user along with their associated address(es) using Sequelize associations.
Features
Fetch user by primary key (here hardcoded as 4).
Includes related Address records with the user via Sequelize include option.

Important Notes
User ID 4 is hardcoded for demonstration.
Relies on Sequelize ORM with associations configured between User and Address models.
Typically, routes calling this controller should be separated (e.g., /test/user).

4. Authentication Controller (auth.controller.js)
Purpose
Manages user registration (sign-up) and login with password hashing and JWT authentication.
Features
Sign Up (signUp):
Checks for existing email.
Hashes password using bcryptjs.
Creates user record in DB.
Login (login):
Validates credentials.
Issues JWT token containing email and userId.

Important Notes
Uses Sequelize ORM to interact with the User model.
Passwords are securely hashed.
JWT tokens are signed with a secret key ('secret'), which ideally should be stored in .env.
Routes separated as /signup and /login.

Currently, no token expiration or advanced security features implemented.

User ID from login token can be used later to replace hardcoded user IDs in other controllers.





