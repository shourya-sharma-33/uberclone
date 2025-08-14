
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

# authUser Middleware – Error Responses

This document describes the possible error responses returned by the `authUser` middleware.

| **HTTP Status** | **Error Type** | **Description** | **Example Response** |
|-----------------|---------------|-----------------|----------------------|
| **401 Unauthorized** | **Missing Token** | No valid authentication token found in `cookies.token` or `Authorization` header. | `{ "message": "Unauthorized" }` |
| **401 Unauthorized** | **Blacklisted Token** | Token exists in the `blacklistToken` collection (e.g., user logged out). | `{ "message": "Unauthorized" }` |
| **401 Unauthorized** | **Invalid or Expired Token** | JWT signature is invalid, token has expired, or cannot be decoded with `process.env.JWT_SECRET`. | `{ "message": "Unauthorized" }` |
| **500 Internal Server Error** *(Future Possibility)* | **Database Failure** | User lookup fails (e.g., DB outage or user not found). | `{ "message": "Internal Server Error" }` |

------------

#### captainUser Middleware


The `authCaptain` middleware authenticates captain based on their **Token**

1. Extract Token from either cookies or header

2. Checks if token is blacklisted

3. Verifies the token using `JWT`

4. Attaches the decoded captain object to `req.captain`.

5. Calls `next()` if the captain is authorized, or returns a 401 Unauthorized error otherwise.

  

<img src="https://upload.wikimedia.org/wikipedia/commons/4/47/PNG_transparency_demonstration_1.png" alt="Example Image" width="500">

  
# authCaptain Middleware – Error Responses

This document describes the possible error responses returned by the `authCaptain` middleware.

| **HTTP Status** | **Error Type** | **Description** | **Example Response** |
|-----------------|---------------|-----------------|----------------------|
| **401 Unauthorized** | **Missing Token** | No valid authentication token found in `cookies.token` or `Authorization` header. | `{ "message": "Unauthorized33" }` |
| **401 Unauthorized** | **Blacklisted Token** | Token exists in the `blacklistToken` collection (e.g., captain logged out). | `{ "message": "Unauthorized39" }` |
| **401 Unauthorized** | **Invalid or Expired Token** | JWT signature is invalid, token has expired, or cannot be decoded with `process.env.JWT_SECRET`. | `{ "message": "unauthorizd47" }` |
| **500 Internal Server Error** *(Future Possibility)* | **Database Failure** | Captain lookup fails (e.g., DB outage or captain not found). | `{ "message": "Internal Server Error" }` |
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

