# Uber Clone (Under Progress)

Hello! I am Shourya Sharma and This is a Full Stack Uber Clone App made in MERN Stack (MongoDB, Express, React and Node.js)

[Will append more in the introduction after I will complete the project, discussing about all the features]

  

## Note from The Developer

This project, including its codebase and documentation, has been created entirely through my own effort without the use of AI generated code or automated writing tools. I built and documented this project from scratch as a way to sharpen my problem solving skills, deepen my understanding of backend development, and strengthen my ability to communicate technical details clearly. Every decision, implementation, and explanation here reflects my own learning process and hands-on work. in my initial commits I had generated docs from AI, but then I deleted and decided to rewrite myself while testing and drawing flowchart of each API end point

  

##  Folder Structure

  

###  Initialisation

-  `app.js`: Main Express app setup and middleware configuration.

  

-  `server.js`: HTTP server entry point.

###  Database and Schema Setup

  

-  `db/db.js`: MongoDB connection logic.

-  `models/captain.model.js`: Mongoose captain schema and methods.

-  `models/user.model.js`: Mongoose user schema and methods.

-  `models/blacklistToken.model.js`: Mongoose schema for blacklisted JWT tokens.

###  Routes

  

-  `routes/user.routes.js`: User-related API routes.

-  `routes/captain.routes.js`: Captain-related API routes.

###  Controllers 

-  `controllers/user.controllers.js`: User controller functions (register, login, profile, logout).

-  `controllers/captain.controllers.js`: Captain controller functions (register, etc).

###  Middlewares

  

-  `middlewares/auth.middleware.js`: JWT authentication middleware.

  

###  Service

-  `services/user.services.js`: User creation service.

  
  
  
  
  
  

-  `services/captain.services.js`: Captain creation service.

  

##  Setup Instructions

  

  

1. Install dependencies:

  

```powershell
cd Backend
npm install
```

  

2. Create a `.env` file in the `Backend` folder with the following variables:

  

```env
DB_CONNECT=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
NODE_ENV=development
PORT=3000
```

  

3. Start the server:

  

```powershell
node server.js
```

  

##  Database Models


###  User Model

  

The `User` schema defines how user data is stored in MongoDB.
| Field                | Type   | Required | Details                                         |
|----------------------|--------|----------|-------------------------------------------------|
| `fullname.firstname` | String | Yes      | Min length 3 characters.                        |
| `fullname.lastname`  | String | No       | Min length 3 characters if provided.            |
| `email`              | String | Yes      | Unique, min length 5 characters.                |
| `password`           | String | Yes      | Hashed before storage, not returned in queries. |
| `socketId`           | String | No       | Stores user’s WebSocket connection ID.          |


**Custom Methods**

-  `generateAuthToken()` → Creates a JWT token with 24h expiry.

-  `comparePassword(password)` → Compares input password with hashed password.

-  `hashPassword(password)` → Returns a bcrypt hash of the password.

  

###  Captain Model

  

The `Captain` schema defines how captain (driver) data is stored in MongoDB.

 | Field                 | Type   | Required | Details                                                    |
|-----------------------|--------|----------|------------------------------------------------------------|
| `fullname.firstname`  | String | Yes      | Min length 3 characters.                                   |
| `fullname.lastname`   | String | No       | Min length 3 characters if provided.                       |
| `email`               | String | Yes      | Unique, lowercase, must match a valid email format.        |
| `password`            | String | Yes      | Hashed before storage, excluded from query results.        |
| `socketId`            | String | No       | Stores WebSocket connection ID.                            |
| `status`              | String | No       | Enum: `active`, `inactive` (default: `inactive`).          |
| `vehicle.color`       | String | Yes      | Min length 3 characters.                                   |
| `vehicle.plate`       | String | Yes      | Min length 2 characters.                                   |
| `vehicle.model`       | String | Yes      | Min length 3 characters.                                   |
| `vehicle.capacity`    | Number | Yes      | Minimum value: 1.                                          |
| `vehicle.vehicleType` | String | Yes      | Enum: `car`, `motocycle`, `auto`.                          |
| `location.latitude`   | Number | No       | Current latitude of the captain.                           |
| `location.longitude`  | Number | No       | Current longitude of the captain.                          |


**Custom Methods**

-  `generateAuthToken()` → Creates a JWT token with 24h expiry for authentication.

-  `comparePassword(password)` → Compares plain password with the stored hashed password.

-  `hashPassword(password)` → Returns bcrypt hash of the password.

  

###  Blacklisted Token

An extra layer of security to prevent users from logging in with old or compromised tokens that may still be stored on their system. This collection stores all previously used tokens and ensures that any token presented by a user is not blacklisted (already used or invalidated).


| Field      | Type   | Required | Details                          |
|------------|--------|----------|----------------------------------|
| `token`    | String | Yes      | Stores all past tokens.          |
| `createdAt`| Date   | Yes      | Default is the creation date.    |


##  Middlewares

  
###  Authentication Middlewares

`middlewares/auth.middleware.js` : contains authentication based middlwares
  
