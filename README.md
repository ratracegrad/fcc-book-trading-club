# Free Code Camp Book Trading Club
Online Book Trading Application using MongoDB database and displayed with Node.js and Express.js.

## Technology Stack
- Mongo
- Express.js
- Node.js
- Bootstrap
- Passport

## Installation
```bash
git clone https://github.com/ratracegrad/mongomart
npm install
node mongomart.js
```

## Live Demonstration
[You can view this app in production here](https://jb-fcc-book-trading-club.herokuapp.com/)


## Authentication
This application using Passport local for OAuth Authentication. Users can create an account by providing an unique email address and a password.

Once a user has created a new account. They have the option of updating their profile which includes changing their name and their password.

## Tests
This application includes tests that are located in the test directory. To run the tests enter:
```bash
npm test
```

## Screenshots
Here is the home page of the FCC Book Trading Club application.
![Book Trading Club Homepage](/screenshots/homepage.png?raw=true "Book Trading Club Homepage")

To use the application users will need to create an account. Here is the signup page for creating a new account.
![Book Trading Club Signup](/screenshots/signup.png?raw=true "Book Trading Club Signup")

Users that have created an account can login to access the application. Here is the login page.
![Book Trading Club Login](/screenshots/login.png?raw=true "Book Trading Club Login")

After a user logs into their account they will be shown All Books that are available.
![Book Trading Club All Books](/screenshots/allBooks.png?raw=true "Book Trading Club All Books")

Users can change their password on the update profile page.
![Book Trading Club Update Profile](/screenshots/updateProfile.png?raw=true "Book Trading Club Update Profile")
