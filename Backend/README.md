# Backend API Documentation

## `/users/register` Endpoint

### Description

This endpoint is used to register a new user. It validates the input data, hashes the user's password, creates a new user in the database, and returns a JSON Web Token (JWT) along with the user data.

### Request Body

The request body should be a JSON object with the following fields:

- `fullname`: An object containing:
  - `firstName` (string, required, minimum length: 3)
  - `lastName` (string, optional, minimum length: 3)
- `email` (string, required, must be a valid email)
- `password` (string, required, minimum length: 6)

### Example Response

````json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2Nzg3NDMwZjg0NjYxNmEwNWNhMzJjZmYiLCJpYXQiOjE3MzY5MTc3NzV9.1zLdv9A9u-9XgAiHQl-Pq_TK26Sj1LB8A37kVoeYStw",
  "user": {
    "fullname": {
    "firstName": "John",
    "lastName": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "password123",
  "_id": "6787430f846616a05ca32cff",
  "__v": 0
  }
}

## `/users/login` Endpoint

### Description
This endpoint is used to log in an existing user. It validates the input data, checks the user's credentials, and returns a JSON Web Token (JWT) along with the user data.

### Request Body
The request body should be a JSON object with the following fields:

- `email` (string, required, must be a valid email)
- `password` (string, required, minimum length: 6)

### Example Response
```json
{
  "email": "john.doe@example.com",
  "password": "password123",
}
````