###  POST `/users/register`

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
{
"token":  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODljOWYwOWU2N2IwZGU2ZDU5NWU5OGIiLCJpYXQiOjE3NTUwOTQ3OTMsImV4cCI6MTc1NTE4MTE5M30.0tdlvGgX1MVpjaeacXYC-vYwgwNUbDJjFY_4XNlTxw4",
"user":  {
"fullname":  {
"firstname":  "ram",
"lastname":  "chandra"
},
"email":  "ramchandra@gmail.com",
"password":  "$2b$10$h9fzTFAXCBwygxsRApJDBu/XYrjhToWQ/1XkwwZAnCqr8Vfi1BozO",
"_id":  "689c9f09e67b0de6d595e98b",
"__v":  0
}
}
```

  # /users/register – Error Responses

This document lists the possible error responses returned by the `/users/register` endpoint.

| **HTTP Status** | **Error Type** | **Description** | **Example Response** |
|-----------------|---------------|-----------------|----------------------|
| **400 Bad Request** | **Validation Errors** | The request body fails validation rules set via `express-validator`. The response contains an `errors` array, where each object includes: <br> - `msg`: error message <br> - `param`: field that failed validation <br> - `location`: request data location (e.g., `"body"`). | `````` |
| **400 Bad Request** | **User Already Exists** | A user with the provided email already exists in the database. | `````` |
| **500 Internal Server Error** *(Future Possibility)* | **Server/DB Failure** | An internal authentication or database connection error occurred. | `````` |

###  POST `/users/login`

- Check if
-- Check if email has a valid format
-- **Password** must be minimum 6 letters
- Run `userController.loginUser` controller

####  `userController.loginUser`

- Store validation results in errors object

- Return if errors object is not empty

- Extract `email`, `password` from `req.body`

- Find `user` document from `user` collection in database including `password` because by default when we fetch `user` document `password` field is excluded, here we will include `password` to compare it with `password` from `req.body`

- Compare `password` from hashed `password` in `user` document in database using `comparePasssword` method from `user` model

- Generate token using `generateAuthToken` method in `user` method

- store token in cookies

- send responce status 200 with `token` and `user`

  

####  Request

```json
{
"email"  :  "ramchandra@gmail.com",
"password"  :  "123456789"
}
```

####  Responce (Happy Path)

```json
{
"token":  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODljOWYwOWU2N2IwZGU2ZDU5NWU5OGIiLCJpYXQiOjE3NTUwOTY5NDksImV4cCI6MTc1NTE4MzM0OX0.Vv91litFq7oflrCghnZy0_InnFcRY1q0mJurYYaQGyc",
"user":  {
"fullname":  {
"firstname":  "ram",
"lastname":  "chandra"
},
"_id":  "689c9f09e67b0de6d595e98b",
"email":  "ramchandra@gmail.com",
"password":  "$2b$10$h9fzTFAXCBwygxsRApJDBu/XYrjhToWQ/1XkwwZAnCqr8Vfi1BozO",
"__v":  0
}
}
```

  
  

####  Errors

  

The `/users/login` endpoint can return the following error responses:

  
  
  

**400 Bad Request – Validation Errors**

  

Occurs when the request body fails validation rules defined via `express-validator`.

  

**Response Format:**

The response contains an `errors` array, where each object includes:

  

-  `msg`: The validation error message

-  `path`: The field that failed validation

-  `location`: The request location (e.g., `"body"`)

-  `value`: The value that failed validation

  

**Example:** Invalid email and too short password

  

```
{
"errors": [
{
"type": "field",
"value": "shourya@gmail",
"msg": "Invalid Email",
"path": "email",
"location": "body"
},
{
"type": "field",
"value": "123",
"msg": "password bada rakho babygirl",
"path": "password",
"location": "body"
}
]
}
```
 **401 Unauthorized – Invalid Credentials**

  

Occurs when the provided email or password does not match any user in the database.

  

**Example:**

  

`{ "message": "invalid email or password" }`

  

If the email exists but the password is incorrect, the system may also return:

  

`{ "message": "invalid email and password" }`

  
  
  

**Possible Future Errors**

  

If authentication or DB connection fails internally, this could be extended to return:

  

`{ "message": "Internal Server Error" }`

  

###  GET `/users/profile`

- run `authMiddleware.authUser`

- run `userController.getUserProfile`

####  `userController.getUserProfile`

- fetch `req.user` and send in response

  
  

####  Request

No Request is needed

  

####  Responce (Happy Path)

```json

{

"fullname":  {

"firstname":  "ram",

"lastname":  "chandra"

},

"_id":  "689c9f09e67b0de6d595e98b",

"email":  "ramchandra@gmail.com",

"__v":  0

}

```

  
  

####  Errors

  

The `/users/profile` endpoint can return the following error responses:

  
  
  

 **401 Unauthorized – Missing Token**

  

Occurs when no authentication token is provided in cookies or the `Authorization` header.

  

**Example:**

  

`{ "message": "Unauthorized" }`

  
  
  

  **401 Unauthorized – Blacklisted Token**

  

Occurs when the provided token exists in the blacklist, indicating it has been revoked or logged out.

  

**Example:**

  

`{ "message": "Unauthorized " }`

  
  
  
  **401 Unauthorized – Invalid or Expired Token**

  

Occurs when token verification fails (e.g., signature mismatch, token expired, or invalid token format).

  

**Example:**

  

`{ "message": "Unauthorized" }`

  
  
  

**Possible Future Errors**

  

If database connection fails during token validation or user lookup, the error could be extended to return:

  

`{ "message": "Internal Server Error" }`

  
  

### GET `/users/logout`

- run `authMiddleware.authUser`

- run `userController.logoutUser`

#### `userController.logoutUser`

- Clear Cookie

- Store `token` in `blacklistTokenModel` so it cant be reused

- in response send`logged out`

  

### Request

No Request is needed

  

###  Response (Happy Path)

```json

