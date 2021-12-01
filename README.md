# Todo list with authentication and authorization

This a backend app for a todo list with authentication and authorization in Express.

## Getting Started

### Installing Dependencies

#### Node js

Follow instructions to install the latest version of Node js for your platform in the [Node js docs](https://nodejs.org/en/).

#### NPM Dependencies

Once you have the project in your local machine, install dependencies by running:

```bash
npm install
```

This will install all of the required packages.

##### Key Dependencies

- [Express](https://expressjs.com/) is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.

- [mongoose](https://mongoosejs.com/) is an elegant mongodb object modeling for node.js.

- [morgan](https://www.npmjs.com/package/morgan) is a HTTP request logger middleware for node.js.

- [bcrypt](https://www.npmjs.com/package/bcrypt) is a A library to help you hash passwords.

- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) is a JSON Web Token implementation (symmetric and asymmetric).

#### Setting up the variables

You have to set up some variables in the `.env` file, for the app to run properly.

```
PORT=5000
DB_URL=`Your MongoDB DB URL`
SALT=`Your SALT here`
SECRET_KEY=`Your SECRET KEY here`
```

## Running the server

To run the server, execute:

```bash
npm run dev
```

For running the server in development mode, and execute:


```bash
npm run start
```

To run the server on production mode.

## API Reference

## Getting Started
Base URL: This application can be run locally on the http:/localhost:5000.

## Error Handling
Errors are returned as JSON objects depend on the error.

The API will return two error types when requests fail:

 - 400: Bad Request
 - 403: Forbidden
 - 404: Not Found

## Endpoints

#### GET /roles
 - General
   - gets the list of all the roles
   - requires `admin` role

- Sample Request
   - `http://localhost:5000/roles`
   - Token

<details>
<summary>Response</summary>

```
[
  {
    "_id": "61a5fb3a975b749e97bb41db",
    "role": "user",
    "permissions": [
      "read"
    ],
    "__v": 0
  },
  {
    "_id": "61a5fb5a975b749e97bb41dd",
    "role": "admin",
    "permissions": [
      "read",
      "create",
      "update",
      "delete"
    ],
    "__v": 0
  }
]
```

</details>

#### GET /users
 - General
   - gets the list of all users
   - requires `admin` role

- Sample Request
   - `http://localhost:5000/users`
   - Token

<details>
<summary>Response</summary>

```
[
  {
    "_id": "61a5fdc6e54dc4d754a20b06",
    "email": "user@gamil.com",
    "password": "$2b$10$VzsBm1z3W/mJeYadt6sI6.2lkp0AcAOZEKiHSminAEMLux6UgTbZ6",
    "role": "61a5fb3a975b749e97bb41db",
    "deleted": true,
    "__v": 0
  },
  {
    "_id": "61a5fdd5e54dc4d754a20b08",
    "email": "admin@gamil.com",
    "password": "$2b$10$fmVYXuEKwl.TDTLk0YBBluI7GOSKfKbaJWibQxPDcD8l3IbJtljg6",
    "role": "61a5fb5a975b749e97bb41dd",
    "deleted": false,
    "__v": 0
  }
]
```

</details>

#### GET /todos
 - General
   - gets the list of all the todos for a user
   - requires `user` role

- Sample Request
   - `http://localhost:5000/todos`
   - Token

<details>
<summary>Response</summary>

```
[
  {
    "_id": "61a65f09d0179050d21ba396",
    "name": "code",
    "creator": "61a5fdd5e54dc4d754a20b08",
    "deleted": false,
    "__v": 0
  }
]
```

</details>

#### GET /deletedTodos
 - General
   - gets the list of all the deleted todos for a user
   - requires `user` role

- Sample Request
   - `http://localhost:5000/deletedTodos`
   - Token

<details>
<summary>Response</summary>

```
{
  "message": "There is no deleted todos!!"
}
```

</details>

#### GET /todos/{todo_ID}
 - General
   - gets a todo for a user by ID
   - requires `user` role

- Sample Request
   - `http://localhost:5000/todos/61a65f09d0179050d21ba396`
   - Token

<details>
<summary>Response</summary>

```
[
  {
    "_id": "61a65f09d0179050d21ba396",
    "name": "code",
    "creator": "61a5fdd5e54dc4d754a20b08",
    "deleted": false,
    "__v": 0
  }
]
```

</details>

#### POST /signup
 - General
   - creates a new user
 
 - Request Body 
   - email
   - password
   - role
 
 - Sample Request
   - `http://localhost:5000/signup`
   - Request Body
```
{
    "email":"user@gamil.com",
    "password":"12345",
    "role":"61a5fb3a975b749e97bb41db"
}
```

<details>
<summary>Response</summary>

```
{
  "email": "user@gamil.com",
  "password": "$2b$10$QpGBhgYKuNAAIexxMqzJFeQNTLbPnZCWDg..1aoGmmHP9.LzH0Spm",
  "role": "61a5fb3a975b749e97bb41db",
  "_id": "61a507bf2fc1151a7a98782f",
  "__v": 0
}
```
  
</details>

#### POST /login
 - General
   - login a user
 
 - Request Body 
   - email
   - password
 
 - Sample Request
   - `http://localhost:5000/login`
   - Request Body
```
{
    "email":"admin@gamil.com",
    "password":"12345"
}
```

<details>
<summary>Response</summary>

```
{
  "result": {
    "_id": "61a5fdd5e54dc4d754a20b08",
    "email": "admin@gamil.com",
    "password": "$2b$10$fmVYXuEKwl.TDTLk0YBBluI7GOSKfKbaJWibQxPDcD8l3IbJtljg6",
    "role": {
      "_id": "61a5fb5a975b749e97bb41dd",
      "role": "admin",
      "permissions": [
        "read",
        "create",
        "update",
        "delete"
      ],
      "__v": 0
    },
    "deleted": false,
    "__v": 0
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxYTVmZGQ1ZTU0ZGM0ZDc1NGEyMGIwOCIsImVtYWlsIjoiYWRtaW5AZ2FtaWwuY29tIiwicm9sZSI6ImFkbWluIiwiZGVsZXRlZCI6ZmFsc2UsImlhdCI6MTYzODM0Mzg4OCwiZXhwIjoxNjM4MzQ3NDg4fQ.gmOETtmJWJS9LJNRvZjfi2SRBkVieuj02-wVKq_noWM"
}
```
  
</details>

#### POST /createRole
 - General
   - creates a new role
   - requires `admin` role

 
 - Request Body
   - role
   - permissions
 
 - Sample Request
   - `http://localhost:5000/createRole`
   - Request Body
   - Token
```
{
    "role":"user",
    "permissions": ["read"]
}
```

<details>
<summary>Response</summary>

```
{
    "_id": "61a5fb3a975b749e97bb41db",
    "role": "user",
    "permissions": [
      "read"
    ],
    "__v": 0
  }
```
  
</details>

#### POST /todos
 - General
   - Add a new todo to a user
   - requires `user` role

 
 - Request Body
   - name
 
 - Sample Request
   - `http://localhost:5000/todos`
   - Request Body
   - Token
```
{
    "name":"eat"
}
```

<details>
<summary>Response</summary>

```
{
  "name": "eat",
  "creator": "61a5fdd5e54dc4d754a20b08",
  "deleted": false,
  "_id": "61a7271d7988fed6089eee28",
  "__v": 0
}
```
  
</details>

#### PUT /todos/{todo_ID}
 - General
   - Update a todo to a user
   - requires `user` role

 
 - Request Body
   - name
 
 - Sample Request
   - `http://localhost:5000/todos/61a65f09d0179050d21ba396`
   - Request Body
   - Token
```
{
  "name": "sleep"
}
```

<details>
<summary>Response</summary>

```
{
  "_id": "61a65f09d0179050d21ba396",
  "name": "sleep",
  "creator": "61a5fdd5e54dc4d754a20b08",
  "deleted": false,
  "__v": 0
}
```
  
</details>

#### DELETE /todos/{todo_ID}
 - General
   - Delete a todo to a user
   - requires `user` role
 
 - Sample Request
   - `http://localhost:5000/todos/61a65f09d0179050d21ba396`
   - Token

<details>
<summary>Response</summary>

```
{
  "_id": "61a65f09d0179050d21ba396",
  "name": "sleep",
  "creator": "61a5fdd5e54dc4d754a20b08",
  "deleted": true,
  "__v": 0
}
```
  
</details>

#### DELETE /users/{todo_ID}
 - General
   - Delete a user
   - requires `admin` role
 
 - Sample Request
   - `http://localhost:5000/users/61a5fdc6e54dc4d754a20b06`
   - Token

<details>
<summary>Response</summary>

```
{
  "message": "User has been deleted successfully"
}
```
  
</details>
