# node-jwt-demo

## Installation

1) Clone this repo into your html folder
2) Run `npm install` to install the dependencies
3) Run `nodemon index.js`

## Usage

The application comes with the following routes:

### POST /login

This endpoint can be used to generate a new JSON web token that can be used to access any private routes.

*Required POST data*

- username
- password

Example POST body:

```json
{
  "username": "admin",
  "password": "password"
}
```

Example successful response:

```json
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInVzZXJuYW1lIjoiYWRtaW4iLCJpYXQiOjE2MjI3OTI1NTYsImV4cCI6MTYyMjgwMzM1Nn0.5hQIPAmlQXOcJvZLHCH9OnByvitKRVmrIEiDKgQzl78"
}
```

### GET /resource

A public route accessible by anyone - no need to generate a JWT.

No additional data is required for this endpoint.

Example successful response:
```json
"Hello, this is public!"
```

### GET /resource/secret

A private route only accessible if you have generated a JWT.

To access this route first send a valid POST request to /login to get an access token, then copy the token  (eg `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInVzZXJuYW1lIjoiYWRtaW4iLCJpYXQiOjE2MjI3OTI1NTYsImV4cCI6MTYyMjgwMzM1Nn0.5hQIPAmlQXOcJvZLHCH9OnByvitKRVmrIEiDKgQzl78`)

Once you've copied the token, in postman send a GET request to /resource/secret, but before sending it select authorization, set the type to Bearer Token and paste in the access token you copied earlier.

You should now be able to successfully get a response

Example successful response:

```json
Secret!!!
```