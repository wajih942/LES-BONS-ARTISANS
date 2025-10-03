# Project Setup Instructions

## Prerequisites

Make sure you have **Node.js v22.20.0** installed on your machine.

---

## Backend Setup

1. Navigate to the backend folder:

```bash
cd backend

npm install
```
2. create a .env file in the backend directory with the following content:
```bash
JWT_SECRET=your_jwt_secret_here
JWT_EXPIRES_IN=your_jwt_expiration_here
MONGO_URI=your_mongodb_uri_here
PORT=3000
```
## Frontend Setup

1. Navigate to the frontend folder:

```bash
cd frontend

npm install
```
2. create a .env file in the frontend directory with the following content:
```bash
VITE_SERVER_URL=http://localhost:3000
```

## Seeding the Database (Optional)

1. If you want to populate your database with two sample users and products:

```bash
cd backend

node src/seed.js
```
| Email                                         | Password    |
|----------------------------------------------|------------|
| [user1@example.com](mailto:user1@example.com) | P@ssword123 |
| [user2@example.com](mailto:user2@example.com) | P@ssword456 |

---

## Implementation Status

I implemented all the required features of the technical test, **including all bonus features**. The project is fully functional and ready for review.



