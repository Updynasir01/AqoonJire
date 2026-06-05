# 🎓 E-Learning Platform — Backend API

Node.js + Express + PostgreSQL backend for the Somalia E-Learning Platform.

---

## ⚡ Quick Start

### 1. Setup environment
```bash
cp .env.example .env
# Edit .env with your PostgreSQL credentials
```

### 2. Create the database
```bash
createdb elearning_db
# Or via psql:
psql -U postgres -c "CREATE DATABASE elearning_db;"
```

### 3. Install & run migrations
```bash
npm install
npm run migrate    # Creates all tables
npm run seed       # Creates admin + sample data
```

### 4. Start the server
```bash
npm run dev        # Development (hot reload)
npm start          # Production
```

---

## 🔐 Default Login Credentials

| Role    | Email                    | Password      |
|---------|--------------------------|---------------|
| Admin   | admin@elearning.so       | Admin@1234    |
| Teacher | ahmed@elearning.so       | Teacher@1234  |
| Student | fadumo@example.so        | Student@1234  |

---

## 📁 Project Structure

```
src/
├── server.js              # Express app entry point
├── config/
│   └── database.js        # PostgreSQL pool
├── middleware/
│   ├── auth.js            # JWT auth + role checks
│   ├── errorHandler.js    # Global error handling
│   └── upload.js          # Multer file uploads
├── controllers/
│   ├── authController.js       # Login, profile, password
│   ├── adminController.js      # Admin: users, access, payments
│   ├── courseController.js     # Courses, sections, lessons
│   ├── studentController.js    # Student dashboard, progress
│   ├── quizController.js       # Quiz create, submit, grade
│   ├── announcementController.js
│   └── categoryController.js
└── routes/
    └── index.js           # All API routes

migrations/
├── 001_schema.sql         # Full DB schema
└── run.js                 # Migration runner

seeds/
└── run.js                 # Default data seeder
```

---

## 🗄️ Database Schema

```
users                    — admin, teacher, student accounts
categories               — course categories
courses                  — course metadata
sections                 — course chapters
lessons                  — individual lessons (video/pdf/text/youtube)
student_course_access    — ⭐ THE MANUAL PAYMENT GATE (admin grants/revokes)
payment_logs             — manual payment records (internal tracking)
lesson_progress          — tracks which lessons each student completed
quizzes                  — quizzes linked to lessons
quiz_questions           — MCQ and true/false questions
quiz_attempts            — student quiz submissions + scores
assignments              — assignments per lesson
assignment_submissions   — student assignment files + grades
certificates             — auto-issued on 100% course completion
announcements            — course or global announcements
```

---

## 📡 API Endpoints

### Auth
| Method | Endpoint              | Access   | Description         |
|--------|-----------------------|----------|---------------------|
| POST   | /api/auth/login       | Public   | Login               |
| GET    | /api/auth/me          | Any      | Get current user    |
| PUT    | /api/auth/change-password | Any  | Change password     |
| PUT    | /api/auth/profile     | Any      | Update profile      |

### Admin — User Management
| Method | Endpoint                | Description                  |
|--------|-------------------------|------------------------------|
| GET    | /api/admin/dashboard    | Stats overview               |
| GET    | /api/admin/users        | List users (filter by role)  |
| POST   | /api/admin/users        | Create student/teacher       |
| GET    | /api/admin/users/:id    | User detail + course access  |
| PUT    | /api/admin/users/:id    | Update user                  |
| DELETE | /api/admin/users/:id    | Deactivate user              |
| PUT    | /api/admin/users/:id/reset-password | Reset password |

### Admin — Course Access Control (Manual Payment Gate)
| Method | Endpoint                                    | Description           |
|--------|---------------------------------------------|-----------------------|
| GET    | /api/admin/students/:id/access              | Student's courses     |
| POST   | /api/admin/students/:id/access              | ✅ Grant access        |
| DELETE | /api/admin/students/:id/access/:courseId    | ❌ Revoke access       |

### Admin — Payment Log
| Method | Endpoint             | Description          |
|--------|----------------------|----------------------|
| GET    | /api/admin/payments  | All payment records  |
| POST   | /api/admin/payments  | Log a payment        |

### Courses (Public Catalog)
| Method | Endpoint                                           | Access          |
|--------|----------------------------------------------------|-----------------|
| GET    | /api/courses                                       | Public          |
| GET    | /api/courses/:slug                                 | Public          |
| GET    | /api/courses/my                                    | Teacher/Admin   |
| POST   | /api/courses                                       | Teacher/Admin   |
| PUT    | /api/courses/:id                                   | Teacher/Admin   |
| DELETE | /api/courses/:id                                   | Admin           |
| POST   | /api/courses/:courseId/sections                    | Teacher/Admin   |
| POST   | /api/courses/:courseId/sections/:id/lessons        | Teacher/Admin   |

### Student
| Method | Endpoint                              | Description                  |
|--------|---------------------------------------|------------------------------|
| GET    | /api/student/dashboard                | Dashboard stats              |
| GET    | /api/student/courses                  | My enrolled courses          |
| GET    | /api/student/courses/:courseId        | Full course content          |
| POST   | /api/student/lessons/:id/complete     | Mark lesson complete         |
| GET    | /api/student/certificates             | My certificates              |
| GET    | /api/student/announcements            | My announcements             |

### Quizzes
| Method | Endpoint                    | Description              |
|--------|-----------------------------|--------------------------|
| POST   | /api/quizzes                | Create quiz (teacher)    |
| GET    | /api/quizzes/:id            | Get quiz                 |
| POST   | /api/quizzes/:id/submit     | Submit answers (student) |
| GET    | /api/quizzes/:id/results    | My attempt history       |

---

## 🔑 Authentication

All protected routes require the JWT in the Authorization header:
```
Authorization: Bearer <your_token>
```

---

## 🛡️ Role Permissions

| Feature                | Admin | Teacher | Student |
|------------------------|-------|---------|---------|
| Create users           | ✅    | ❌      | ❌      |
| Grant course access    | ✅    | ❌      | ❌      |
| Create courses         | ✅    | ✅      | ❌      |
| View own courses       | ✅    | ✅      | ✅*     |
| Submit quizzes         | ❌    | ❌      | ✅      |
| View all students      | ✅    | ❌      | ❌      |

*Students only see courses admin has unlocked for them.

---

## 📦 Dependencies

| Package           | Purpose                    |
|-------------------|----------------------------|
| express           | Web framework              |
| pg                | PostgreSQL client          |
| bcryptjs          | Password hashing           |
| jsonwebtoken      | JWT auth                   |
| multer            | File uploads               |
| express-validator | Input validation           |
| helmet            | Security headers           |
| cors              | Cross-origin requests      |
| morgan            | HTTP request logging       |
| uuid              | UUID generation            |
| dotenv            | Environment variables      |