------------
####  authUser Middleware

The `authUser` middleware is responsible for authenticating a user based on their **JWT token**.

It performs the following steps:

1. Extracts the token from either cookies or the `Authorization` header.

2. Checks if the token is **blacklisted**.

3. Verifies the token using `JWT`.

4. Attaches the decoded user object to `req.user`.

5. Calls `next()` if the user is authorized, or returns a 401 Unauthorized error otherwise.

  

<img src="Flowcharts\Authentication-middleware\Untitled Diagram.svg" alt="Example Image" style="width:100%;">

**Errors – `authUser` Middleware**
The `authUser` middleware can return the following error responses:

**401 Unauthorized – Missing Token**
Occurs when the request does not include a valid authentication token in `cookies.token` or `Authorization` header.

**Example:**
`{ "message": "Unauthorized" }`

 **401 Unauthorized – Blacklisted Token**
Occurs when the provided token is found in the `blacklistToken` collection (e.g., after a logout).

**Example:**
`{ "message": "Unauthorized " }`
**401 Unauthorized – Invalid or Expired Token**
Occurs when the JWT signature is invalid, the token has expired, or it cannot be decoded using `process.env.JWT_SECRET`.

**Example:**
`{ "message": "Unauthorized" }`

**Possible Future Errors**
If database queries fail (e.g., user not found due to a DB outage), this could be extended to return:
`{ "message": "Internal Server Error" }`

------------

#### captainUser Middleware


The `authCaptain` middleware authenticates captain based on their **Token**

1. Extract Token from either cookies or header

2. Checks if token is blacklisted

3. Verifies the token using `JWT`

4. Attaches the decoded captain object to `req.captain`.

5. Calls `next()` if the captain is authorized, or returns a 401 Unauthorized error otherwise.

  

<img src="https://upload.wikimedia.org/wikipedia/commons/4/47/PNG_transparency_demonstration_1.png" alt="Example Image" width="500">

  

**Errors – `authCaptain` Middleware**
The `authCaptain` middleware can return the following error responses:

**401 Unauthorized – Missing Token**
Occurs when the request does not include a valid authentication token in `cookies.token` or `Authorization` header.

**Example:**
`{ "message": "Unauthorized33" }`

**401 Unauthorized – Blacklisted Token**
Occurs when the provided token is found in the `blacklistToken` collection (e.g., after a logout).

**Example:**
`{ "message": "Unauthorized39" }`

**401 Unauthorized – Invalid or Expired Token**
Occurs when the JWT signature is invalid, the token has expired, or it cannot be decoded using `process.env.JWT_SECRET`.
**Example:**
`{ "message": "unauthorizd47" }`

**Possible Future Errors**
If database queries fail (e.g., captain not found due to a DB outage), this could be extended to return:
`{ "message": "Internal Server Error" }`

------------

##  Services

  

###  User Service

`services/user.services.js`

####  `createUser`

  

- takes `firstname`, `lastname`, `email`, `password`and saves them in database collection

  

### Captain Service

`services/user.services.js`

####  `createCaptain`

  

- takes `firstname`, `lastname`, `email`, `password`, `color`,`plate`, `model`. `capacity`, `vehicleType` and saves them in database collection

##  API Endpoints

------------

###  `/users`

------------

####  POST `/users/register`

- Check if

-- Check if email has a valid format

-- **Firstname** should be minimum 3 letters

-- **Password** must be minimum 6 letters

- Run `userController.registerUser` controller

  

####  `userController.registerUser`

- Store validation results in errors object

- Return if errors object is not empty

- Extract `fullname`, `email`, `password` from `req.body`

- Find `user` document from `user` collection in database

- if `user` exist then return with message `user already exists`

- hash password using `hashPassword` method in user model

- Save `user` in database using `createUser` service

- Generate a token using `generateAuthToken` method in user model

- send response with `token` and `user` document

  

####  Request

```json
{
"fullname"  :  {
"firstname"  :  "shourya",
"lastname"  :  "sharma"
},
"email"  :  "shourya@gmail.com"
"password"  :  "123456789"
}
```

####  Responce (Happy Path)