{

"message":  "logged out"

}

```

  

####  Now if we try to login

  

```json

{

"message":  "Unauthorized "

}

```

  
  
  

###  Errors

  

The `/users/logout` endpoint can return the following error responses:

  
  

 **401 Unauthorized – Missing Token**

  

Occurs when no authentication token is provided in cookies or the `Authorization` header.

  

**Example:**

  

`{ "message": "Unauthorized" }`

  

 **401 Unauthorized – Blacklisted Token**

  

Occurs when the provided token exists in the blacklist, meaning it has already been revoked or the user is already logged out.

  

**Example:**

  

`{ "message": "Unauthorized " }`

  
  
  

**401 Unauthorized – Invalid or Expired Token**

  

Occurs when token verification fails due to signature mismatch, expiration, or malformed token.

  

**Example:**

  

`{ "message": "Unauthorized" }`

  
  

  **Possible Future Errors**

  

If database connection fails during token validation or blacklist creation, the error could be extended to return:

  

`{ "message": "Internal Server Error" }`

  
------------  

#  `/captain`

------------  

  

#  POST `/captain/register`

  

- Check If

-- Check if `email` is in right format.

-- `firstname` should be at least 3 letters.

-- `password` must be at least 6 letters.

-- `vehicle.color` must be minimum 3 letters.

-- `vehicle.plate` must be at least 3 letters.

-- `vehicle.capacity` must be at least 1.

-- `vehicle.vehicleType` must be either `car`, `motorcycle`, `auto`

  

- Run `captainController.registerCaptain` controller

  

  

##  `captainController.registerCaptain`

  

- Store validation results in errors object

- Return if errors object is not empty

- Extract `fullname`, `email`, `password`, `vehicle` from `req.body`

- Find `captain` document from `captain` collection in database

- if `captain` exist then return with message `captain already exists`

- hash password using `hashPassword` method in captain model

- Save `captain` in database using `createCaptain` service

- Generate a token using `generateAuthToken` method in captain model

- send response with `token` and `captain` document

  

##  Request

  

```json

  

{

"fullname"  :  {

"firstname"  :  "meowfirstname",

"lastname"  :  "meowlastname"

},

"email"  :  "meow@captain.com",

"password"  :  "1234567890",

"vehicle"  :  {

"color"  :  "pink",

"plate"  :  "pink",

"model"  :  "pink",

"capacity"  :  2,

" vehicleType"  :  "car"

}

}```

```

## Responce (Happy Path)

  

```json

{

"token":  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODlkOTNjM2I4M2JmZWM5NTMyYzU0YzIiLCJpYXQiOjE3NTUxNTc0NDMsImV4cCI6MTc1NTI0Mzg0M30.KhUUnRj96XhsYw0eTockpP0V69WCYGYAnCkgQBwAxKw",

"captain":  {

"fullname":  {

"firstname":  "meowfirstname",

"lastname":  "meowlastname"

},

"email":  "meow@captain.com",

"password":  "$2b$10$Cgqu/STveqgBxuNHK4QaK.XoK2a12qFTmRK8wm2zQYhRXTsjjB2fK",

"status":  "inactive",

"vehicle":  {

"color":  "pink",

"plate":  "pink",

"model":  "pink",

"capacity":  2,

"vehicleType":  "car"

},

"_id":  "689d93c3b83bfec9532c54c2",

"__v":  0

}

}

```

  

  

##  Errors

  

  

