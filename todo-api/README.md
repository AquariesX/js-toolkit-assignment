# Secure To-Do API

Production-ready REST API for a to-do app with authentication. It uses Node.js, Express, MongoDB, Mongoose, JWT, bcrypt, dotenv, helmet, and express-validator.

## Project Structure

```text
todo-api/
  config/
    db.js
    database.js
  controllers/
    authController.js
    todoController.js
  middleware/
    auth.js
    errorHandler.js
    notFound.js
    validate.js
    validators.js
  models/
    User.js
    Todo.js
  routes/
    auth.js
    todo.js
  utils/
    apiResponse.js
    asyncHandler.js
    generateToken.js
  postman/
    todo-api.postman_collection.json
  server.js
  .env.example
  package.json
```

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create `.env` from `.env.example`:

```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://127.0.0.1:27017/secure-todo-api
JWT_SECRET=replace_this_with_a_long_random_secret
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:3000
```

3. Start MongoDB locally or update `MONGO_URI` with your MongoDB Atlas connection string.

4. Run the API:

```bash
npm run dev
```

The API runs at `http://localhost:5000`.

## Response Format

Successful responses:

```json
{
  "success": true,
  "message": "Request completed successfully",
  "data": {}
}
```

Error responses:

```json
{
  "success": false,
  "message": "Validation failed",
  "data": null,
  "errors": []
}
```

## Routes

| Method | Route | Access | Description |
| --- | --- | --- | --- |
| POST | `/api/auth/register` | Public | Register a user |
| POST | `/api/auth/login` | Public | Login and receive a JWT |
| POST | `/api/todos` | Protected | Create a to-do |
| GET | `/api/todos` | Protected | Get logged-in user's to-dos |
| PUT | `/api/todos/:id` | Protected | Update a to-do |
| DELETE | `/api/todos/:id` | Protected | Delete a to-do |

## Sample Requests

Register:

```json
{
  "fullName": "Student User",
  "email": "student@example.com",
  "password": "StrongPass123"
}
```

Login:

```json
{
  "email": "student@example.com",
  "password": "StrongPass123"
}
```

Create to-do:

```json
{
  "title": "Complete API assignment",
  "completed": false
}
```

Update to-do:

```json
{
  "completed": true
}
```

Protected routes require this header:

```text
Authorization: Bearer YOUR_JWT_TOKEN
```

## Postman

Import `postman/todo-api.postman_collection.json` into Postman. The login request automatically stores the JWT token as a collection variable, and the create to-do request stores the created to-do id.
