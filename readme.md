# Uber Clone Project

## Overview
This project is an Uber clone backend built with Node.js, Express, and MongoDB. It provides user registration, login, authentication, and profile management. The frontend is not implemented yet.

It also supports captain (driver) registration and management, including vehicle details and authentication.

## Folder Structure

- **Backend/**
	- `app.js`: Main Express app setup and middleware configuration.
	- `server.js`: HTTP server entry point.
	- `db/db.js`: MongoDB connection logic.
	- `routes/user.routes.js`: User-related API routes.
	- `controllers/user.controllers.js`: User controller functions (register, login, profile, logout).
	- `models/user.model.js`: Mongoose user schema and methods.
	- `models/blacklistToken.model.js`: Mongoose schema for blacklisted JWT tokens.
	- `services/user.services.js`: User creation service.
	- `middlewares/auth.middleware.js`: JWT authentication middleware.
	- `routes/captain.routes.js`: Captain-related API routes.
	- `controllers/captain.controllers.js`: Captain controller functions (register, etc).
	- `models/captain.model.js`: Mongoose captain schema and methods.
	- `services/captain.services.js`: Captain creation service.

- **Frontend/**
	- (Currently empty)

## Setup Instructions

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

## API Endpoints

### Health Check
- `GET /` — Returns "hello world" to verify server is running.

### Captain Registration
- `POST /captains/register`
	- Body:
		```json
		{
			"fullname": { "firstname": "Alex", "lastname": "Rider" },
			"email": "alex@captain.com",
			"password": "yourpassword",
			"vehicle": {
				"color": "Red",
				"plate": "AB1234",
				"model": "Toyota Prius",
				"capacity": 4,
				"vehicleType": "car"
			}
		}
		```
	- Validates email, first name (min 3 chars), password (min 6 chars), and all vehicle fields.
	- Returns JWT token and captain object on success.

### User Registration
- `POST /users/register`
	- Body:
		```json
		{
			"fullname": { "firstname": "John", "lastname": "Doe" },
			"email": "john@example.com",
			"password": "yourpassword"
		}
		```
	- Validates email, first name (min 3 chars), password (min 6 chars).
	- Returns JWT token and user object on success.

### User Login
- `POST /users/login`
	- Body:
		```json
		{
			"email": "john@example.com",
			"password": "yourpassword"
		}
		```
	- Returns JWT token and user object on success. Sets token as HTTP-only cookie.

### Get User Profile
- `GET /users/profile`
	- Requires authentication (JWT in cookie or Authorization header).
	- Returns user profile object.

### Logout
- `GET /users/logout`
	- Requires authentication.
	- Blacklists the JWT token and clears the cookie.

## Code Highlights

- **Authentication:**
	- JWT tokens are generated and verified using `jsonwebtoken`.
	- Tokens are stored in HTTP-only cookies for security.
	- Blacklisted tokens are tracked in MongoDB (`blacklistToken.model.js`).
	- Both users and captains have authentication flows and JWT tokens.

- **Validation:**
	- Uses `express-validator` for request body validation.
	- Custom error messages for invalid input.
	- Captain registration validates vehicle details and type.

- **Password Security:**
	- Passwords are hashed with bcrypt before storing.
	- Password comparison uses bcrypt for login.
	- Captain and user models both hash and compare passwords securely.

- **Database:**
	- MongoDB is used via Mongoose ODM.
	- User schema enforces required fields and uniqueness.
	- Captain schema enforces required fields, vehicle details, and uniqueness.

## Example Usage

Register a user:
```bash
curl -X POST http://localhost:3000/users/register \
	-H "Content-Type: application/json" \
	-d '{"fullname": {"firstname": "Jane", "lastname": "Smith"}, "email": "jane@example.com", "password": "securepass"}'
```

Register a captain:
```bash
curl -X POST http://localhost:3000/captains/register \
	-H "Content-Type: application/json" \
	-d '{
		"fullname": {"firstname": "Alex", "lastname": "Rider"},
		"email": "alex@captain.com",
		"password": "securepass",
		"vehicle": {
			"color": "Red",
			"plate": "AB1234",
			"model": "Toyota Prius",
			"capacity": 4,
			"vehicleType": "car"
		}
	}'
```

Login:
```bash
curl -X POST http://localhost:3000/users/login \
	-H "Content-Type: application/json" \
	-d '{"email": "jane@example.com", "password": "securepass"}'
```

Get profile (after login):
```bash
curl -X GET http://localhost:3000/users/profile \
	--cookie "token=your_jwt_token"
```

Logout:
```bash
curl -X GET http://localhost:3000/users/logout \
	--cookie "token=your_jwt_token"
```

## Contributing

- Add new backend features in the `Backend` folder.
- Follow existing patterns for controllers, services, and models.
- Update this README as the project evolves.

---
_For questions or issues, open an issue in this repository._

