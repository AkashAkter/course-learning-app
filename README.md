# Course Learning App – Backend

This is the backend of the Course Learning App, a platform that connects students and teachers. It allows teachers to manage courses, lessons, and topics, while enabling students to enroll, track progress, and provide feedback.

## API Endpoints (Example)

- POST /api/v1/auth/register – Register a new user
- POST /api/v1/auth/login – Login
- POST /api/v1/courses – Create a new course (Teacher only)
- GET /api/v1/courses – Get all courses (with pagination & filtering)
- PUT /api/v1/courses/:id – Update course
- DELETE /api/v1/courses/:id – Delete course

## Database Configuration HOME

DATABASE_URL=mongodb+srv://admin:admin1234@clustertasks.vi9x9gx.mongodb.net/course-learning-app?retryWrites=true&w=majority

## Application Configuration

PORT=3000
NODE_ENV=development

## Security Configuration

BCRYPT_SALT_ROUNDS=10
JWT_SECRET=yourSuperSecretKey
JWT_EXPIRES_IN=1d