The `/users/register` endpoint can return the following error responses:

  

  

####  **400 Bad Request – Validation Errors**

  

  

Occurs when request body fails validation rules set via `express-validator`.

  

The response contains an `errors` array, where each object has:

  

  

-  `msg`: The validation error message

  

-  `param`: The field that failed validation

  

-  `location`: The request location (e.g., `"body"`)

  

  

**Example: Invalid email, too short firstname, short password**

  

  

```

  

{

  

"errors": [

  

{

  

"type": "field",

  

"value": "shourya@gmail",

  

"msg": "Invalid Email",

  

"path": "email",

  

"location": "body"

  

},

  

{

  

"type": "field",

  

"value": "ra",

  

"msg": "Fullname should be more than two letters",

  

"path": "fullname.firstname",

  

"location": "body"

  

},

  

{

  

"type": "field",

  

"value": "123",

  

"msg": "Passsword should be more than 6 letters",

  

"path": "password",

  

"location": "body"

  

}

  

]

  

}

  

```

  

  

####  **400 Bad Request – User Already Exists**

  

  

Occurs when a user with the same email is already in the database.

  

**Example:**

  

  

```

  

{

  

"message": "user already exists"

  

}

  

```

  

  

####  **Possible Future Errors**

  

  

If authentication or DB connection fails internally, this could be extended to return:

  

  

```

  

{

  

"message": "Internal Server Error"

  

}

  

```

  

#  POST `/captain/login`

  

- Check if

  

-- Check if email has a valid format

  

-- **Password** must be minimum 6 letters

  

- Run `captainController.loginCaptain` controller

  

##  `captainController.loginCaptain`

  

- Store validation results in errors object

  

- Return if errors object is not empty

  

- Extract `email`, `password` from `req.body`

  

- Find `captain` document from `captain` collection in database including `password` because by default when we fetch `captain` document `password` field is excluded, here we will include `password` to compare it with `password` from `req.body`

  

- Compare `password` from hashed `password` in `captain` document in database using `comparePasssword` method from `captain` model

  

- Generate token using `generateAuthToken` method in `captain` method

  

- store token in cookies

  

- send responce status 200 with `token` and `captain`

  

  

##  Request

  

```json

{

"email"  :  "meow@captain.com",

"password"  :  "1234567890"

}

```

  

##  Responce (Happy Path)

  

```json

{

"token":  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODlkOTNjM2I4M2JmZWM5NTMyYzU0YzIiLCJpYXQiOjE3NTUxNjEzNzEsImV4cCI6MTc1NTI0Nzc3MX0.2Q5rW5K46yEZExETmwEspUR3KvOakQB0IOyWEveOORA",

"captain":  {

"fullname":  {

"firstname":  "meowfirstname",

"lastname":  "meowlastname"

},

"vehicle":  {

"color":  "pink",

"plate":  "pink",

"model":  "pink",

"capacity":  2,

"vehicleType":  "car"

},

"_id":  "689d93c3b83bfec9532c54c2",

"email":  "meow@captain.com",

"password":  "$2b$10$Cgqu/STveqgBxuNHK4QaK.XoK2a12qFTmRK8wm2zQYhRXTsjjB2fK",

"status":  "inactive",

"__v":  0

}

}```

  

```

  

##  Errors

  

  

The `/users/login` endpoint can return the following error responses:

  

  

####  **400 Bad Request – Validation Errors**

  

  

Occurs when the request body fails validation rules defined via `express-validator`.

  

  

**Response Format:**

  

The response contains an `errors` array, where each object includes:

  

  

-  `msg`: The validation error message

  

-  `path`: The field that failed validation

  

-  `location`: The request location (e.g., `"body"`)

  

-  `value`: The value that failed validation

  

  

**Example:** Invalid email and too short password

  

  

```

  

