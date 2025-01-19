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

```json
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
```


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
```


## `/users/profile` Endpoint

### Description
This endpoint is used to get the profile of the authenticated user.

### Request Headers
The request should include the following header:

- `Authorization` Bearer <token>

### Example Response
```json
{
  "_id": "user_id_here",
  "fullname": {
    "firstName": "John",
    "lastName": "Doe"
  },
  "email": "john.doe@example.com"
}
```


## `/users/logout` Endpoint

### Description
This endpoint is used to log out the authenticated user. It clears the authentication token from cookies and adds it to a blacklist.

### Request Headers
The request should include the following header:

- `Authorization` Bearer <token>

### Example Response
```json
{
  "message": "Logout successful"
}
```

## `/captains/register` Endpoint

### Description
This endpoint is used to register a new captain. It validates the input data, hashes the captain's password, creates a new captain in the database, and returns the captain data.

### Request Body
The request body should be a JSON object with the following fields:

- `fullname`: An object containing:
  - `firstName` (string, required, minimum length: 3)
  - `lastName` (string, required, minimum length: 3)
- `email` (string, required, must be a valid email)
- `password` (string, required, minimum length: 6)
- `vehicle`: An object containing:
  - `vehicleType` (string, required, must be one of ["car", "auto", "motorcycle"])
  - `color` (string, required, minimum length: 3)
  - `plate` (string, required, minimum length: 3)
  - `capacity` (integer, required, minimum value: 1)

### Example Response
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzhjYzc2MTE2MGM2ZWE0ZmIwMTY5NjAiLCJpYXQiOjE3MzcyNzkzMjksImV4cCI6MTczNzM2NTcyOX0.gOW6OwehBFeILjXLf_4YC7tEO-Ub51EPNJ9qgTPyGf4",
  "captain": {
    "fullname": {
      "firstName": "test_captain_firstname",
      "lastName": "test_captain_lastname"
    },
    "email": "test_email@gmail.com",
    "password": "$2b$10$gmfeWmdAOC7E3fUfTOXs9OIrBqXEwJXxL0DUOdx0eVMsLz8.rqQIO",
    "status": "inactive",
    "vehicle": {
      "color": "red",
      "plate": "MPRK 3434",
      "capacity": 3,
      "vehicleType": "car"
    },
    "_id": "678cc761160c6ea4fb016960",
    "__v": 0
  }
}
```