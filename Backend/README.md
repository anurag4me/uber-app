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

## `/captains/login` Endpoint

### Description
This endpoint is used to log in an existing captain. It validates the input data, checks the captain's credentials, and returns a JSON Web Token (JWT) along with the captain data.

### Request Body
The request body should be a JSON object with the following fields:

- `email` string, required, must be a valid email
- `password` string, required, minimum length: 6

```json
{
  "email": "jane.doe@example.com", 
  "password": "password123" 
}
```

### Example Response
```json
{
  "token": "jwt_token_here",
  "captain": {
    "_id": "captain_id_here",
    "fullname": {
      "firstName": "Jane",
      "lastName": "Doe"
    },
    "email": "jane.doe@example.com",
    "vehicle": {
      "vehicleType": "car",
      "color": "red",
      "plate": "ABC123",
      "capacity": 4
    }
  }
}
```

## `/captains/profile` Endpoint

### Description
This endpoint is used to get the profile of the authenticated captain.

### Request Body
The request should include the following header:

- `Authorization` Bearer <token>

### Example Response
```json
{
  "captain": {
    "_id": "captain_id_here",
    "fullname": {
      "firstName": "Jane",
      "lastName": "Doe"
    },
    "email": "jane.doe@example.com",
    "vehicle": {
      "vehicleType": "car",
      "color": "red",
      "plate": "ABC123",
      "capacity": 4
    }
  }
}
```

## `/captains/logout` Endpoint

### Description
This endpoint is used to log out the authenticated captain. It clears the authentication token from cookies and adds it to a blacklist.

### Request Body
The request should include the following header:

- `Authorization` Bearer <token>

### Example Response
```json
{
  "message":"Logged out successfully"
}
```

## `/maps/get-coordinates` Endpoint

### Description

Retrieves the coordinates (latitude and longitude) for a given address.

### HTTP Method

`GET`

### Request Parameters

- `address` (string, required): The address for which to retrieve coordinates.

### Example Request

GET `/maps/get-coordinates?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA`

### Example Response

```json
{
  "ltd": 37.4224764,
  "lng": -122.0842499
}
```

### Error Response

- `400 Bad Request`: If the address parameter is missing or invalid.
- `404 Not Found`: If the coordinates for the given address could not be found.

```json
{
  "message": "Coordinates not found"
}
```

## `/maps/get-distance-time` Endpoint

### Description

Retrieves the distance and estimated travel time between two locations.

### HTTP Method

`GET`

### Request Parameters

- `origin` (string, required): The starting address or location.
- `destination` (string, required): The destination address or location.

### Example Request

```
GET /maps/get-distance-time?origin=New+York,NY&destination=Los+Angeles,CA
```

### Example Response

```json
{
  "distance": {
    "text": "2,789 miles",
    "value": 4486540
  },
  "duration": {
    "text": "1 day 18 hours",
    "value": 154800
  }
}
```

### Error Response

- `400 Bad Request`: If the origin or destination parameter is missing or invalid.
- `404 Not Found`: If the distance and time for the given locations could not be found.

```json
{
  "message": "No routes found"
}
```

## `/maps/get-suggestions` Endpoint

### Description

Retrieves autocomplete suggestions for a given input string.

### HTTP Method

`GET`

### Request Parameters

- `input` (string, required): The input string for which to retrieve suggestions.

### Example Request

```
GET /maps/get-suggestions?input=1600+Amphitheatre
```

### Example Response

```json
[
  "1600 Amphitheatre Parkway, Mountain View, CA, USA",
  "1600 Amphitheatre Pkwy, Mountain View, CA 94043, USA"
]
```

### Error Response

- `400 Bad Request`: If the input parameter is missing or invalid.
- `500 Internal Server Error`: If there is an error retrieving suggestions.

```json
{
  "message": "Unable to fetch suggestions"
}
```

## `/rides/create` Endpoint

### Description

Creates a new ride with the provided information.

### HTTP Method

`POST`

### Authentication

Requires a valid JWT token in the Authorization header:
`Authorization: Bearer <token>`

### Request Body

The request body should be in JSON format and include the following fields:

- `pickup` (string, required): The pickup address (minimum 3 characters).
- `destination` (string, required): The destination address (minimum 3 characters).
- `vehicleType` (string, required): The type of vehicle (must be 'auto', 'car', or 'moto').

### Example Response

- `ride` (object):
  - `user` (string): User ID.
  - `pickup` (string): Pickup address.
  - `destination` (string): Destination address.
  - `fare` (number): Fare amount.
  - `status` (string): Ride status.
  - `duration` (number): Duration in seconds.
  - `distance` (number): Distance in meters.
  - `otp` (string): OTP for the ride.

### Error Response

- `400 Bad Request`: If any required field is missing or invalid.
- `500 Internal Server Error`: If there is an error creating the ride.

```json
{
  "message": "Error message"
}
```


## `/rides/get-fare` Endpoint

### Description

Retrieves the fare estimate for a ride between the provided pickup and destination addresses.

### HTTP Method

`GET`

### Authentication

Requires a valid JWT token in the Authorization header:
`Authorization:

 Bear

er <token>`

### Request Parameters

- `pickup` (string, required): The pickup address (minimum 3 characters).
- `destination` (string, required): The destination address (minimum 3 characters).

### Example Request

```
GET /rides/get-fare?pickup=1600+Amphitheatre+Parkway,+Mountain+View,+CA&destination=1+Infinite+Loop,+Cupertino,+CA
```

### Example Response

```json
{
  "auto": 50.0,
  "car": 75.0,
  "moto": 40.0
}
```

### Error Response

- `400 Bad Request`: If any required parameter is missing or invalid.
- `500 Internal Server Error`: If there is an error calculating the fare.

```json
{
  "message": "Error message"
}
```
