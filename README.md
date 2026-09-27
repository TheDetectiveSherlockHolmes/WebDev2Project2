# Student Management REST API

Lab Assignment 2 – Web Dev III (Node.js & Express Backend)

## Requirements covered

- Express.js server
- Student CRUD APIs
- Custom logger middleware
- Modular routing
- Error handling
- JSON/Array data only
- Postman testing

## Project structure

```text
student-management-rest-api/
├── app.js
├── package.json
├── README.md
├── routes/
│   └── studentRoutes.js
├── middleware/
│   └── logger.js
└── data/
    └── students.js
```

## Run the project

```bash
npm install
npm start
```

Server:

```text
http://localhost:3000
```

## Postman API tests

### 1. Get all students

GET

```text
http://localhost:3000/students
```

### 2. Get student by ID

GET

```text
http://localhost:3000/students/1
```

### 3. Create student

POST

```text
http://localhost:3000/students
```

Body → raw → JSON:

```json
{
  "name": "Neha",
  "course": "BTech"
}
```

Expected status: `201 Created`

### 4. Update student

PUT

```text
http://localhost:3000/students/1
```

Body → raw → JSON:

```json
{
  "name": "Rahul Sharma",
  "course": "BTech"
}
```

Expected status: `200 OK`

### 5. Delete student

DELETE

```text
http://localhost:3000/students/3
```

Expected status: `200 OK`

## Error tests

Invalid ID:

```text
GET http://localhost:3000/students/abc
```

Expected: `400 Bad Request`

Non-existing student:

```text
GET http://localhost:3000/students/999
```

Expected: `404 Not Found`

Missing POST fields:

```json
{
  "name": "Test"
}
```

Expected: `400 Bad Request`

## Status codes

- 200 – Success
- 201 – Created
- 400 – Bad Request
- 404 – Not Found
- 500 – Internal Server Error
