// MongoDB initialization script
db = db.getSiblingDB('lms');

// Create collections
db.createCollection('users');
db.createCollection('courses');
db.createCollection('enrollments');
db.createCollection('lessons');
db.createCollection('assignments');
db.createCollection('submissions');

// Create indexes for better performance
db.users.createIndex({ "email": 1 }, { unique: true });
db.users.createIndex({ "username": 1 }, { unique: true });
db.courses.createIndex({ "slug": 1 }, { unique: true });
db.enrollments.createIndex({ "userId": 1, "courseId": 1 }, { unique: true });

// Create admin user (optional)
db.users.insertOne({
  username: "admin",
  email: "admin@lms.com",
  password: "$2b$10$rQZ9K8J2mN3vX1yA4bC5dE6fG7hI8iJ9kK0lM1nN2oO3pP4qQ5rR6sS7tT8uU9vV0wW1xX2yY3zZ",
  role: "admin",
  isActive: true,
  createdAt: new Date(),
  updatedAt: new Date()
});

print('MongoDB initialization completed successfully!');