{

  

"errors": [

  

{

  

"type": "field",

  

"value": "shourya@gmail",

  

"msg": "Invalid Email",

  

"path": "email",

  

"location": "body"

  

},

  

{

  

"type": "field",

  

"value": "123",

  

"msg": "password bada rakho babygirl",

  

"path": "password",

  

"location": "body"

  

}

  

]

  

}

  

```

  

  

####  **401 Unauthorized – Invalid Credentials**

  

  

Occurs when the provided email or password does not match any user in the database.

  

  

**Example:**

  

  

`{ "message": "invalid email or password" }`

  

  

If the email exists but the password is incorrect, the system may also return:

  

  

`{ "message": "invalid email and password" }`

  

  

####  **Possible Future Errors**

  

  

If authentication or DB connection fails internally, this could be extended to return:

  

  

`{ "message": "Internal Server Error" }`

  

  

#  GET `/captain/profile`

  

- run `authMiddleware.authcaptain`

  

- run `captainController.getCaptainProfile`

  

##  `captainController.getCaptainProfile`

  

- fetch `req.captain` and send in response

  

  

##  Request

  

No Request is needed

  

  

##  Responce (Happy Path)

  

```json

  

{

"captain":  {

"fullname":  {

"firstname":  "meowfirstname",

"lastname":  "meowlastname"

},

"vehicle":  {

"color":  "pink",

"plate":  "pink",

"model":  "pink",

"capacity":  2,

"vehicleType":  "car"

},

"_id":  "689d93c3b83bfec9532c54c2",

"email":  "meow@captain.com",

"status":  "inactive",

"__v":  0

}

}

  

```

  

  

##  Errors

  

  

The `/users/profile` endpoint can return the following error responses:

  

  

####  **401 Unauthorized – Missing Token**

  

  

Occurs when no authentication token is provided in cookies or the `Authorization` header.

  

  

**Example:**

  

  

`{ "message": "Unauthorized" }`

  

  

####  **401 Unauthorized – Blacklisted Token**

  

  

Occurs when the provided token exists in the blacklist, indicating it has been revoked or logged out.

  

  

**Example:**

  

  

`{ "message": "Unauthorized " }`

  

  

####  **401 Unauthorized – Invalid or Expired Token**

  

  

Occurs when token verification fails (e.g., signature mismatch, token expired, or invalid token format).

  

  

**Example:**

  

  

`{ "message": "Unauthorized" }`

  

  

####  **Possible Future Errors**

  

  

If database connection fails during token validation or user lookup, the error could be extended to return:

  

  

`{ "message": "Internal Server Error" }`

  

  

#  GET `/captain/logout`

  

- run `authMiddleware.authCaptain`

  

- run `captainController.logoutCaptain`

  

##  `captainController.logoutCaptain`

  

- Clear Cookie

  

- Store `token` in `blacklistTokenModel` so it cant be reused

  

- in response send`logged out`

  

  

##  Request

  

No Request is needed

  

  

##  Response (Happy Path)

  

```json

  

{

  

"message":  "logged out"

  

}

  

```

  

  

####  Now if we try to login

  

  

```json

  

{

  

"message":  "Unauthorized "

  

}

  

```

  

  

##  Errors

  

  

The `/users/logout` endpoint can return the following error responses:

  

  

####  **401 Unauthorized – Missing Token**

  

  

Occurs when no authentication token is provided in cookies or the `Authorization` header.

  

  

**Example:**

  

  

`{ "message": "Unauthorized" }`

  

  

####  **401 Unauthorized – Blacklisted Token**

  

  

Occurs when the provided token exists in the blacklist, meaning it has already been revoked or the user is already logged out.

  

  

**Example:**

  

  

`{ "message": "Unauthorized " }`

  

  

####  **401 Unauthorized – Invalid or Expired Token**

  

  

Occurs when token verification fails due to signature mismatch, expiration, or malformed token.

  

  

**Example:**

  

  

`{ "message": "Unauthorized" }`

  

  

####  **Possible Future Errors**

  

  

If database connection fails during token validation or blacklist creation, the error could be extended to return:

  

  

`{ "message": "Internal Server Error" }`
