# Frontend Documentation

This documentation covers **business logic, authentication flows, and backend interaction** for the Uber Clone React frontend, mapped to your backend API and architectural style. This guides contributors through all logic and API usage
---

## Folder/Component Structure

| File/Component                   | Purpose                                                    |
|----------------------------------|------------------------------------------------------------|
| `App.jsx`                        | Route switcher; protected routes for users/captains.       |
| `main.jsx`                       | App mounting, context & router setup.                      |
| `context/UserContext.jsx`        | Global user state management.                              |
| `context/CaptainContext.jsx`     | Global captain state management.                           |
| `pages/UserLogin.jsx`            | User login, token management, backend link.                |
| `pages/UserSignup.jsx`           | User registration, token storing, backend link.            |
| `pages/UserProtectWrapper.jsx`   | User-only route protector.                                 |
| `pages/UserLogout.jsx`           | Logout flow, token invalidation, backend link.             |
| `pages/CaptainLogin.jsx`         | Captain login, token management, backend link.             |
| `pages/CaptainSignup.jsx`        | Captain registration, vehicle info, backend link.          |
| `pages/CaptainProtectWrapper.jsx`| Captain route protector, backend profile check.            |
| `pages/CaptainHome.jsx`          | Captain home placeholder.                                  |
| `pages/Home.jsx`                 | User home placeholder.                                     |
| `pages/Start.jsx`                | Entry/welcome page; not covered in logic docs.             |

---

## Context State Management

### UserContext

- **Variables**: 
  - `user` (object): `{ email, fullName: { firstName, lastName } }`
  - `setUser` (function): updates user data.
- Provided globally for easy session management.

### CaptainContext

- **Variables**: 
  - `captain` (object): captain profile.
  - `setCaptain`, `updateCaptain` (functions): update captain data.
  - `isLoading` (bool), `error` (any): async status and error tracking.

---

## Routing and Protection Logic

- **App Routing (`App.jsx`)**
  - Handles all page routes with `<Routes>`.
  - Protected routes use wrappers:
    - `UserProtectWrapper`: redirects to `/login` if no user token is found.
    - `CaptainProtectWrapper`: verifies captain token via backend `/captains/profile`, redirects to `/captain-login` on failure.

---

## Authentication & Signup Flows

### User Signup (`UserSignup.jsx`)

- Collects: First name, Last name, Email, Password.
- On submit:
  1. Builds payload: `{fullname: {firstname, lastname}, email, password}`.
  2. **API Call**: `POST /users/register`.
  3. On `201`:
     - Stores JWT token in `localStorage`.
     - Updates context with user document.
     - Navigates to `/` (home).
  4. Clears form fields.
- Errors handled by backend conventions; can be extended in UI.

### User Login (`UserLogin.jsx`)

- Collects: Email, Password.
- On submit:
  1. Payload: `{email, password}`
  2. **API Call**: `POST /users/login`
  3. On `200`:
     - Stores token in `localStorage`.
     - Updates context.
     - Redirects to `/`.
  4. Clears form.

### User Protect Wrapper (`UserProtectWrapper.jsx`)

- Checks for `localStorage.token`.
- Redirects unauthenticated users to `/login`.

### User Logout (`UserLogout.jsx`)

- Reads token from `localStorage`.
- **API Call**: sends token to backend for logout.
- On success:
  - Clears token.
  - Redirects to `/login`.

### Captain Signup (`CaptainSignup.jsx`)

- Collects: Name, Email, Password, Vehicle Color/Plate/Model/Capacity/Type.
- On submit:
  1. Builds payload for backend schema.
  2. **API Call**: `POST /captains/register`
  3. On `201`:
     - Updates captain context.
     - Stores token.
     - Redirects to `/`.
  4. Clears form.
- Vehicle info mapped as required (see backend schema).

### Captain Login (`CaptainLogin.jsx`)

- Collects: Email, Password.
- On submit:
  1. Payload: `{email, password}`
  2. **API Call**: `POST /captains/login`
  3. On `200`:
     - Stores token and context.
     - Redirects to `/`.
  4. Clears form.

### Captain Protect Wrapper (`CaptainProtectWrapper.jsx`)

- Checks for token, validates with backend `/captains/profile`.
- On error (invalid/absent token): clears token and redirects to `/captain-login`.

---

## API Integration Summary

| Action             | Endpoint                       | Payload                     | Response           | Frontend Behavior     |
|--------------------|-------------------------------|-----------------------------|---------------------|-----------------------|
| User Signup        | `POST /users/register`         | `{fullname, email, password}` | `{token, user}`   | Store token/context, go to `/` |
| User Login         | `POST /users/login`            | `{email, password}`           | `{token, user}`   | Store token/context, go to `/` |
| User Logout        | (GET endpoint, with auth)      | (header: bearer token)        | `{message}`       | Clear token, go to `/login`    |
| Captain Signup     | `POST /captains/register`      | `{fullname, email, password, vehicle}` | `{token, captain}` | Store token/context, go to `/` |
| Captain Login      | `POST /captains/login`         | `{email, password}`           | `{token, captain}` | Store token/context, go to `/` |
| Captain Protected  | `GET /captains/profile`        | (header: bearer token)        | `{captain}`       | Update context or logout       |

---