```json

# Uber Clone (Under Progress)

## Introduction
Hello! I am Shourya Sharma. This is a Full Stack Uber Clone App made in the MERN Stack (MongoDB, Express, React, Node.js).

> _Note from the Developer:_
> This project, including its codebase and documentation, has been created entirely through my own effort without the use of AI generated code or automated writing tools. Every decision, implementation, and explanation here reflects my own learning process and hands-on work.

---

## Table of Contents
1. [Folder Structure](#folder-structure)
2. [Setup Instructions](#setup-instructions)
3. [Database Models](#database-models)
4. [Middlewares](#middlewares)
5. [Services](#services)
6. [API Endpoints](#api-endpoints)

---

## Folder Structure

**Backend/**
- `app.js`: Main Express app setup and middleware configuration
- `server.js`: HTTP server entry point
- `db/db.js`: MongoDB connection logic
- `models/`: Mongoose schemas for User, Captain, BlacklistedToken
- `routes/`: User and Captain API routes
- `controllers/`: User and Captain controller functions
- `middlewares/`: JWT authentication middleware
- `services/`: User and Captain creation services

**Frontend/**
- (Currently empty)

---

## Setup Instructions
1. Install dependencies:
   ```powershell
   cd Backend
   npm install
   ```
2. Create a `.env` file in the `Backend` folder with:
   ```env
   DB_CONNECT=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   NODE_ENV=development
   PORT=3000
   ```
3. Start the server:
   ```powershell
   node server.js
   ```

---

## Database Models

### User Model
| Field                | Type   | Required | Details                                         |
|----------------------|--------|----------|-------------------------------------------------|
| `fullname.firstname` | String | Yes      | Min length 3 characters.                        |
| `fullname.lastname`  | String | No       | Min length 3 characters if provided.            |
| `email`              | String | Yes      | Unique, min length 5 characters.                |
| `password`           | String | Yes      | Hashed before storage, not returned in queries. |
| `socketId`           | String | No       | Stores user’s WebSocket connection ID.          |

**Custom Methods:**
- `generateAuthToken()` → Creates a JWT token with 24h expiry
- `comparePassword(password)` → Compares input password with hashed password
- `hashPassword(password)` → Returns a bcrypt hash of the password

### Captain Model
| Field                 | Type   | Required | Details                                                    |
|-----------------------|--------|----------|------------------------------------------------------------|
| `fullname.firstname`  | String | Yes      | Min length 3 characters.                                   |
| `fullname.lastname`   | String | No       | Min length 3 characters if provided.                       |
| `email`               | String | Yes      | Unique, lowercase, must match a valid email format.        |
| `password`            | String | Yes      | Hashed before storage, excluded from query results.        |
| `socketId`            | String | No       | Stores WebSocket connection ID.                            |
| `status`              | String | No       | Enum: `active`, `inactive` (default: `inactive`).          |
| `vehicle.color`       | String | Yes      | Min length 3 characters.                                   |
| `vehicle.plate`       | String | Yes      | Min length 2 characters.                                   |
| `vehicle.model`       | String | Yes      | Min length 3 characters.                                   |
| `vehicle.capacity`    | Number | Yes      | Minimum value: 1.                                          |
| `vehicle.vehicleType` | String | Yes      | Enum: `car`, `motocycle`, `auto`.                          |
| `location.latitude`   | Number | No       | Current latitude of the captain.                           |
| `location.longitude`  | Number | No       | Current longitude of the captain.                          |

**Custom Methods:**
- `generateAuthToken()` → Creates a JWT token with 24h expiry for authentication
- `comparePassword(password)` → Compares plain password with the stored hashed password
- `hashPassword(password)` → Returns bcrypt hash of the password

### Blacklisted Token
| Field      | Type   | Required | Details                          |
|------------|--------|----------|----------------------------------|
| `token`    | String | Yes      | Stores all past tokens.          |
| `createdAt`| Date   | Yes      | Default is the creation date.    |

---

## Middlewares

### Authentication Middlewares
`middlewares/auth.middleware.js` : contains authentication based middlewares

#### authUser Middleware
Authenticates a user based on their JWT token (from cookies or Authorization header), checks blacklist, verifies JWT, attaches user to `req.user`.

#### authCaptain Middleware
Authenticates a captain based on their JWT token (from cookies or Authorization header), checks blacklist, verifies JWT, attaches captain to `req.captain`.

---

## Services

### User Service
`services/user.services.js` — `createUser`: takes `firstname`, `lastname`, `email`, `password` and saves them in the database

### Captain Service
`services/captain.services.js` — `createCaptain`: takes `firstname`, `lastname`, `email`, `password`, `color`, `plate`, `model`, `capacity`, `vehicleType` and saves them in the database

---

## API Endpoints

### User Endpoints
- `POST /users/register` — Register a new user
- `POST /users/login` — Login as a user
- `GET /users/profile` — Get user profile (auth required)
- `GET /users/logout` — Logout user (auth required)

### Captain Endpoints
- `POST /captain/register` — Register a new captain
- `POST /captain/login` — Login as a captain
- `GET /captain/profile` — Get captain profile (auth required)
- `GET /captain/logout` — Logout captain (auth required)

---

## Example Requests

### Register User
```json
{
  "fullname": { "firstname": "shourya", "lastname": "sharma" },
  "email": "shourya@gmail.com",
  "password": "123456789"
}
```

### Register Captain
```json
{
  "fullname": { "firstname": "meowfirstname", "lastname": "meowlastname" },
  "email": "meow@captain.com",
  "password": "1234567890",
  "vehicle": {
    "color": "pink",
    "plate": "pink",
    "model": "pink",
    "capacity": 2,
    "vehicleType": "car"
  }
}
```

---

## Error Handling
All endpoints return clear error messages for validation, authentication, and server errors. See endpoint sections above for examples.

---

## License
MIT
"__v":  0
