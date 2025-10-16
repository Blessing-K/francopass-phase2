# FrancoPass – Phase 2: Modular Architecture Implementation

This repository implements Phase 2 requirements using a feature-based modular architecture in Express.js. JSON files serve as the data source for CRUD operations across all entities.

> Aligned to dataset entities defined in Phase 1 (Users, Practice Exams, Vocabulary Drills, AI Feedback Logs, Expert Resources).

## Run locally

```bash
npm install
npm run dev  # or: npm start
# API root: http://localhost:3000/
```

## Project Structure

```
.
├── data/
├── modules/
│   ├── users/
│   │   ├── models/users.model.js
│   │   ├── routes/users.routes.js
│   │   └── middlewares/validation.js
│   ├── exams/
│   ├── vocab/
│   ├── feedback/
│   └── resources/
├── utils/jsonStore.js
├── utils/ids.js
├── package.json
└── server.js
```

## Application-Level Middlewares

- `express.json()` and `express.urlencoded()` for body parsing
- `morgan` for logging
- `cors` for CORS
- 404 Not Found handler
- Error handler (logs error, returns 500 JSON)

## Entities & Endpoints

### Users (`/api/users`)

- `GET /` – list users
- `GET /:id` – get user
- `POST /` – create (201). Required: `username,email,password,subscription`
- `PUT /:id` – update
- `DELETE /:id` – delete

### Exams (`/api/exams`)

- Fields: `examType, sections[], difficulty, timer`
- Same CRUD routes as above

### Vocab (`/api/vocab`)

- Fields: `word, translation, category`

### Feedback (`/api/feedback`)

- Fields: `userId, transcript, pronunciationScore (0–100), fluencyScore (0–100), feedbackText`

### Resources (`/api/resources`)

- Fields: `title, instructor, link (URL), description`

## HTTP Status Codes

- `200` on successful GET/PUT/DELETE
- `201` on successful POST
- `400` on validation errors (from express-validator)
- `404` when resource not found
- `500` on server errors

## Validation

Each module has route-level validators in `middlewares/validation.js` enforcing required fields and types.

## Testing (examples)

```bash
# Users
curl -s http://localhost:3000/api/users | jq
curl -s http://localhost:3000/api/users/u_1 | jq
curl -s -X POST http://localhost:3000/api/users -H 'Content-Type: application/json' -d '{"username":"jed","email":"jed@example.com","password":"hunter2","subscription":"free"}'

# Exams
curl -s -X POST http://localhost:3000/api/exams -H 'Content-Type: application/json' -d '{"examType":"DELF A2","sections":["Listening","Reading"],"difficulty":"A2","timer":900}'
```

## Contributions

- **Boluwatito Kajopelaye-Ola** — solo project.
