## Uber Clone Project (Currently Under Work)
Hello! I am Shourya Sharma and This is a Full Stack Uber Clone App made in MERN Stack (MongoDB, Express, React and Node.js) 
[Will append more in the introduction after I will complete the project, discussing about all the features]

#### Note from The Developer
This project, including its codebase and documentation, has been created entirely through my own effort without the use of AI generated code or automated writing tools. I built and documented this project from scratch as a way to sharpen my problem solving skills, deepen my understanding of backend development, and strengthen my ability to communicate technical details clearly. Every decision, implementation, and explanation here reflects my own learning process and hands-on work. in my initial commits I had generated docs from AI, but then I deleted and decided to rewrite myself while testing and drawing flowchart of each API end point

## Folder Structure

 ### Initialisation
 
-  `app.js`: Main Express app setup and middleware configuration.

-  `server.js`: HTTP server entry point.
### Database and Schema Setup

-  `db/db.js`: MongoDB connection logic.
 
-  `models/captain.model.js`: Mongoose captain schema and methods.
- `models/user.model.js`: Mongoose user schema and methods.
-  `models/blacklistToken.model.js`: Mongoose schema for blacklisted JWT tokens.
### Routes

-  `routes/user.routes.js`: User-related API routes.
 -  `routes/captain.routes.js`: Captain-related API routes.
### Controllers

-  `controllers/user.controllers.js`: User controller functions (register, login, profile, logout).
 -  `controllers/captain.controllers.js`: Captain controller functions (register, etc).
 ### Middlewares

-  `middlewares/auth.middleware.js`: JWT authentication middleware.

 ### Service
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

## Database Models

### User Model

The `User` schema defines how user data is stored in MongoDB.

| Field             | Type   | Required | Details |
|-------------------|--------|----------|---------|
| `fullname.firstname` | String | Yes      | Min length 3 characters. |
| `fullname.lastname`  | String | No       | Min length 3 characters if provided. |
| `email`           | String | Yes      | Unique, min length 5 characters. |
| `password`        | String | Yes      | Hashed before storage, not returned in queries. |
| `socketId`        | String | No       | Stores user’s WebSocket connection ID. |

**Custom Methods**
- `generateAuthToken()` → Creates a JWT token with 24h expiry.
- `comparePassword(password)` → Compares input password with hashed password.
- `hashPassword(password)` → Returns a bcrypt hash of the password.

### Captain Model

The `Captain` schema defines how captain (driver) data is stored in MongoDB.

| Field                         | Type     | Required | Details |
|--------------------------------|----------|----------|---------|
| `fullname.firstname`           | String   | Yes      | Min length 3 characters. |
| `fullname.lastname`            | String   | No       | Min length 3 characters if provided. |
| `email`                        | String   | Yes      | Unique, lowercase, must match a valid email format. |
| `password`                     | String   | Yes      | Hashed before storage, excluded from query results. |
| `socketId`                     | String   | No       | Stores WebSocket connection ID. |
| `status`                       | String   | No       | Enum: `active`, `inactive` (default: `inactive`). |
| `vehicle.color`                 | String   | Yes      | Min length 3 characters. |
| `vehicle.plate`                 | String   | Yes      | Min length 2 characters. |
| `vehicle.model`                 | String   | Yes      | Min length 3 characters. |
| `vehicle.capacity`              | Number   | Yes      | Minimum value: 1. |
| `vehicle.vehicleType`           | String   | Yes      | Enum: `car`, `motocycle`, `auto`. |
| `location.latitude`             | Number   | No       | Current latitude of the captain. |
| `location.longitude`            | Number   | No       | Current longitude of the captain. |

**Custom Methods**
- `generateAuthToken()` → Creates a JWT token with 24h expiry for authentication.
- `comparePassword(password)` → Compares plain password with the stored hashed password.
- `hashPassword(password)` → Returns bcrypt hash of the password.

### Blacklisted Token
An extra layer of security to prevent users from logging in with old or compromised tokens that may still be stored on their system. This collection stores all previously used tokens and ensures that any token presented by a user is not blacklisted (already used or invalidated).
| Field                         | Type     | Required | Details |
|--------------------------------|----------|----------|---------|
| `token`           | String   | Yes      | Stores all past tokens |
| `createdAt`           | Date   | Yes      | Default is when created at |
## Middlewares

### Authentication Middlewares
`middlewares/auth.middleware.js` : contains authentication based middlwares 

#### authUser Middleware
The `authUser` middleware is responsible for authenticating a user based on their **JWT token**.  
It performs the following steps:
1. Extracts the token from either cookies or the `Authorization` header.
2. Checks if the token is **blacklisted**.
3. Verifies the token using `JWT`.
4. Attaches the decoded user object to `req.user`.
5. Calls `next()` if the user is authorized, or returns a 401 Unauthorized error otherwise.

<img src="https://upload.wikimedia.org/wikipedia/commons/4/47/PNG_transparency_demonstration_1.png" alt="Example Image" width="500">


#### captainUser Middleware
The `authCaptain` middleware authenticates captain based on their **Token**
1. Extract Token from either cookies or header
2. Checks if token is blacklisted
3. Verifies the token using `JWT` 
4. Attaches the decoded captain object to `req.captain`.
5. Calls `next()` if the captain is authorized, or returns a 401 Unauthorized error otherwise.

<img src="https://upload.wikimedia.org/wikipedia/commons/4/47/PNG_transparency_demonstration_1.png" alt="Example Image" width="500">


## API Endpoints

### `/users`

####  `/users/register`
- Check if 
-- Check if email has a valid format
-- **Firstname** should be minimum 3 letters
-- **Password** must be minimum 6 letters
- Run `userController.registerUser` controller

##### `userController.registerUser`
- Store validation results in errors object
- Return if errors object is not empty
- Extract `fullname`, `email`, `password` from `req.body`
- Find `user` document from 	`user` collection in database
- if `user` exist then return with message `user already exists`
- hash password using `hashPassword` method in user model
- Save `user` in database using `createUser` service
- Generate a token using `generateAuthToken` method in user model
- send response with `token` and `user` document

### Request
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
### Responce (Happy Path)
```json
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODljOWYwOWU2N2IwZGU2ZDU5NWU5OGIiLCJpYXQiOjE3NTUwOTQ3OTMsImV4cCI6MTc1NTE4MTE5M30.0tdlvGgX1MVpjaeacXYC-vYwgwNUbDJjFY_4XNlTxw4",
    "user": {
        "fullname": {
            "firstname": "ram",
            "lastname": "chandra"
        },
        "email": "ramchandra@gmail.com",
        "password": "$2b$10$h9fzTFAXCBwygxsRApJDBu/XYrjhToWQ/1XkwwZAnCqr8Vfi1BozO",
        "_id": "689c9f09e67b0de6d595e98b",
        "__v": 0
    }
}
```

### Errors

The `/users/register` endpoint can return the following error responses:

#### **400 Bad Request – Validation Errors**

Occurs when request body fails validation rules set via `express-validator`.  
The response contains an `errors` array, where each object has:

-   `msg`: The validation error message
    
-   `param`: The field that failed validation
    
-   `location`: The request location (e.g., `"body"`)
    

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
            "msg": "write proper name ain nobody got 2 letter name",
            "path": "fullname.firstname",
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

#### **400 Bad Request – User Already Exists**

Occurs when a user with the same email is already in the database.  
**Example:**

```
{
    "message": "user already exists"
}
```

#### **Possible Future Errors**

If authentication or DB connection fails internally, this could be extended to return:

```
{
    "message": "Internal Server Error"
}
```
